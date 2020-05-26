<template>
  <div class="admin">
    <div class="radio">
      排序：
      <el-radio-group v-model="reverse">
        <el-radio :label="true">倒序</el-radio>
        <el-radio :label="false">正序</el-radio>
      </el-radio-group>
    </div>
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(item,i) in ideas"
        :key="i"
        :timestamp="$date.format(item.stamp)"
        placement="top"
      >
        <el-card shadow="hover">
          <span class="name">{{item.userName}}</span>
          <el-rate
            v-model="item.rate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
          <div class="idea">{{item.idea}}</div>
          <div class="tel">tel：{{item.tel}}</div>

          <el-popover
            placement="bottom"
            :title="'回复 '+item.userName"
            width="200"
            trigger="manual"
            v-model="item.visible"
          >
            <el-button
              slot="reference"
              class="reply"
              size="mini"
              type="primary"
              @click="item.visible = true"
            >回 复</el-button>

            <span slot>
              <el-input
                v-model="item.replyText"
                type="textarea"
                :rows="2"
                maxlength="50"
                show-word-limit
                :autosize="{ minRows: 2, maxRows: 3}"
              ></el-input>
              <div style="padding-top:10px">
                <el-button size="mini" type="warning" plain @click="reply();item.visible=false">确 认</el-button>
                <el-button size="mini" @click="item.visible=false">取 消</el-button>
              </div>
            </span>
          </el-popover>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reverse: false,
      ideas: []
    };
  },
  methods: {
    reply() {
      let adminList = this.$storage.get("adminList");
      adminList[0].ideas = this.ideas;
      this.$storage.set("adminList", adminList);
      console.log(this.ideas, adminList);
      this.popVisible = false;
    }
  },
  mounted() {
    this.ideas = this.$storage.get("adminList")[0].ideas;
    console.log(this.$storage.get("adminList")[0], this.ideas);
    console.log(
      this.$date.format(Date.now(), ["年", "月", "日"], ["分", "时", "秒"])
    );
    console.log(this.$date.dateDiff(Date.now()));
    // new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
  }
};
</script>

<style scoped lang="scss">
.admin {
  width: 60%;
  margin: 0 auto;
  text-align: left;
  .el-timeline {
    padding-top: 30px;

    .el-card {
      .el-rate {
        display: inline;
        line-height: 20px;
      }
      .name {
        font-size: 20px;
        margin-right: 10px;
      }
      .idea {
      }
      .tel {
        font-size: 16px;
        color: rgb(172, 172, 172);
        line-height: 2;
      }
      .reply {
        float: right;
        margin-bottom: 10px;
      }
    }
  }
}
</style>