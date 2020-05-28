<template>
  <div class="discuss">
    <!-- :style="{height:bgHeight}" -->
    <div class="bg-img" style="background-size: 100% 100%;"></div>

    <div>
      <div class="personal-wrapper">
        <div class="personal-msg">
          <el-avatar
            class="header-img"
            v-show="user.msg.headImg!='woman'"
            :size="100"
            :src="require(headImg.man+'')"
          >
            <el-avatar :size="100" :src="require('./img/header-error.jpg')"></el-avatar>
          </el-avatar>
          <el-avatar
            class="header-img"
            v-show="user.msg.headImg=='woman'"
            :size="100"
            :src="require(headImg.woman+'')"
          >
            <el-avatar :size="100" :src="require('./img/header-error.jpg')"></el-avatar>
          </el-avatar>

          <div class="content">
            <!-- el-icon-female -->
            <h2>
              {{user.msg.name}} &nbsp;
              <i
                v-show="user.msg.sex=='男'"
                class="el-icon-male"
                style="color:rgb(0, 120, 250)"
              ></i>
              <i v-show="user.msg.sex=='女'" class="el-icon-female" style="color:rgb(250, 100, 0)"></i>
              <i v-show="user.msg.sex=='保密'" class="el-icon-lock" style="color:rgb(200, 100, 100)"></i>
              <i v-show="user.msg.sex=='未知'" class="el-icon-question" style="color:rgb(100, 100, 50)"></i>
            </h2>
            <div>{{user.msg.sign}}</div>
          </div>
        </div>
      </div>

      <el-tabs v-model="activeName" @tab-click="tabClick" class="tabs">
        <el-tab-pane label="说说" name="first">
          <span slot="label">
            <i class="el-icon-eleme"></i> 说说
          </span>

          <tab-speak></tab-speak>
        </el-tab-pane>

        <el-tab-pane label="动态" name="second">
          <span slot="label">
            <i class="el-icon-coffee"></i> 动态
          </span>
          <tab-anc></tab-anc>
        </el-tab-pane>

        <el-tab-pane label="通知" name="third">
          <span slot="label">
            <i class="el-icon-warning-outline"></i> 通知
          </span>
          <tab-notice></tab-notice>
        </el-tab-pane>

        <el-tab-pane label="信息" name="fourth">
          <span slot="label">
            <i class="el-icon-user"></i> 信息
          </span>
          <tab-msg></tab-msg>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import tabSpeak from "./speak";
import tabAnc from "./anc";
import tabNotice from "./notice";
import tabMsg from "./msg";

export default {
  name: "",
  components: { tabSpeak, tabAnc, tabNotice, tabMsg },
  data() {
    return {
      bgHeight: "",
      activeName: "first",
      user: {},
      headImg: { man: "./img/man.jpg", woman: "./img/woman.jpg" }
    };
  },
  methods: {
    tabClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted() {
    // this.bgHeight = document.body.offsetHeight + "px";
  },
  beforeMount() {
    console.log(this.$router.currentRoute.query.activeName, this.$route);
    this.activeName = this.$router.currentRoute.query.activeName || "first";
    this.user = this.$store.getters.getUser;
    console.log(this.user);
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
  /deep/ .el-tabs__header{
    margin: 0;
    padding-bottom: 15px;
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
        $focusColor: rgb(255, 207, 118);

        margin: 0 auto 20px;
        width: $contentWidth;
        // padding: 20px;

        text-align: left;
        min-height: 200px;

        .el-card {
          background-color: rgba($color: $bgColor, $alpha: 0.9);
          .title {
            margin-bottom: 10px;
            .el-input__inner {
              &:hover,
              &:focus {
                border: 1px solid rgba($color: $focusColor, $alpha: 0.5);
                box-shadow: 0 0 1.5px $focusColor;
              }
            }
          }
          .content {
            position: relative;
            padding-left: 0;
            border: 1px solid #ebeef5;
            border-radius: 5px;
            background-color: #fff;

            &:hover {
              border: 1px solid rgba($color: $focusColor, $alpha: 0.5);
              box-shadow: 0 0 1.5px $focusColor;
            }

            .text {
              position: unset; // 让字数限制显示在下面
              margin-bottom: 10px;
              /deep/ .el-textarea__inner {
                border: none;
              }
            }
            .upload {
              padding: 10px;
              .el-upload.el-upload--picture-card,
              /deep/ .el-upload-list__item {
                height: 100px;
                width: 100px;
              }

              .el-upload.el-upload--picture-card {
                line-height: 100px;
              }
            }
          }
          .push-speak {
            display: inline-block;
            width: 100%;
            .el-button {
              float: right;
            }
          }
        }
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
