<template>
  <div class="user">
    <div class="container">
      <p class="name">
        <i class="el-icon-user-solid" />
        {{user.name}}
      </p>
      <p class="role">{{user.role==="admin"?'管理员':'员工'}}</p>
      <p class="email">{{user.email}}</p>
    </div>
    
    <el-button type="primary">编辑</el-button>
  </div>
</template>
<script>
  import {
    mapGetters
  } from "vuex";
  export default {
    computed: {
      ...mapGetters(["user"])
    }
  };
</script>

<style scoped>
  .user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: rgba(255,255,255,.6);
    width: 100%;
    height: 92vh;

    background: url(../assets/img/bg.png) no-repeat center center;
    background-size: cover;
  }

  .container {
    text-align: center;
  }

  p {
    line-height: 70px;
    font-size: 30px;
  }

  .name {
    font-size: 60px;
    font-weight: bold;
  }
</style>