<template>
  <div>
    <el-dialog title="新增记录" :visible.sync="dialogFormVisible" :before-close="onCancel">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option label="销售收入" value="销售收入"></el-option>
            <el-option label="资产折旧" value="资产折旧"></el-option>
            <el-option label="税款" value="税款"></el-option>
            <el-option label="转账" value="转账"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收入" prop="income">
          <el-input type="text" v-model="ruleForm.income" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="expend">
          <el-input v-model.number="ruleForm.expend"></el-input>
        </el-form-item>
        <el-form-item label="实收/付金额" prop="cash">
          <el-input v-model.number="ruleForm.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model.number="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    data() {
      var validateIncome = (rule, value, callback) => {
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error("请输入数字值"));
          } else {
            callback();
          }
        }, 200);
      };
      var validateExpend = (rule, value, callback) => {
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
        setTimeout(() => {
          if (!Number.isInteger(value)) {
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
      ...mapActions(["setDialogFormVisible"]),
      onCancel() {
        this.setDialogFormVisible(false);
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.ruleForm.desc === "") {
              this.ruleForm.desc = "/";
            }
            if (this.ruleForm.income == "") {
              this.ruleForm.income = 0
            }
            if (this.ruleForm.expend == "") {
              this.ruleForm.expend = 0
            }
            if (this.ruleForm.cash == "") {
              this.ruleForm.cash = 0
            }
            this.$axios.post("/api/profiles/add", this.ruleForm).then(res => {
              console.log(res.data);
              this.$emit("added", this.ruleForm);
              this.onCancel();
              this.resetForm('ruleForm')
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
      ...mapGetters(["dialogFormVisible"])
    }
  };
</script>