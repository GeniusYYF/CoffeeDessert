<template>
  <el-menu default-active="match" class="mm-aside" router :default-openeds="['make']">
    <el-menu-item index="match">
      <i class="el-icon-potato-strips"></i>
      <span>咖啡搭配</span>
    </el-menu-item>

    <el-submenu index="make">
      <template slot="title">
        <i class="el-icon-knife-fork"></i>
        <span>咖啡制作</span>
      </template>
      <el-menu-item index="make-use">
        <span slot="title">设备用法</span>
      </el-menu-item>
      <el-menu-item index="make-case">
        <span slot="title">饮用说明</span>
      </el-menu-item>
      <el-menu-item index="make-analyse">
        <span slot="title">名词介绍</span>
      </el-menu-item>
    </el-submenu>

    <el-menu-item index="state">
      <i class="el-icon-coffee"></i>
      <span slot="title">饮用指南</span>
    </el-menu-item>

    <el-menu-item index="goodbad">
      <i class="el-icon-guide"></i>
      <span slot="title">利弊分析</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      list: []
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.mm-aside {
  // background: rgba(255, 240, 206, 0.8);
  .el-submenu,
  .el-menu-item,
  .el-menu {
    background: transparent;
    /deep/ .el-menu--inline {
      background: transparent;
    }
  }
  .el-menu-item:hover,
  .el-menu-item.is-active {
    background-color: rgb(235, 245, 255);
  }
}
</style>
