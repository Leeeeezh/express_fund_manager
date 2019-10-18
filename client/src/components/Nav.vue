<template>
  <div class="nav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#66b1ff">
      <el-menu-item index="1"><i class="el-icon-s-home"></i>首页</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-s-order"></i>资金流水</el-menu-item>
      <el-menu-item index="5"><i class="el-icon-user-solid"></i>用户信息</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['user', 'activeIndex'])
    },
    methods: {
      ...mapActions(['setDialogVisible']),
      handleSelect(key, keyPath) {
        if (key === '1') {
          if (this.$route.name == 'home') {
            return
          }
          this.$router.replace('/index/home')
        }
        if (key === '3') {
          if (this.$route.name == 'fundlist') {
            return
          }
          this.$router.replace('/index/fundlist')
        }
        if (key === '5') {
          if (this.$route.name == 'user') {
            return
          }
          this.$router.replace('/index/user')
        }
      }
    }
  }
</script>

<style scoped>
  .nav {
    height: 92vh;
    background-color: #545c64;
  }
</style>