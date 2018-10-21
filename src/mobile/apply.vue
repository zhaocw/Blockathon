<template>
  <section class="body-warp">
    <div class="header">{{header}}</div>
    <div class="list">
      <div class="item">
        <label class="item-label">昵称</label>
        <input :value="name" class="item-input" placeholder="请输入体重" />
      </div>
      <div class="item">
        <label class="item-label">手机号</label>
        <input :value="mobile" class="item-input" placeholder="请输入体重" />
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
        header: '健身申请',
        name: '极客链',
        mobile: '15212341234',
        success: {

        }
      }
    },
    created() {

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

      submit() {
        this.web3.eth.getAccounts(async (err, res) => {
          if (res && res.length > 0) {
            const userAccount = res[0]
            const trainerAccount = res[1]
            const storage = localStorage.getItem('blockathon');
            if (storage) {
              const { id } = this.$route.params
              const data = JSON.parse(storage)
              const index = data.list.findIndex(item => item.id == id)
              if (index > -1) {
                // const { price } = data.list[index]
                // await this.meta.startProject.call()
                this.web3.eth.sendTransaction({
                  from: userAccount,
                  to: trainerAccount,
                  value: 10,
                }, (err, address) => {
                  if (!err) {
                      data.list[index].status = 1
                      data.list[index].statusTxt = '待上报'
                      data.list[index].effectTime = '2018-10-21'
                      data.list[index] = {...data.list[index], address,
                        mobile: this.mobile, name: this.name, }
                      localStorage.setItem('blockathon', JSON.stringify(data));
                  }
                  this.$router.back(-1);
                })
              }
            }
          }
        })
      },
      goback() {
        this.$router.back(-1);
      },
    }
  }
</script>
<style lang="scss" scoped src="./detail.scss"></style>
