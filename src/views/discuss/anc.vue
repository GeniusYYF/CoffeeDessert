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
          <span class="diff">&nbsp;&nbsp;&nbsp;{{item.diff}}</span>
          <br />
          <span class="stamp">{{item.stamp}}</span>
        </div>
      </div>
      <div class="content">
        <div class="text">{{item.text}}</div>
        <div class="imgs">
          <el-upload
            action="#"
            :auto-upload="false"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
      <div class="foot">
        <div class="left">
          <span class="tag" v-for="(tag,i) in item.tags" :key="i">
            <el-tag v-if="i<3" size="small" :type="randomType()">{{tag}}</el-tag>
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
            <span class="diff">{{item.diff}}</span>&nbsp;回复&nbsp;
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
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [
        {
          name: "food.jpeg",
          url: "./img/man.jpg"
        },
        {
          name: "food2.jpeg",
          url: ""
        }
      ],
      headImg: { man: "./img/man.jpg", woman: "./img/woman.jpg" },
      speaks: [
        {
          speakId: "0",
          name: "Genius淼",
          headImg: "man",
          stamp: this.$date.format(Date.now()),
          diff: this.$date.dateDiff(Date.now()),
          text: "欢迎欢迎......",
          imgs: [],
          tags: ["管理员", "作者"],
          like: 0,
          speak: 0,
          transmit: 0,
          clickLike: false,
          reply: [
            {
              name: "无名氏",
              userId: "",
              text:
                "不错，字数非常的多读都顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
              stamp: "",
              diff: "刚刚"
            },
            {
              name: "无名氏",
              userId: "",
              text:
                "不错，字数非常的多读都顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
              stamp: "",
              diff: "刚刚"
            },
            {
              name: "无名氏",
              userId: "",
              text:
                "不错，字数非常的多读都顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
              stamp: "",
              diff: "刚刚"
            }
          ]
        }
      ]
    };
  },
  methods: {
    randomType() {
      // let types =
      return ["", "success", "info", "warning", "danger"][
        Math.floor(Math.random() * (5 - 0)) + 0
      ];
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {}
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
      .text{
        margin-bottom: 10px;
      }
      .imgs{

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
        .el-button {
          // margin-left: 0;
        }
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