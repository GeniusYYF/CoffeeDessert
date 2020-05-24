<template>
  <div class="discuss">
    <!-- :style="{height:bgHeight}" -->
    <div class="bg-img" style="background-size: 100% 100%;"></div>

    <div>
      <div class="personal-wrapper">
        <div class="personal-msg">
          <el-avatar
            class="header-img"
            v-show="msg.headImg=='man'"
            :size="100"
            :src="require(headImg.man+'')"
          >
            <el-avatar :size="100" :src="require('./img/header-error.jpg')"></el-avatar>
          </el-avatar>
          <el-avatar
            class="header-img"
            v-show="msg.headImg=='woman'"
            :size="100"
            :src="require(headImg.woman+'')"
          >
            <el-avatar :size="100" :src="require('./img/header-error.jpg')"></el-avatar>
          </el-avatar>

          <div class="content">
            <!-- el-icon-female -->
            <h2>
              Genius淼 &nbsp;
              <i
                v-show="msg.sex=='男'"
                class="el-icon-male"
                style="color:rgb(0, 120, 250)"
              ></i>
              <i v-show="msg.sex=='女'" class="el-icon-female" style="color:rgb(250, 100, 0)"></i>
              <i v-show="msg.sex=='保密'" class="el-icon-lock" style="color:rgb(200, 100, 100)"></i>
              <i v-show="msg.sex=='未知'" class="el-icon-question" style="color:rgb(100, 100, 50)"></i>
            </h2>
            <div>{{msg.sign}}</div>
          </div>
        </div>
      </div>

      <el-tabs v-model="activeName" @tab-click="tabClick" class="tabs">
        <el-tab-pane label="说说" name="first">
          <span slot="label">
            <i class="el-icon-eleme"></i> 说说
          </span>

          <div class="speak">
            <el-card>
              <el-input class="title" placeholder="标题" v-model="speak.title"></el-input>

              <el-input
                class="text"
                type="textarea"
                :rows="4"
                placeholder="记录精彩生活"
                v-model="speak.text"
              ></el-input>

              <el-upload
                class="upload"
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :file-list="speak.fileList"
                :on-remove="handleRemove"
                :on-preview="handlePictureCardPreview"
              >
                <i slot="default" class="el-icon-plus"></i>
              </el-upload>
            </el-card>

            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </el-tab-pane>

        <el-tab-pane label="动态" name="second">
          <span slot="label">
            <i class="el-icon-coffee"></i> 动态
          </span>
        </el-tab-pane>

        <el-tab-pane label="通知" name="third">
          <span slot="label">
            <i class="el-icon-warning-outline"></i> 通知
          </span>
          <div class="notice">
            <div v-for="(item,i) in noticeList" :key="i" :label="item.order">
              <div>{{item.order}}</div>
              <div>
                你的
                <el-button type="text">{{item.title}}</el-button>
                被{{item.order}}啦，快去看看吧
                <span style="float:right">{{item.time}}</span>
              </div>
              <el-divider />
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="信息" name="fourth">
          <span slot="label">
            <i class="el-icon-user"></i> 信息
          </span>
          <div class="msg">
            <el-divider content-position="right" v-if="edit">
              <el-button type="success" class="save-btn" size="mini" @click="saveMsg">保 存</el-button>
              <el-button type="warning" class="cancel-btn" size="mini" @click="cancelMsg">取消编辑</el-button>
            </el-divider>
            <el-divider content-position="right" v-else>
              <el-button type="primary" class="edit-btn" size="mini" @click="edit=true">编 辑</el-button>
            </el-divider>

            <el-form v-model="msg" label-width="100px" size="small" label-suffix="：">
              <el-form-item label="名称" prop="name">
                <span>{{msg.name}}</span>
              </el-form-item>

              <el-form-item label="年龄" prop="age">
                <el-input v-if="edit" v-model="msg.age"></el-input>
                <span v-else>{{msg.age}}</span>
              </el-form-item>

              <el-form-item label="性别" prop="sex">
                <span v-if="edit">
                  <el-radio v-model="msg.sex" label="男">男</el-radio>
                  <el-radio v-model="msg.sex" label="女">女</el-radio>
                  <el-radio v-model="msg.sex" label="保密">保密</el-radio>
                  <el-radio v-model="msg.sex" label="未知">未知</el-radio>
                </span>
                <span v-else>{{msg.sex}}</span>
              </el-form-item>

              <el-form-item label="个性签名" prop="sign">
                <el-input v-if="edit" v-model="msg.sign"></el-input>
                <span v-else>{{msg.sign}}</span>
              </el-form-item>

              <el-form-item label="标签" prop="tags">
                <span v-if="edit" class="tags">
                  <el-tag
                    :key="tag"
                    v-for="tag in msg.tags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >{{tag}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </span>
                <span v-else>
                  <span v-for="(tag,i) in msg.tags" :key="i">{{tag}} &nbsp;</span>
                </span>
              </el-form-item>

              <el-form-item label="头像" prop="img">
                <div class="head-img">
                  <span v-show="!edit">
                    <el-avatar
                      v-show="msg.headImg=='man'"
                      :size="50"
                      :src="require(headImg.man+'')"
                    ></el-avatar>
                    <el-avatar
                      v-show="msg.headImg=='woman'"
                      :size="50"
                      :src="require(headImg.woman+'')"
                    ></el-avatar>
                  </span>

                  <div v-show="edit">
                    <a @click="msg.headImg='man'">
                      <el-avatar
                        :class="{highLight:msg.headImg=='man'}"
                        :size="50"
                        :src="require(headImg.man+'')"
                        @onclick="tabClick"
                      ></el-avatar>
                    </a>
                    <a @click="msg.headImg='woman'">
                      <el-avatar
                        :class="{highLight:msg.headImg=='woman'}"
                        :size="50"
                        :src="require(headImg.woman+'')"
                      ></el-avatar>
                    </a>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      bgHeight: "",
      activeName: "first",
      edit: false,
      headImg: { man: "./img/man.jpg", woman: "./img/woman.jpg" },
      msg: {
        name: "Genius淼",
        img: "",
        age: "23",
        sex: "未知",
        sign: "我是个性签名...",
        tags: ["tag1"],
        headImg: "man"
      },
      msgCache: {
        name: "Genius淼",
        img: "",
        age: "23",
        sex: "未知",
        sign: "我是个性签名...",
        tags: ["tag1"],
        headImg: "man"
      },
      inputVisible: false,
      inputValue: "",
      noticeList: [
        { order: "评论", title: "第一个说说", time: "17：18" },
        { order: "评论", title: "第一个说说", time: "17：18" }
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      speak: {
        title: "",
        text: "",
        imgList: [],
        fileList: [
          {
            name: "food.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          },
          {
            name: "food2.jpeg",
            url:
              "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
          }
        ]
      }
    };
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event);
    },
    handleClose(tag) {
      this.msg.tags.splice(this.msg.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.msg.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },

    saveMsg() {
      this.edit = false;
      this.msgCache = JSON.parse(JSON.stringify(this.msg));
    },
    cancelMsg() {
      this.edit = false;
      this.msg = JSON.parse(JSON.stringify(this.msgCache));
    }
  },
  mounted() {
    console.log(this.$route.meta.activeName);
    this.activeName = this.$route.meta.activeName || "first";
    // this.bgHeight = document.body.offsetHeight + "px";
  }
};
</script>

<style lang="scss" scoped>
$bgColor: rgba(252, 252, 252, 0.8);
$contentWidth: 60%;
.discuss {
  text-align: center;
  .bg-img {
    background-image: url("./img/bg.jpg");
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -2;
  }
  .personal-wrapper {
    background-color: rgba($color: $bgColor, $alpha: 0.8);
    .personal-msg {
      height: 150px;
      width: 60%;
      margin: 0 auto;
      text-align: left;
      padding-top: 40px;

      .header-img {
        float: left;
        margin: 10px 20px;
      }
      .content {
        //  display: inline-block;
        div {
          color: rgba($color: rgb(2, 21, 48), $alpha: 1);
        }
        i {
          font-weight: 800;
        }
      }
    }
  }

  .tabs /deep/ {
    .el-tabs__header {
      // margin: 0;
      .el-tabs__nav-scroll {
        background-color: rgba($color: $bgColor, $alpha: 0.95);
        .el-tabs__nav {
          display: inline-block;
          float: unset;

          .el-tabs__item {
          }
        }
      }
    }

    .el-tabs__content {
      .speak {
        margin: 0 auto 20px;
        width: $contentWidth;
        padding: 20px;
        background-color: rgba($color: $bgColor, $alpha: 0.9);
        text-align: left;
        min-height: 200px;
      }

      .notice {
        margin: 0 auto 20px;
        width: $contentWidth;
        padding: 20px;
        background-color: rgba($color: $bgColor, $alpha: 0.9);
        text-align: left;
        min-height: 300px;
      }

      .msg {
        margin: 0 auto 20px;
        padding: 20px;
        width: $contentWidth;
        background-color: rgba($color: $bgColor, $alpha: 0.9);
        text-align: left;

        /deep/ .el-divider__text {
          padding: 0;
          background-color: transparent;
        }

        .tags {
          .el-tag + .el-tag {
            margin-left: 10px;
          }
          .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
          }
          .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
          }
        }

        .head-img {
          .el-avatar {
            margin-left: 20px;
            &:hover {
              cursor: pointer;
            }
          }
          .highLight {
            box-shadow: 0 0 10px rgb(250, 162, 0);
          }
        }
      }
    }
  }
}
</style>
