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
            <el-button
              type="text"
              class="regist"
              @click="order='regist'"
            >注册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
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
            <el-button
              type="text"
              class="regist"
              @click="order='login'"
            >返回&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </span>
          <el-button
            type="primary"
            class="login-btn"
            @click="regist()"
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
        name: "Genius淼",
        password: "739416541",
        order: "yuwan"
      },
      form2: {
        name: "",
        password: "",
        comfirm: "",
        order: ""
      },
      admin: {
        name: "Genius淼",
        password: "739416541",
        order: "yuwan"
      },
      allowRun: true,
      order: "login",
      token: { order: "***", valid: "10" }
    };
  },
  methods: {
    same(a, b) {
      return JSON.stringify(a) == JSON.stringify(b);
    },
    copy(a) {
      return JSON.parse(JSON.stringify(a));
    },
    submitForm() {
      if (this.allowRun) {
        var form = this.form;
        if (form.name == "") {
          this.$message.error("用户名不能为空!");
          return;
        } else if (form.password == "") {
          this.$message.error("密码不能为空!");
          return;
        } else if (!(1 <= form.name.length && form.name.length <= 10)) {
          this.$message.error("名称为1-10位");
          return;
        } else if (!(6 <= form.password.length && form.password.length <= 16)) {
          this.$message.error("密码为6-16位");
          return;
        }

        this.$eventHub.$emit("loading", true);
        this.allowRun = false;
        var res = false,
          admin = false;

        if (form.name == "Genius淼") {
          if (this.same(form, this.admin)) res = true;
        } else {
          let userList = this.$storage.get("userList") || [];
          let adminList = this.$storage.get("adminList") || [];
          form.order = "";
          for (let i = 0; i < userList.length; i++) {
            if (this.same(userList[i], form)) {
              res = true;
              break;
            }
          }
          if (!res) {
            form.order = "yuwan";
            for (let i = 0; i < adminList.length; i++) {
              if (this.same(adminList[i], form)) {
                res = true;
                admin = true;
                break;
              }
            }
          }
        }

        setTimeout(() => {
          if (res) {
            // 增加失效时间 stamp
            this.token["stamp"] = Date.now() + Number(this.token.valid) * 1000;
            form.token = this.token;
            this.$storage.set("user", form);
            // 此时要判断/login的参数，若无参数，进入主页；若有参数则参数为未有权限的那个路由，跳转到那个路由
            let path = this.$router.currentRoute.query.redirect
              ? this.$router.currentRoute.query.redirect
              : "/";
            this.$router.push(path);
          } else {
            this.$message.error("用户名或密码错误!");
          }
          this.allowRun = true;
          this.$eventHub.$emit("loading", false);
        }, 1500);
      }
    },
    regist() {
      if (this.allowRun) {
        var form2 = this.form2;
        if (form2.name == "") {
          this.$message.error("用户名不能为空!");
          return;
        } else if (form2.password == "") {
          this.$message.error("密码不能为空!");
          return;
        } else if (form2.comfirm == "") {
          this.$message.error("确认密码不能为空!");
          return;
        } else if (!(1 <= form2.name.length && form2.name.length <= 10)) {
          this.$message.error("名称为1-10位");
          return;
        } else if (
          !(6 <= form2.password.length && form2.password.length <= 16)
        ) {
          this.$message.error("密码为6-16位");
          return;
        } else if (!(6 <= form2.comfirm.length && form2.comfirm.length <= 16)) {
          this.$message.error("确认密码为6-16位");
          return;
        } else if (form2.password != form2.comfirm) {
          this.$message.error("两次密码不一致!");
          return;
        }
        this.$eventHub.$emit("loading", true);
        this.allowRun = false;
        var res = true,
          error = "",
          admin = form2.order == "yuwan",
          userList = this.$storage.get("userList") || [],
          adminList = this.$storage.get("adminList") || [];

        if (form2.name == "Genius淼") {
          res = false;
          error = "Genius淼是管理员名称,请更换名称!";
        } else {
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].name == form2.name) {
              res = false;
              error = `${
                admin
                  ? "尊敬的" + form2.name + ",该名称已经存在,请更换名称..."
                  : form2.name + "已存在,请更换名称!"
              }`;
              break;
            }
          }
          if (res) {
            for (let i = 0; i < adminList.length; i++) {
              if (adminList[i].name == form2.name) {
                res = false;
                error = `${
                  admin
                    ? "尊敬的" + form2.name + ",该名称已经存在,请更换名称..."
                    : form2.name + "已存在,请更换名称!"
                }`;
                break;
              }
            }
          }
        }

        setTimeout(() => {
          if (res) {
            let list = admin ? adminList : userList;
            form2.order = admin ? "yuwan" : "";
            this.form.name = form2.name;
            this.form.password = form2.password;
            list.push({
              name: form2.name,
              password: form2.password,
              order: form2.order
            });
            this.$storage.set(admin ? "adminList" : "userList", list);
            this.order = "login";
            this.$message.success(
              admin
                ? "成功注册尊敬的管理员:" + form2.name
                : "成功注册用户:" + form2.name
            );
            this.form2 = {
              name: "",
              password: "",
              comfirm: "",
              order: ""
            };
            console.log(admin ? "成功注册管理员" : "成功注册用户");
            console.log(list);
          } else {
            this.$message.error(error);
          }
          this.allowRun = true;
          this.$eventHub.$emit("loading", false);
        }, 1000);
      }
    }
  },
  mounted() {
    if (!this.$storage.get("adminList")) {
      this.$storage.set("adminList", [this.admin]);
    }

    if ((this.$storage.get("user") || {}).token) {
      this.$router.push("/index");
    }
    if (this.$router.currentRoute.query.redirect) {
      this.$notify({
        title: "提示",
        message: "登录过期，请重新登录",
        type: "info"
      });
    }
    console.log("所有管理员:", this.$storage.get("adminList"));
    console.log("所有用户:", this.$storage.get("userList"));
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
