<template>
  <div class="register">
    <div class="form">
      <h1>注册</h1>

      <el-form
        size="mini"
        label-position="top"
        :model="registerUser"
        status-icon
        :rules="rules"
        ref="registerUser"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="registerUser.checkPassword" placeholder="请确认密码"></el-input>
        </el-form-item>

        <el-form-item label="身份" prop="role">
          <el-select v-model="registerUser.role" placeholder="请选择身份">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('registerUser')">注册</el-button>
          <el-button type="warning" @click="resetForm('registerUser')">重置</el-button>
          <el-button @click="login">返回登录<i class="el-icon-right"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (value.length < 2 || value.length > 20) {
          callback(new Error("长度应在2~20之间"));
        }
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            value
          )
        ) {
          callback();
        }
        callback(new Error("邮箱格式有误"));
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 8 || value.length > 16) {
          callback(new Error("密码长度应在8~16位"));
        }

        if (this.registerUser.checkord !== "") {
          this.$refs.registerUser.validateField("checkPassword");
        }

        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerUser.password) {
        callback(new Error("密码不一致!"));
      } else {
        callback();
      }
    };
    var validateRole = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请选择身份"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        role: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPassword: [{ validator: validatePassword2, trigger: "blur" }],
        role: [{ validator: validateRole, trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              // this.loading = false;
              this.$message({
                  message: "注册成功,即将跳转至登录页",
                  type: "success"
                });
              setTimeout(() => {
                this.$router.push('/login')
              }, 2000);
            })
            .catch(err => {
              console.log('err')
              this.loading = false;
              if (err.response.status === 409) {
                this.$message({
                  message: "该邮箱已经被注册🤣",
                  type: "error"
                });
              }
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
  }
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  /* background-color: #003f5c; */
  background: url(../assets/img/bg.png) no-repeat center center;
  background-size: cover;
}
.register h1 {
  padding: 0 0 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: #333;
}

.register .form {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.4);
}
</style>