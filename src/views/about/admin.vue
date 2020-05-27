<template>
  <div class="admin">
    <div v-if="noIdeas" class="noIdeas">
      <img src="./img/drink.gif" />
      <div class="text">暂时还没有反馈呢<br/>喝杯Coffee压压惊</div>
    </div>
    <div v-else>
      <div class="radio">
        时间顺序：
        <el-radio-group v-model="reverse">
          <el-radio :label="true">从早到晚</el-radio>
          <el-radio :label="false">从晚到早</el-radio>
        </el-radio-group>
      </div>

      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(item,i) in ideas"
          :key="i"
          :timestamp="$date.format(item.stamp)+' '+$date.dateDiff(item.stamp)"
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

            <div class="foot">
              <div class="tel">tel：{{item.tel}}</div>

              <el-tooltip placement="bottom" effect="light" :content="item.replyText">
                <span class="reply" v-show="item.reply">
                  <i class="el-icon-circle-check"></i>
                  已回复
                </span>
              </el-tooltip>

              <el-popover
                placement="bottom"
                :title="'回复 '+item.userName"
                width="200"
                trigger="manual"
                v-model="item.visible"
                v-if="!item.reply"
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
                    <el-button
                      size="mini"
                      type="warning"
                      plain
                      @click="item.reply=true;item.visible=false;reply();"
                    >确 认</el-button>
                    <el-button size="mini" @click="item.visible=false">取 消</el-button>
                  </div>
                </span>
              </el-popover>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reverse: true,
      ideas: [],
      noIdeas: false,
      replyText: ""
    };
  },
  methods: {
    reply() {
      let adminList = this.$storage.get("adminList");
      adminList[0].ideas = this.ideas;
      this.$storage.set("adminList", adminList);
      console.log(this.ideas, adminList);
      this.popVisible = false;
      this.$message({
        message: "回复成功",
        type: "success"
      });
    }
  },
  mounted() {
    this.ideas = this.$storage.get("adminList")[0].ideas;
    if (this.ideas == undefined || this.ideas.length == 0) this.noIdeas = true;
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
.idea {
}
.admin {
  width: 60%;
  margin: 0 auto;
  text-align: left;

  .radio {
    padding: 30px 40px;
  }

  .el-timeline {
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
        margin: 10px 0;
      }
      .foot {
        .tel {
          color: rgb(172, 172, 172);

          display: inline;
        }
        .reply {
          float: right;
          i {
            color: rgb(0, 255, 0);
            margin-right: 5px;
            font-weight: 600;
          }
        }
      }
    }
  }

  .noIdeas {
    align-items: center;
    justify-content: center;
    display: flex;
    height: 600px;
    img {
      height: 300px;
    }
    .text {
      margin-left: 50px;
      font-size: 40px;
      color: rgb(100, 100, 100);
      border: 1px solid rgb(100, 100, 100);
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
        border: 52px solid #ffffff;
        position: absolute;
        border-color: transparent #ffffff transparent transparent;
        left: -103px;
         top: 15px;
      }
    }
  }
}
</style>