<template>
  <div class="header">
    <div class="content">
      <!-- <span>标题</span> -->
      <div class="left">
        <i class="el-icon-s-finance"></i>
        资金后台管理系统
      </div>
      <div class="right">
        <span class="user"><span class="username"><i class="el-icon-user-solid"></i>{{user.name}}</span>, 欢迎你!</span>
        <i class="logout el-icon-switch-button" @click="showDialog">登出</i>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      ...mapActions(['setDialogVisible']),
      showDialog() {
        this.setDialogVisible(true)
      }
    }
  }
</script>

<style scoped>
  .header {
    /* position: fixed;
    top:0;
    right: 0; */
    height: 4vh;
    padding: 16px;
    font-size: 20px;
    /* font-weight: bold; */
    color: #ccc;
    background-color: #333;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left {
    color: #66b1ff;
    cursor: pointer;
  }

  .left i{
    font-size: 30px;
  }

  .logout,
  .user {
    padding-right: 20px;
    cursor: pointer;
  }

  .logout:hover {
    color: #E6A23C
  }

  .username:hover {
    color: #66b1ff;
  }
</style>