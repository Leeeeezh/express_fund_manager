<template>
  <div class="login">
    <div class="container">
      <div class="form">
        <h1>登录</h1>
        <el-form size="mini" label-position="top" ref="form" :model="form" label-width="80px">
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="onReg">
          注册
          <i class="el-icon-right"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    ...mapActions(["setAuthenticated", "setUser"]),
    validate() {
      if (!this.form.email) {
        this.$message({
          message: "请输入邮箱",
          type: "warning"
        });
        return false;
      }
      if (
        !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          this.form.email
        )
      ) {
        this.$message({
          message: "邮箱格式不正确",
          type: "warning"
        });
        return false;
      }
      const length = this.form.password.length;
      if (length < 8 || length > 16) {
        this.$message({
          message: "密码长度应该在8~16位之间",
          type: "warning"
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (!this.validate()) {
        return;
      }
      this.$axios
        .post("/api/users/login", this.form)
        .then(res => {
          console.log(res.data.token);
          let token = res.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          console.log(decoded);
          this.setAuthenticated(!!token);
          this.setUser(decoded);
          this.$message({
            message: "登录成功,即将跳转",
            type: "success"
          });
          this.loading = false;
          setTimeout(() => {
            this.$router.replace("/index/home");
          }, 2000);
        })
        .catch(err => {
          this.$message({
            message: "邮箱或密码错误",
            type: "error"
          });
          this.loading = false;
          console.log(err);
        });
    },
    onReg() {
      this.$router.replace("/register");
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  background: url(../assets/img/bg.png) no-repeat center center;
  background-size: cover;
}

.login .btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.login h1 {
  padding: 0 0 20px 0;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: #333;
}

.login .container {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.4);
}
</style>