<template>
  <div class="login">
    <div class="box" v-if="box=='login'">
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
              class="regist-btn"
              @click="box='regist'"
            >注册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </span>
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm()"
          >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          <el-button type="text" class="jump-btn" @click="$router.push('/')">跳过登录</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="box" v-else-if="box=='regist'">
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
      admin: {
        id: "0",
        name: "Genius淼",
        password: "739416541",
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
      }
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
            this.$storage.set("user", user);
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
                msg: { name: form2.name }
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
                msg: { name: form2.name }
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
    }
  },
  mounted() {
    console.log(this.order.get(), "(一分钟内有效)");
    // this.admin.order = this.order.get()
    // this.$storage.set("adminList", [this.admin]);
    if (!this.$storage.get("adminList")) {
      this.admin.order = this.order.get();
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
    opacity: 0.7;
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

        .regist-btn,
        .jump-btn {
          color: rgba($color: $textColor, $alpha: 0.8);
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }
        .jump-btn {
          float: right;
        }
      }
    }
  }
}
</style>
