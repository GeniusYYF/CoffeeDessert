<template>
  <el-menu default-active="1" class="main">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>咖啡搭配</span>
      </template>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">烘烤咖啡+巧克力蛋糕</span>
      </el-menu-item>
	  <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">卡布奇诺+提拉米苏</span>
      </el-menu-item>
	  <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">美式咖啡+芝士蛋糕</span>
      </el-menu-item>

    </el-submenu>

	 <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>咖啡制作</span>
      </template>
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
	  <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
	  <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
	  <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
	  <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
    </el-submenu>
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
.main {
  background: rgba(255, 240, 206, 0.8);
}
</style>
