<template>
  <div class="login">
    <div class="box" v-if="order=='login'">
      <div class="title">
        <span>登 录</span>
      </div>

      <el-form ref="form" :model="form" label-width="100px" label-suffix=":" size="small">
        <!-- <el-form-item label="机构代码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>-->
        <el-form-item label="用户名">
          <el-input v-model="form.name" clearable>
            <template>
              <span slot="prefix" class="user-icon"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password clearable>
            <span slot="prefix" class="pwd-icon"></span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <el-button type="text" class="regist" @click="order='regist'">注册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </span>
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm()"
          >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="box" v-else-if="order=='regist'">
      <div class="title">
        <span>注 册</span>
      </div>

      <el-form ref="form2" :model="form2" label-width="120px" label-suffix=":" size="small">
        <!-- <el-form-item label="机构代码">
          <el-input v-model="form.code"></el-input>
        </el-form-item>-->
        <el-form-item label="用户名">
          <el-input v-model="form2.name" clearable>
            <template>
              <!-- <span slot="prefix" class="user-icon"></span> -->
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form2.password" type="password" show-password clearable>
            <!-- <span slot="prefix" class="pwd-icon"></span> -->
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form2.comfirm" type="password" show-password clearable>
            <!-- <span slot="prefix" class="pwd-icon"></span> -->
          </el-input>
        </el-form-item>
        <el-form-item label="口令(选)">
          <el-input v-model="form2.order" type="password" show-password clearable>
            <!-- <span slot="prefix" class="pwd-icon"></span> -->
          </el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <el-button type="text" class="regist" @click="order='login'">返回&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </span>
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm()"
          >注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { postLogin } from "@/api/login";

export default {
  name: "",
  data() {
    return {
      form: {
        code: "1",
        name: "yyf",
        password: "123456"
      },
      form2:{
        name:"",
        password:'',
        comfirm:"",
        order:""
      },
      allowRun: true,
      order: "login"
    };
  },
  methods: {
    submitForm() {
      if (this.allowRun) {
        this.$eventHub.$emit("loading", true);
        this.allowRun = false;
        setTimeout(() => {
          postLogin(this.form.code, this.form.name, this.form.password)
            .then(res => {
              // this.$eventHub.$emit("loadingText", "登录成功");
              // this.$eventHub.$emit("firstBig", false);

              let tokenInfo = res.data.data;
              let path = this.$router.currentRoute.query.redirect
                ? this.$router.currentRoute.query.redirect
                : "/home";
              console.log(path);
              this.$storage.set("tokenInfo", tokenInfo);
              this.$eventHub.$emit("loading", false);
              this.$router.push(path);

              // setTimeout(() => {
              //   this.$eventHub.$emit("loading", false);
              //   this.$eventHub.$emit("loadingText", "Load...");
              //   this.$eventHub.$emit("firstBig", true);
              //   this.$router.push(path);
              // }, 1000);
            })
            .catch(error => {
              this.allowRun = true;
            });
        }, 2500);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$textColor: rgb(255, 145, 0);
$titleColor: rgb(255, 30, 0);
$borderColor: rgba(255, 219, 58, 0.5);
$borderDeepColor: rgba(255, 136, 0, 0.8);
$shadowColor: rgb(255, 231, 164);
.login {
  height: 100%;
  display: flex;
  //   flex-direction: row;
  justify-content: center;
  align-items: center;
  // ./img/login.jpg
  // ../../assets/imgs/mm1.jpg
  background: url("./img/login.jpg") no-repeat;
  background-size: 100% 100%;

  .box {
    opacity: 0;
    flex: 0.3;
    border: 1px solid $borderColor;
    box-shadow: 0 0 3px $shadowColor;
    padding: 20px 50px;
    border-radius: 10px;
    font-family: 楷体;
    transition: opacity 0.5s;
    background-color: rgba($color: #fff8f1, $alpha: 1);

    &:hover {
      box-shadow: 0 0 8px $shadowColor;
      opacity: 0.9;
    }

    .title {
      text-align: center;
      padding: 0px 0 20px;
      span {
        font-size: 50px;
        font-weight: 800;
        opacity: 0.8;
        text-shadow: 3px 3px 3px $shadowColor;
        color: $titleColor;
      }
    }

    .el-form {
      .el-form-item /deep/ {
        .el-form-item__label {
          font-weight: bolder;
          font-size: 22px;
          color: $titleColor;
          text-shadow: 1px 1px 3px $shadowColor;
        }
        .el-form-item__content {
          .el-input {
            .el-input__inner {
              color: $textColor;
              font-size: 16px;
              border-color: $borderColor;
              &:focus {
                border-color: $borderDeepColor;
                box-shadow: 0 0 20px $shadowColor;
              }
              &:hover {
                border-color: $borderDeepColor;
                border-width: 1.5px;
              }
            }
          }
          .el-input__prefix {
            padding: 4px 0;
            .user-icon {
              position: absolute;
              width: 24px;
              height: 24px;
              background: url("./img/login-icon.png");
              background-position: -5px -71px;
            }
            .pwd-icon {
              position: absolute;
              width: 24px;
              height: 24px;
              background: url("./img/login-icon.png");
              background-position: -112px -36px;
            }
          }
        }

        .login-btn {
          width: 100%;
          background-color: rgba($color: $textColor, $alpha: 0.8);
          border-color: $borderColor;
          opacity: 0.7;

          &:hover {
            opacity: 1;
          }
        }

        .regist {
          color: rgba($color: $textColor, $alpha: 0.8);
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
