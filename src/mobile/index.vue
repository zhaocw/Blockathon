<template>
  <section class="body-warp">
    <div class="header">健身教练列表</div>
    <div class="list">
      <div class="item" v-for="(item,index) in list" @click="itemClick(item)">
        <div class="item-left">
          <img :src="item.pic" />
        </div>
        <div class="item-right">
          <div class="item-header">
            <div class="item-name">{{item.title}}</div>
            <div class="item-status">{{item.statusTxt}}</div>
          </div>
          <div class="item-body">
            <div class="item-desc">{{item.desc}}</div>
            <div class="item-price">{{item.price}}币</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/javascript">

  import Web3 from 'web3'
  import contract from 'truffle-contract'
  import MetaCoinSol from 'contracts/MetaCoin.sol'

  import Data from './data'


  const RPC_URL = 'http://localhost:8545' // 'http://127.0.0.1:9545'
  export default {
    name: 'index',
    data() {
      // name mobile status
      return {
        list: [],
      }
    },
    created(){
      const data = localStorage.getItem('blockathon');
      if (data) {
        this.list = JSON.parse(data).list
      } else {
        console.log("=======");
        localStorage.setItem('blockathon', JSON.stringify(Data));
        this.list = Data.list
      }
    },
    methods: {
      itemClick(item) {
        console.log(item.status);
        if (item.status == 1) {
          this.$router.push({ path: `/mobile/detail/${item.id}` })
        } else {
          this.$router.push({ path: `/mobile/apply/${item.id}/${item.status}` })
        }
      },
    }
  }
</script>
<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    background: #F6F6F6;
  }
</style>

<style lang="scss" scoped src="./index.scss"></style>
