<template>
  <div>
    <el-dialog title="编辑" :visible.sync="dialogEditVisible" :before-close="onCancel">
      <el-form :model="item" status-icon :rules="rules" ref="item" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型" prop="type">
          <el-select v-model="item.type" placeholder="请选择类型">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
            <el-option label="E" value="E"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input type="text" v-model="item.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="expend">
          <el-input v-model.number="item.expend"></el-input>
        </el-form-item>
        <el-form-item label="现金" prop="cash">
          <el-input v-model.number="item.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model.number="item.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('item')">提交</el-button>
          <el-button @click="resetForm('item')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import axios from "axios";
  export default {
    props: ["item"],

    data() {
      var validateIncome = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("收入不能为空"));
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"));
          } else {
            callback();
          }
        }, 200);
      };
      var validateExpend = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("支出不能为空"));
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"));
          } else {
            callback();
          }
        }, 200);
      };
      var validateType = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请选择类型"));
        }
        setTimeout(() => {
          callback();
        }, 200);
      };
      var validateCash = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("现金不能为空"));
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"));
          } else {
            callback();
          }
        }, 200);
      };
      return {
        ruleForm: {
          type: "",
          income: "",
          expend: "",
          cash: "",
          desc: ""
        },
        rules: {
          income: [{
            validator: validateIncome,
            trigger: "blur"
          }],
          expend: [{
            validator: validateExpend,
            trigger: "blur"
          }],
          cash: [{
            validator: validateCash,
            trigger: "blur"
          }],
          type: [{
            validator: validateType,
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      ...mapActions(["setDialogEditVisible"]),
      onCancel() {
        this.setDialogEditVisible(false);
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.ruleForm.desc === "") {
              this.ruleForm.desc = "/";
            }
            this.$axios.post(`/api/profiles/edit/${this.item._id}`, this.item).then(res => {
              console.log(res.data);
              this.$emit("edited", this.item);
              this.onCancel();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed: {
      ...mapGetters(["dialogEditVisible"])
    }
  };
</script>