<template>
  <el-container>
    <!-- <el-aside>
			<cd-aside ref="aside"></cd-aside>
    </el-aside>-->
    <el-container>
      <el-header>
        <cd-header ref="header"></cd-header>
      </el-header>

      <el-main>
        <cd-main ref="main"></cd-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import CdAside from '@/components/cd-aside'
import CdHeader from "@/components/cd-header";
import CdMain from "@/components/cd-main";

export default {
  components: {
    CdHeader,
    CdMain
    // CdAside
  },
  watch: {
    $route: "updateRoute"
  },
  methods: {
    updateRoute() {
      this.$refs.header.activeIndex = this.$route.meta.headActive;
      console.log(this.$route.meta, this.$route.meta.headActive);
    }
  },
  mounted() {
    this.$store.dispatch("init");
    // 登录和刷新后延时重新渲染
    setTimeout(() => {
      this.updateRoute();
    }, 100);
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
}
</style>
