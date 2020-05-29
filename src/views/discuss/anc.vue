<template>
  <div class="anc">
    <el-card class="card" v-for="(item,i) in speaks" :key="i">
      <div class="head">
        <div class="left">
          <el-avatar v-show="item.headImg=='man'" :size="40" :src="require(headImg.man+'')"></el-avatar>
          <el-avatar v-show="item.headImg=='woman'" :size="40" :src="require(headImg.woman+'')"></el-avatar>
        </div>
        <div class="right">
          <span class="name">{{item.name}}</span>
          <span class="diff">&nbsp;&nbsp;&nbsp;{{$date.dateDiff(item.stamp)}}</span>
          <br />
          <span class="stamp">{{$date.format(item.stamp)}}</span>
        </div>
      </div>
      <div class="content">
        <div class="text">{{item.text}}</div>
        <div class="imgs">
          <img
            v-for="(src,i) in item.imgList"
            :key="i"
            :src="src.url?require(src.url+''):src.data"
            @click="showBigImg(src)"
            :class="{count1:item.imgList.length==1,count2:item.imgList.length==2,count3:item.imgList.length>=3}"
            alt
          />
          <el-dialog
            :visible.sync="bigImg.visible"
            :show-close="false"
            :title="bigImg.name"
            class="big-img"
          >
            <div class="img-msg">
              <span class="type">
                类型：
                <span>{{bigImg.type}}</span>
              </span>
              <span class="size">
                大小：
                <span>{{bigImg.size}}</span>
              </span>
            </div>
            <img width="100%" :src="bigImg.url" alt />
          </el-dialog>
        </div>
      </div>
      <div class="foot">
        <div class="left">
          <span class="tag" v-for="(tag,i) in item.tags" :key="i">
            <el-tag v-if="i<=3 && tag.length<=3" size="small" :type="randomType()">{{tag}}</el-tag>
          </span>
        </div>
        <div class="right">
          <el-button-group>
            <el-button
              v-show="!item.clickLike"
              type
              size="mini"
              icon="el-icon-star-off"
              @click="item.clickLike=true;"
            >喜欢 {{item.like}}</el-button>
            <el-button
              v-show="item.clickLike"
              type
              size="mini"
              icon="el-icon-star-on"
              @click="item.clickLike=false;"
            >喜欢 {{item.like}}</el-button>
            <el-button type size="mini" icon="el-icon-chat-line-round">评论 {{item.speak}}</el-button>
            <el-button type size="mini" icon="el-icon-share">转发 {{item.transmit}}</el-button>
          </el-button-group>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="reply" v-if="item.reply.length>0">
        <div v-for="(re,i) in item.reply" :key="i">
          <div class="line">
            <span class="re-name">{{re.name}}</span>&nbsp;
            <span class="diff">{{$date.dateDiff(re.stamp)}}</span>&nbsp;回复&nbsp;
            <span class="name">{{item.name}}</span>：
            <span class="text">{{re.text}}</span>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bigImg: {
        name: "",
        type: "",
        size: "",
        visible: false,
        url: ""
      },
      headImg: { man: "./img/man.jpg", woman: "./img/woman.jpg" },
      speaks: []
    };
  },
  methods: {
    randomType() {
      return ["", "success", "info", "warning", "danger"][
        Math.floor(Math.random() * (5 - 0)) + 0
      ];
    },
    showBigImg(item) {
      let bigImg = this.bigImg;
      bigImg.name = item.name;
      bigImg.type = item.type;
      bigImg.size = item.size;
      bigImg.url = item.url ? require(item.url + "") : item.data;
      bigImg.visible = true;
    },
    getSpeaks() {
      this.speaks = this.$store.getters.getSpeaks;
    }
  },
  mounted() {
    this.getSpeaks();
  }
};
</script>

<style scoped lang="scss">
.anc {
  text-align: center;

  .card {
    text-align: left;
    margin: 0 auto 20px;
    width: 40%;

    .head {
      .left {
        // display: inline-block;
        float: left;
      }
      .right {
        // display: inline-block;
        float: left;
        margin-left: 10px;
        .diff,
        .stamp {
          font-size: 14px;
          color: rgb(110, 110, 110);
        }
      }
    }
    .content {
      clear: both;
      padding: 15px 0;
      .text {
        margin-bottom: 10px;
      }
      .imgs {
        .count1,
        .count2,
        .count3 {
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 5px rgb(255, 123, 0);
          }
        }
        .count1 {
          width: 100%;
        }
        .count2 {
          width: 49%;
          margin-right: 1%;
        }
        .count3 {
          width: 32.3%;
          margin: 0 1% 1% 0;
        }
        .big-img /deep/ {
          .el-dialog {
            margin: 1vh auto !important;
          }
          .el-dialog__header {
            padding-bottom: 0;
          }
          .el-dialog__body {
            padding: 0 20px 20px;
            .img-msg {
              text-align: right;
              .type {
                margin-right: 15px;
                span {
                  color: rgb(148, 148, 148);
                  font-size: 14px;
                }
              }
              .size {
                span {
                  color: rgb(148, 148, 148);
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
    .foot {
      .left {
        display: inline-block;
        .tag {
          margin-right: 5px;
        }
      }
      .right {
        // display: inline-block;
        float: right;
        margin-right: 1%;
      }
    }
    .reply {
      .line {
        font-size: 14px;
        margin-bottom: 5px;
        .re-name {
          color: rgb(255, 136, 0);
        }
        .name {
          color: rgb(110, 110, 110);
        }
        .text {
        }
        .diff {
          color: rgb(151, 151, 151);
        }
      }
    }
  }
}
</style>