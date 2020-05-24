<template>
  <el-card class="mm-img" shadow="hover">
    <div class="image" :style="{'background-image':`url(`+require(`./img/${name}`)+`)`}"></div>
    <!-- <el-image class="image" :src="require('@/assets/match-content/'+url)"></el-image> -->

    <div class="title">
      <span>{{title}}</span>
    </div>
    <div class="text">{{text}}</div>
  </el-card>
</template>

<script>
export default {
  props: ["title", "text", "name"],
  data() {
    return {
      baseImgUrl: "@/assets/match-content/"
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.mm-img {
  margin: 20px;
  //   height: 250px;
  width: 200px;
  display: inline-block;
  position: relative;

  /deep/ .el-card__body {
    padding: 0 15px 10px;
  }

  .image {
    height: 200px;
    // width: 150px;
    background-size: 100% 100%;
    // background-position: 0 -50px;
    // display: inline-block;
  }

  .title {
    text-align: left;
  }
  .text {
    position: absolute;
    color: rgb(46, 46, 46);
    top: 100%;
    left: 0;
	transition: top 0.5s;
    font-size: 14px;
    background-color: rgba(224, 255, 245, 0.7);
    height: 100%;
  }
  &:hover {
    .text {
      top: 0;

    }
  }
}
</style>
