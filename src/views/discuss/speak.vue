<template>
  <div class="speak">
    <el-card>
      <!-- <el-input class="title" placeholder="标题" v-model="speak.title"></el-input> -->

      <dir class="content">
        <el-input
          class="text"
          type="textarea"
          placeholder="记录精彩生活"
          resize="none"
          :rows="3"
          :maxlength="50"
          :show-word-limit="true"
          v-model="speak.text"
        ></el-input>

        <el-upload
          class="upload"
          ref="upload"
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="9"
          :on-remove="handleRemove"
          :on-preview="handlePictureCardPreview"
          :on-exceed="onExceed"
          :on-change="onChange"
        >
          <!--   :before-upload="beforeAvatarUpload"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarSuccess"
          :on-progress="onProgress"-->
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :show-close="false" class="big-img">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </dir>

      <div class="push-speak">
        <el-popover
          placement="bottom"
          title="❕ 提示"
          width="200"
          trigger="manual"
          content="请确保输入了内容哦"
          v-model="errorPush"
          @after-enter="autoHide"
        >
          <el-button slot="reference" size="mini" type="warning" @click="pushSpeak">发 布</el-button>
        </el-popover>
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
      disabled: false,
      errorPush: false,
      imageUrl: "",
      speak: {
        speakId: "",
        // title: "",
        text: "",
        imgList: [],
        reply: [],
        like: 0,
        speak: 0,
        transmit: 0,
        clickLike: false,

        userId: "",
        name: "",
        headImg: "",
        stamp: ""
      },
      speakCache: {
        speakId: "",
        // title: "",
        text: "",
        imgList: [],
        reply: [],
        like: 0,
        speak: 0,
        transmit: 0,
        clickLike: false,

        userId: "",
        name: "",
        headImg: "",
        stamp: ""
      }
    };
  },
  methods: {
    // 删除图片
    handleRemove(file, fileList) {
      this.speak.imgList.forEach((item, i) => {
        if (item.uid == file.uid)
          console.log("删除:", this.speak.imgList.pop(i).name);
      });
      console.log("剩下的图片:", this.speak.imgList);
    },
    // 放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传文件超限
    onExceed(files, fileList) {
      this.$message.error("最多上传9张照片哦！");
    },
    //当上传图片后，调用onchange方法，获取图片本地路径
    // 添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      this.saveSpeakImg();
    },
    // 将图片存入
    saveSpeakImg() {
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();

      //转base64
      reader.onload = e => {
        // console.log(e.target.result);
        //将图片路径赋值给src
        this.speak.imgList.push({
          uid: file.uid,
          name: file.name,
          data: e.target.result,
          size:
            file.size / 1024 > 1000
              ? (file.size / 1024 / 1024).toFixed(2) + "MB"
              : (file.size / 1024).toFixed(2) + "KB",
          type: file.type,
          url: ""
        });
      };
      reader.readAsDataURL(file);

      console.log("存入:", this.speak.imgList);
    },

    // 上传之前 X
    beforeAvatarUpload(file) {
      const isJPG = file.type.split("/")[0] === "image";
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // if (isJPG && isLt2M) {
      //   this.saveSpeakImg();
      // }
      return isJPG && isLt2M;
    },
    // 上传成功 / 失败 X
    handleAvatarSuccess(res, file, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log("上传成功", this.imageUrl);
      // this.saveSpeakImg();
    },
    // 上传中  X
    onProgress(event, file, fileList) {
      // console.log("读取", event, file, fileList);
    },
    // 发布
    pushSpeak() {
      if (!this.speak.text) {
        this.errorPush = true;
        return;
      }
      this.$eventHub.$emit("loading", true);
      let user = this.$store.getters.getUser;
      user["speaks"] = user.speaks || [];
      this.speak.userId = user.id;
      this.speak.speakId = user.speaks.length;
      this.speak.name = user.msg.name;
      this.speak.headImg = user.msg.headImg || "man";
      this.speak.stamp = Date.now();
      user["speaks"].push(this.speak);
      this.$store.commit("setUser", user);
      this.$store.commit("setUserList");

      setTimeout(_ => {
        this.$refs.upload.clearFiles();
        this.speak = JSON.parse(JSON.stringify(this.speakCache));
        this.$eventHub.$emit("loading", false);
        this.$message.success("发布成功！");
      }, 1500);
    },
    autoHide() {
      if (this.errorPush)
        setTimeout(_ => {
          this.errorPush = false;
        }, 2000);
    }
  }
};
</script>

<style scoped lang="scss">
</style>