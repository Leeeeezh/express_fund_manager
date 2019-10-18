<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>确认登出?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="confirm" type="warning">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['dialogVisible'])
    },
    methods: {
      ...mapActions(['setDialogVisible','setUser','setAuthenticated']),
      handleClose(){
        const currentRoute = this.$route.path
        this.setDialogVisible(false)
      },
      cancel(){
        this.setDialogVisible(false)
      },
      confirm(){
        this.setDialogVisible(false)
        localStorage.removeItem('token')
        this.setUser({})
        this.setAuthenticated(false)
        this.$router.replace('/login')
      }
    }
  };
</script>