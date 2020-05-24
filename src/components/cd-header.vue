<template>
  <el-menu
    :default-active="activeIndex"
    class="header"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <el-menu-item index class="header-title">
      <img class="header-img" src="@/assets/logo.png" alt />
      <h1>咖 啡 甜 点</h1>
    </el-menu-item>
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/match-make">搭配制作</el-menu-item>
    <el-menu-item index="/news">新闻文章</el-menu-item>
    <el-menu-item index="/discuss">咖啡圈子</el-menu-item>
    <el-menu-item index="/about">关于CD</el-menu-item>

    <el-submenu index class="personal">
      <template slot="title">Genius淼</template>
      <el-menu-item  @click="$router.push({path:'/discuss',meta:{activeName:'fourth'}})">个人中心</el-menu-item>
      <el-menu-item index="/regist-face" disabled>注册人脸</el-menu-item>
      <!-- <a href="https://www.ele.me" target="_blank">注册人脸</a> 	-->
      <el-menu-item index class="divider">
        <el-divider></el-divider>
      </el-menu-item>

      <el-menu-item index @click="quit()">退出登录</el-menu-item>
    </el-submenu>

    <!-- <el-menu-item index="/404">404</el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  name: "CdHeader",
  data() {
    return {
      activeIndex: "/home"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      this.$storage.remove("tokenInfo");
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  background: radial-gradient(rgb(255, 179, 0), white);

  .el-menu-item {
    margin-left: 20px;
    color: rgba(255, 255, 255, 1);
    text-shadow: 1px 1px 3px rgba(34, 34, 32, 0.8);
    font-weight: bold;
  }

  .el-menu-item.is-active {
    color: rgba(0, 0, 0, 0.8);
    text-shadow: 1px 1px 3px rgba(188, 160, 17, 0.8);
  }

  > .el-menu-item.is-active {
    border-bottom: 2px solid #f3bd34;
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
}
</style>
