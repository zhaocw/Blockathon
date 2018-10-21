<template>
  <section class="body-warp">
    <div class="header">健身汇报</div>
    <div class="list">
      <div class="item">
        <label class="item-label">体重</label>
        <input v-model="weight" class="item-input" placeholder="请输入体重(KG)" />
      </div>
      <div class="item">
        <label class="item-label">心跳</label>
        <input v-model="heartbeat" class="item-input" placeholder="请输入心跳(次)" />
      </div>
    </div>
    <div class="footer" @click="submit">提交</div>
    <div class="modal-wrap" v-if="success.show">
      <div class="modal">
        <div class="modal-header">
          交易回执
        </div>
        <div class="modal-item">
          <div class="modal-label">gas花销：</div>
          <div class="modal-txt">{{success.gasUsed}}</div>
        </div>
        <div class="modal-item">
          <div class="modal-label">累计花销：</div>
          <div class="modal-txt">{{success.cumulativeGasUsed}}</div>
        </div>
        <div class="modal-item">
          <div class="modal-label">交易地址：</div>
          <div class="modal-txt">{{success.address}}</div>
        </div>
        <div class="modal-item">
          <div class="modal-label">交易Hash：</div>
          <div class="modal-txt">{{success.transactionHash}}</div>
        </div>
        <div @click="goback" class="modal-btn">
          确定
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/javascript">

  import Web3 from 'web3'
  import contract from 'truffle-contract'
  import HealthContractSol from 'contracts/HealthContract.sol'
  //
  const HealthContract = contract(HealthContractSol)

  const RPC_URL = 'http://localhost:8545' // 'http://127.0.0.1:9545'
  export default {
    name: 'detail',
    data() {
      // name mobile status
      return {
        weight: '',
        heartbeat: '',
        success: {
        }
      }
    },
    mounted() {
      this.setWeb3()
    },
    methods: {
      async setWeb3() {
        if (typeof web3 !== 'undefined') {
          this.web3 = new Web3(web3.currentProvider)
        } else {
          this.web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
        }
        HealthContract.setProvider(this.web3.currentProvider);
        this.meta = await HealthContract.deployed()
      },

      async submit() {
        console.log(this.weight, this.heartbeat);
        const storage = localStorage.getItem('blockathon');
        if (storage) {
          const { id } = this.$route.params
          const data = JSON.parse(storage)
          const index = data.list.findIndex(item => item.id == id)
          if (index > -1) {

            await this.meta.recordHealthData.call(this.weight, this.heartbeat)
            await this.meta.confirmProject.call()
            const { address } = data.list[index]
            this.web3.eth.getTransactionReceipt(address, (err, receipt) => {
              this.success = {...receipt, address, show: true}
              data.list[index].status = 2
              data.list[index].statusTxt = '已结束'
              data.list[index] = { ...data.list[index], ...receipt,
                weight: this.weight, heartbeat: this.heartbeat }
              localStorage.setItem('blockathon', JSON.stringify(data));
            })
          }
        }
      },
      goback() {
        this.$router.back(-1);
      },
    }
  }
</script>
<style lang="scss" scoped src="./detail.scss"></style>
