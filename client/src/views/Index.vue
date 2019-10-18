<template>
  <div class="index">
    <el-row>
      <div class="header">
        <Header />
      </div>
    </el-row>
    <el-row>
      <el-col :span="4">
        <Nav />
      </el-col>
      <el-col :span="20">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
    <LogoutConfirm />

  </div>
</template>
<script>
  import Nav from '../components/Nav.vue'
  import LogoutConfirm from '../components/LogoutConfirm.vue'
  import Header from '../components/Header.vue'

  export default {
    data() {
      return {

      }
    },
    components: {
      Nav,
      LogoutConfirm,
      Header
    }
  }
</script>
<style scoped>
  .index {
    width: 100%;
    height:100vh;
  }
</style>