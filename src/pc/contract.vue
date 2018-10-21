<template>
  <section class="body-warp">
    <el-menu default-active="1-4-1" style="min-width: 150px;min-height: 100%;">
      <el-submenu index="1">
        <template slot="title">
          <span slot="title">合同列表</span>
        </template>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span slot="title">签到管理</span>
        </template>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span slot="title">套餐管理</span>
        </template>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span slot="title">交易统计</span>
        </template>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span slot="title">去交易</span>
        </template>
      </el-submenu>
    </el-menu>
    <section class="body-right">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>健身管理@区块链驱动</el-breadcrumb-item>
          <el-breadcrumb-item>合同管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="list"
        class="table"
        >
        <el-table-column
          label="姓名"
          width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号"
          width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="套餐"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="费用"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.statusTxt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="生效时间"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.effectTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">通过</el-button>
            <el-button
              type="success"
              size="mini"
              @click="handleDetail(scope.$index)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="合同详情"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>合同详情及各个统计</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </section>
  </section>
</template>
<script type="text/javascript">

  import Web3 from 'web3'
  import contract from 'truffle-contract'
  import MetaCoinSol from 'contracts/MetaCoin.sol'

  const RPC_URL = 'http://localhost:8545' // 'http://127.0.0.1:9545'
  export default {
    name: 'contract',
    data() {
      return {
        list: [],
        dialogVisible: false,
      };
    },
    created(){
      const data = localStorage.getItem('blockathon');
      if (data) {
        this.list = JSON.parse(data).list.filter(item => Boolean(item.name))
      }
    },
    mounted() {
      this.setWeb3()
      this.getAccountBalance()
    },
    methods: {
      setWeb3() {
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
      handleClose() {
        this.dialogVisible = false
      },
      handleDetail(index) {
        this.dialogVisible = true
        this.detail = this.list[index]
      }
    }


  }
</script>
<style lang="scss">
body, html {
  min-height: 100%;
  height: 100%;
}
.el-submenu__icon-arrow, .el-submenu__title i {
  display: none !important;
}
</style>
<style lang="scss" scoped src="./contract.scss"></style>
