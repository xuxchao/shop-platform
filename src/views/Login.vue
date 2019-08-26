<template>
  <div class="login">
    <div class="login_box">
      <h3>数据大屏管理后台系统登录</h3>
      <el-form :model="ruleForm" ref="ruleForm">
        <el-form-item prop="UserName" :rules="$rules.name">
          <el-input v-model="ruleForm.UserName" prefix-icon="el-icon-user-solid" placeholder="请输入用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="Pwd" :rules="$rules.pwd">
          <el-input v-model="ruleForm.Pwd" prefix-icon="el-icon-lock" @keyup.enter.native="emit" type="password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="login_box_btm">
        <el-button type="primary" @click="emit">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      ruleForm: {
        UserName: '123',
        Pwd: '123123'
      }
    }
  },
  methods: {
    emit () {
      this.$refs.ruleForm.validate(vaild => {
        if (vaild) {
          let obj = {
            UserName: this.ruleForm.UserName,
            Pwd: this.ruleForm.Pwd
          }
          console.log(obj)
          this.$router.push('/user')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login {
    height: 100vh;
    background-image: url('../assets/img/bgImg.jpg');
    background-size: cover;
    position: relative;
    .login_box {
      position: absolute;
      width: 25%;
      height: 35%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      h3 {
        text-align: center;
        margin-bottom: 10%;
        font-size: 30px;
        color: #fff;
        letter-spacing: 5px;
      }
      .el-form-item {
        margin-bottom: 10%;
      }
      .login_box_btm {
        text-align: center;
        .el-button {
          width: 100%;
        }
      }
    }
  }

</style>
