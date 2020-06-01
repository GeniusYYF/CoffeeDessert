<template>
  <div class="login">
    <div class="box" v-if="box=='login'">
      <div class="title">
        <span>登 录</span>
      </div>

      <el-form ref="form" :model="form" label-width="100px" label-suffix=":" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form.name" clearable @keyup.enter.native="submitForm()">
            <template>
              <span slot="prefix" class="user-icon"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            clearable
            @keyup.enter.native="submitForm()"
          >
            <span slot="prefix" class="pwd-icon"></span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <el-button
              type="text"
              class="regist-btn"
              @click="box='regist'"
            >注 册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </span>
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm()"
          >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>

          <el-button type="text" class="jump-btn" @click="$router.push('/')">👉跳过登录</el-button>

          <el-popover
            v-model="face.visible"
            placement="bottom"
            title="请输入用户名"
            width="200"
            trigger="manual"
          >
            <el-button
              slot="reference"
              type="text"
              class="jump-btn"
              @click="face.visible=true"
            >👉人脸登录</el-button>
            <span slot>
              <el-input v-model="face.name"></el-input>
              <div style="padding-top:10px">
                <el-button
                  size="mini"
                  type="warning"
                  plain
                  @click="face.visible=false;loginFace()"
                >确 认</el-button>
                <el-button size="mini" @click="face.visible=false">取 消</el-button>
              </div>
            </span>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>

    <div class="box" v-else-if="box=='regist'">
      <div class="title">
        <span>注 册</span>
      </div>

      <el-form ref="form2" :model="form2" label-width="120px" label-suffix=":" size="small">
        <el-form-item label="用户名">
          <el-input v-model="form2.name" clearable @keyup.enter.native="regist()">
            <template></template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form2.password"
            type="password"
            show-password
            clearable
            @keyup.enter.native="regist()"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            v-model="form2.comfirm"
            type="password"
            show-password
            clearable
            @keyup.enter.native="regist()"
          ></el-input>
        </el-form-item>
        <el-form-item label="口令(选)">
          <el-input
            v-model="form2.order"
            type="password"
            show-password
            clearable
            @keyup.enter.native="regist()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span slot="label">
            <el-button
              type="text"
              class="regist-btn"
              @click="box='login'"
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
  computed: {},
  data() {
    return {
      loaded: false,
      form: {
        name: "",
        password: "",
        order: ""
      },
      form2: {
        name: "",
        password: "",
        comfirm: "",
        order: ""
      },

      allowRun: true,
      box: "login",
      token: { order: "***", valid: "3600" },
      order: {
        get: () => {
          var date = Date.now();
          var temp = parseInt(date / 1000 / 60) / 19980818 + "";
          var order = temp.slice(temp.length - 6);
          console.log(
            "时间戳：",
            date,
            "分钟：",
            parseInt(date / 1000 / 60),
            "temp：",
            temp,
            "order：",
            order
          );
          return order;
        }
      },
      face: { name: "", visible: false }
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
          admin = false,
          index = 0;

        let userList = this.$storage.get("userList") || [];
        let adminList = this.$storage.get("adminList") || [];
        let name = "",
          password = "";

        for (let i = 0; i < userList.length; i++) {
          if (
            form.name == userList[i].name &&
            form.password == userList[i].password
          ) {
            res = true;
            index = i;
            break;
          }
        }
        if (!res) {
          for (let i = 0; i < adminList.length; i++) {
            if (
              form.name == adminList[i].name &&
              form.password == adminList[i].password
            ) {
              res = true;
              admin = true;
              index = i;
              break;
            }
          }
        }

        setTimeout(() => {
          if (res) {
            // 增加失效时间 stamp
            let user = admin ? adminList[index] : userList[index];
            this.token["stamp"] = Date.now() + Number(this.token.valid) * 1000;
            user.token = this.token;
            user.msg.dropList = user.msg.dropList || "爱心";

            this.$session.set("user", user);
            // 此时要判断/login的参数，若无参数，进入主页；若有参数则参数为未有权限的那个路由，跳转到那个路由
            let path =
              this.$router.currentRoute.query.redirect ||
              this.$router.currentRoute.query.loginToPage ||
              "/";
            console.log(path, user);
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
          admin = form2.order == this.order.get(),
          userList = this.$storage.get("userList") || [],
          adminList = this.$storage.get("adminList") || [];
        console.log(this.order.get());
        if (form2.name == "Genius淼") {
          res = false;
          error = "Genius淼是管理员名称,请更换名称!";
        } else {
          for (let i = 0; i < userList.length; i++) {
            if (userList[i].name == form2.name) {
              res = false;
              error = `${
                admin
                  ? "尊敬的管理员," + form2.name + "已经存在,请更换名称..."
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
                    ? "尊敬的管理员," + form2.name + "已经存在,请更换名称..."
                    : form2.name + "已存在,请更换名称!"
                }`;
                break;
              }
            }
          }
        }

        setTimeout(() => {
          if (res) {
            this.form.name = form2.name;
            this.form.password = form2.password;

            if (admin) {
              adminList.push({
                id: adminList.length,
                name: form2.name,
                password: form2.password,
                order: this.order.get(),
                msg: {
                  name: form2.name,
                  age: "",
                  sex: "未知",
                  sign: "",
                  tags: [],
                  headImg: "man"
                },
                speaks: [],
                noticeList: []
              });
              this.$storage.set("adminList", adminList);
              this.box = "login";
              this.$message.success("成功注册尊敬的管理员:" + form2.name);
              console.log("成功注册管理员");
            } else {
              userList.push({
                id: userList.length,
                name: form2.name,
                password: form2.password,
                order: "",
                msg: {
                  name: form2.name,
                  age: "",
                  sex: "未知",
                  sign: "",
                  tags: [],
                  headImg: "man"
                },
                speaks: [],
                noticeList: []
              });
              this.$storage.set("userList", userList);
              this.box = "login";
              this.$message.success("成功注册用户:" + form2.name);
              console.log("成功注册用户");
            }

            this.form2 = {
              name: "",
              password: "",
              comfirm: "",
              order: ""
            };
          } else {
            this.$message.error(error);
          }
          this.allowRun = true;
          this.$eventHub.$emit("loading", false);
        }, 1000);
      }
    },
    loginFace() {
      let res = false;
      let userList = this.$storage.get("userList") || [];
      userList.forEach(item => {
        if (item.name == this.face.name) res = true;
      });
      let adminList = this.$storage.get("adminList") || [];
      adminList.forEach(item => {
        if (item.name == this.face.name) res = true;
      });

      if (res) {
        window.location.href =
          "http://127.0.0.1:8000/users/sign_in_by_face?res=true&username=" +
          this.face.name;
      } else {
        this.$message.error("该账号尚未注册，请先注册账号！");
      }
    }
  },
  mounted() {
    console.log(this.order.get(), "(一分钟内有效)");
    this.loaded = true; // 开始增加样式（动画）

    if ((this.$session.get("user") || {}).token) {
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
// ---动画参数---
$page-duration: 1.5s;

.login {
  // height: 100%;
  // width: 100%;
  position: fixed;
  display: flex;
  //   flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url("./img/login.jpg") no-repeat;
  background-size: 100% 100%;
  animation: ease infinite dropdown;
  animation-duration: 1s;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(1, 1, 1, 1);
  transition: all 0.1s;

  .box {
    opacity: 0.7;
    flex: 0.3;
    border: 1px solid $borderColor;
    box-shadow: 0 0 3px $shadowColor;
    padding: 20px 50px 0;
    border-radius: 10px;
    font-family: 楷体;
    // transition: opacity 0.5s;
    background-color: rgba($color: #fff8f1, $alpha: 1);
    // animation: ease infinite box-rotate;
    animation-duration: $page-duration;
    animation-delay: 0;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(1, 1, 1, 1);
    transition: all 0.1s;

    &:hover {
      box-shadow: 0 0 8px $shadowColor;
      opacity: 0.99;
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
                box-shadow: 0 0 10px $shadowColor;
              }
              &:hover {
                border-color: $borderDeepColor;
                // border-width: 1.5px;
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

        .regist-btn {
          font-size: 14px;
          color: rgba($color: $textColor, $alpha: 0.8);
          opacity: 0.7;
          line-height: 2;
          &:hover {
            opacity: 1;
            font-size: 16px;
          }
        }
        .jump-btn {
          font-size: 14px;
          color: rgba($color: $textColor, $alpha: 0.8);
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }
        .jump-btn {
          margin-top: 10px;
          float: right;
        }
      }
    }
  }
}
// 460 300
@keyframes dropdown {
  0% {
    bottom: 100%;
    transform: rotate(0);
    transform-origin: 20% 40%;
    left: 0;
  }
  25% {
    bottom: 50%;
    transform: rotate(90deg);
    left: 25%;
  }
  50% {
    bottom: 0;
    left: 50%;
    transform: rotate(180deg);
  }
  75% {
    left: 75%;
    transform: rotate(270deg);
    bottom: 200px;
    width: 460px;
    height: 300px;
  }
  100% {
    left: 0;
    transform: rotate(360deg);
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}
@keyframes box-rotate {
  0% {
    transform: rotate(0);
    // transform-origin: 20% 40%;
  }
  25% {
    transform: rotate(720deg);
  }
  50% {
    transform: rotate(1080deg);
  }
  75% {
    transform: rotate(1260deg);
  }
  100% {
    transform: rotate(1440deg);
  }
}
</style>
