<template>
  <div class="notice">
    <el-timeline>
      <!-- icon color stamp title order -->
      <el-timeline-item
        v-for="(item, i) in noticeList"
        :key="i"
        :icon="item.icon"
        :color="item.color"
        size="large"
        :timestamp="item.stamp"
      >
        <div>
          你的
          <el-button type="text">{{item.title}}</el-button>
          被{{item.order}}啦，快去看看吧
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [
        { order: "评论", title: "第一个说说", time: "17：18" },
        { order: "评论", title: "第一个说说", time: "17：18" }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
</style>