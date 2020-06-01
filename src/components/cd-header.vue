<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="header"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index class="header-title">
        <img class="header-img" src="@/assets/logo.png" alt />
        <h1>咖 啡 甜 点</h1>
      </el-menu-item>
      <el-menu-item route="/home" index="1">首页</el-menu-item>
      <el-menu-item route="/match-make" index="2">搭配制作</el-menu-item>
      <el-menu-item route="/news" index="3">新闻文章</el-menu-item>
      <el-menu-item route="/discuss" index="4">
        <el-badge :value="1" :max="99" class="item">咖啡圈子</el-badge>
      </el-menu-item>
      <el-menu-item route="/about" index="5">
        <el-badge is-dot class="dot">关于CD</el-badge>
      </el-menu-item>

      <el-submenu index="6" class="personal" v-if="user">
        <template slot="title">
          <el-avatar v-show="img=='man'" :size="30" :src="require('./img/man.jpg')"></el-avatar>
          <el-avatar v-show="img=='woman'" :size="30" :src="require('./img/woman.jpg')"></el-avatar>
          {{user.name}}
        </template>
        <el-menu-item
          index="6-1"
          @click="$router.push({path:'/discuss',query:{activeName:'fourth'}})"
        >个人中心</el-menu-item>
        <el-menu-item index="6-2">注册人脸</el-menu-item>
        <!-- <a href="https://www.ele.me" target="_blank">注册人脸</a> 	-->
        <el-menu-item index="6-3" class="divider">
          <el-divider></el-divider>
        </el-menu-item>

        <el-menu-item @click="quit()">退出登录</el-menu-item>
      </el-submenu>

      <el-menu-item
        v-else
        class="unload"
        @click="$router.push({path:'/login',query:{loginToPage:$route.fullPath}})"
      >登录</el-menu-item>

      <!-- <el-menu-item index="/404">404</el-menu-item> -->
    </el-menu>

    <!-- <el-dialog title="提示" :visible.sync="showFace" width="60%" class="dialog" top="1vh">
      <iframe src="http://localhost:8000/users/sign_in_by_face/" height="100%" width="100%"></iframe>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: "CdHeader",
  data() {
    return {
      activeIndex: "10",
      user: "",
      img: "",
      showFace: true
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$nextTick(() => {
        this.activeIndex = key;
      });
      console.log(key, keyPath);
      if (key == "6-2")
       window.location.href =  `http://127.0.0.1:8000/users/entry_face?username=${this.$session.get('user').name}`;
    
      // location.href="";
    },
    quit() {
      this.$eventHub.$emit("loading", true);
      this.$session.remove("user");

      setTimeout(() => {
        this.$eventHub.$emit("loading", false);
        this.$router.push("/login");
      }, 1000);
    }
  },
  mounted() {
    // localStorage.clear()
    this.user = this.$session.get("user");
    if (this.user) this.img = this.user.msg.headImg;
    this.$eventHub.$on("headImg", val => {
      console.log(val);
      this.img = val;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dialog /deep/ {
  .el-dialog__body {
    height: 600px;
  }
}

.header {
  background: radial-gradient(rgb(255, 179, 0), white);

  .el-menu-item {
    margin-left: 20px;
    color: rgba(255, 255, 255, 1);
    text-shadow: 1px 1px 3px rgba(34, 34, 32, 0.8);
    font-weight: bold;

    .el-badge {
      line-height: 1.2;

      /deep/ .el-badge__content {
        right: 0;
      }
    }
  }

  .el-menu-item.is-active {
    color: rgba(0, 0, 0, 0.8);
    text-shadow: 1px 1px 3px rgba(188, 160, 17, 0.8);
  }

  > .el-menu-item.is-active,
  .el-submenu.is-active {
    border-bottom: 2px solid #f3bd34;
  }

  .el-submenu /deep/ .el-submenu__title {
    border-bottom: none;
  }

  > .el-menu-item:not(.is-disabled):focus,
  > .el-menu-item:not(.is-disabled):hover,
  > .el-submenu .el-submenu__title:hover {
    background-color: rgba($color: rgb(253, 244, 196), $alpha: 0.3);
  }

  .header-title {
    width: 500px;

    .header-img {
      height: 100%;
      display: inline;
    }

    h1 {
      display: inline;
      margin-left: 30px;
      font-size: 40px;
      font-family: 楷体;
      color: rgba($color: #fc7e00, $alpha: 0.8);
      text-shadow: 3px 3px 5px rgba($color: #d1a023, $alpha: 1);
    }
  }

  .personal {
    float: right;
    /deep/ .el-submenu__title {
      &:hover {
        background-color: rgba($color: rgb(253, 244, 196), $alpha: 0.3);
      }
    }
  }
  .unload {
    float: right;
    &:hover {
      background-color: rgba($color: rgb(253, 244, 196), $alpha: 0.3);
    }
  }
}
</style>
