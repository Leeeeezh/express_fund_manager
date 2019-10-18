<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import jwtDecode from 'jwt-decode'
export default {
  created(){
    const token = localStorage.token
    if(token){
      this.setAuthenticated(true)
      this.setUser(jwtDecode(token))
    }else{
      if(this.$route.path!=='/login'){
        this.$router.replace("/login")
      }
    }
  },
  methods:{
    ...mapActions(["setAuthenticated", "setUser"]),
  }
}
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
