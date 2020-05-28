<template>
  <div class="notice">
    <el-timeline v-if="this.user.noticeList.length>0">
      <!-- icon color stamp title order -->
      <el-timeline-item
        v-for="(item, i) in this.user.noticeList"
        :key="i"
        :icon="item.icon"
        :color="item.color"
        size="large"
        :timestamp="item.stamp+' '+item.diff"
      >
        <div>
          你的
          <el-button type="text">{{item.title}}</el-button>
          被{{item.order}}啦，快去看看吧
        </div>
      </el-timeline-item>
    </el-timeline>

    <div v-else class="no-speak">
      <img src="./img/drink.gif" />
      <div class="text">
        暂时还没有消息呢
        <br />喝杯Coffee压压惊
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  beforeMount() {
    this.user = this.$store.getters.getUser;
     this.user.noticeList = []
    // this.user.noticeList = [
    //   {
    //     order: "点赞",
    //     speakId: "0",
    //     title: "第一个说说",
    //     icon: "el-icon-star-on",
    //     color: "lightcoral",
    //     stamp: this.$date.format(Date.now()),
    //     diff: this.$date.dateDiff(Date.now())
    //   },
    //   {
    //     order: "评论",
    //     speakId: "0",
    //     title: "第一个说说",
    //     icon: "el-icon-chat-line-round",
    //     color: "deepskyblue",
    //     stamp: this.$date.format(Date.now()),
    //     diff: this.$date.dateDiff(Date.now())
    //   },
    //   {
    //     order: "转发",
    //     speakId: "0",
    //     title: "第一个说说",
    //     icon: "el-icon-share",
    //     color: "cornflowerblue",
    //     stamp: this.$date.format(Date.now()),
    //     diff: this.$date.dateDiff(Date.now())
    //   }
    // ];
  }
};
</script>

<style scoped lang="scss">
.notice {
  .no-speak {
    align-items: center;
    justify-content: center;
    display: flex;
    height: 350px;
    img {
      height: 300px;
    }
    .text {
      margin-left: 50px;
      font-size: 40px;
      color: rgb(100, 100, 100);
      border: 1px solid rgb(100, 100, 100);
      background-color: rgb(237,237,237);
      border-left: none;
      padding: 15px;
      border-radius: 20px;
      position: relative;
      white-space: nowrap;

      &:before {
        width: 0;
        height: 0;
        content: "";
        border: 52px solid rgb(100, 100, 100);
        position: absolute;
        border-color: transparent rgb(100, 100, 100) transparent transparent;
        left: -104px;
        top: 15px;
      }
      &:after {
        width: 0;
        height: 0;
        content: "";
        border: 51px solid rgba(252,252,252,0.9);
        position: absolute;
        border-color: transparent rgba(252,252,252,0.9) transparent transparent;
        left: -102px;
         top: 16px;
      }
    }
  }

  .el-timeline {
    margin-top: 10px;
    .el-timeline-item {
      .el-button {
        padding: 0;
      }
    }
  }
}
</style>