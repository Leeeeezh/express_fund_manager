<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogDeleteVisible" width="30%" :before-close="onCancel">
      <span>确认删除?</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onCancel">取 消</el-button>
        <el-button type="danger" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed:{
      ...mapGetters(['dialogDeleteVisible'])
    },
    methods: {
      ...mapActions(['setDialogDeleteVisible']),
      onCancel(){
        this.setDialogDeleteVisible(false)
      },
      onConfirm() {
        this.setDialogDeleteVisible(false)
        this.$emit('confirm')
      }
    }
  };
</script>