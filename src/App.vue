<template>
  <section class="body-warp">
    <!-- <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition> -->
  </section>
</template>
<script type="text/javascript">

  import Web3 from 'web3'
  import contract from 'truffle-contract'

  import MetaCoinSol from 'contracts/MetaCoin.sol'


  const RPC_URL = 'http://localhost:8545' // 'http://127.0.0.1:9545'
  export default {
    name: 'app',
    created(){
    },
    mounted() {
      this.setWeb3()
      this.getAccountBalance()
    },
    methods: {
      setWeb3() {
        console.log("===");
        if (typeof web3 !== 'undefined') {
          this.web3 = new Web3(web3.currentProvider)
        } else {
          this.web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL))
        }

      },
      getAccountBalance() {
        const MetaCoin = contract(MetaCoinSol)
        MetaCoin.setProvider(this.web3.currentProvider);
        this.web3.eth.getAccounts(async (err, res) => {
          if (res && res.length > 0) {
            const account = res[0]
            const meta = await MetaCoin.deployed()
            const balance = await meta.getBalance.call(account, {from: account})
            console.log(balance.toString(10));
          }
        })
      },
    }


  }
</script>
<!-- <style lang="scss" src="app.scss"></style> -->
