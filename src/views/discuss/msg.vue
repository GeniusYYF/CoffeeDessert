<template>
  <div class="msg">
    <el-divider content-position="right" v-if="edit">
      <el-button type="success" class="save-btn" size="mini" @click="saveMsg">保 存</el-button>
      <el-button type="warning" class="cancel-btn" size="mini" @click="cancelMsg">取消编辑</el-button>
    </el-divider>
    <el-divider content-position="right" v-else>
      <el-button type="primary" class="edit-btn" size="mini" @click="edit=true">编 辑</el-button>
    </el-divider>

    <el-form label-width="100px" size="small" label-suffix="：">
      <el-form-item label="名称">
        <span>{{user.msg.name}}</span>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input v-if="edit" v-model="user.msg.age"></el-input>
        <span v-else>{{user.msg.age}}</span>
      </el-form-item>

      <el-form-item label="性别">
        <span v-if="edit">
          <el-radio v-model="user.msg.sex" label="男">男</el-radio>
          <el-radio v-model="user.msg.sex" label="女">女</el-radio>
          <el-radio v-model="user.msg.sex" label="保密">保密</el-radio>
          <el-radio v-model="user.msg.sex" label="未知">未知</el-radio>
        </span>
        <span v-else>{{user.msg.sex}}</span>
      </el-form-item>

      <el-form-item label="个性签名">
        <el-input v-if="edit" v-model="user.msg.sign"></el-input>
        <span v-else>{{user.msg.sign}}</span>
      </el-form-item>

      <el-form-item label="标签">
        <span v-if="edit" class="tags">
          <el-tag
            :key="tag"
            v-for="tag in user.msg.tags"
            closable
            :disable-transitions="false"
            :type="randomType()"
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
          <span v-for="(tag,i) in user.msg.tags" :key="i">{{tag}} &nbsp;</span>
        </span>
      </el-form-item>

      <el-form-item label="头像">
        <div class="head-img">
          <span v-show="!edit">
            <el-avatar v-show="user.msg.headImg=='man'" :size="50" :src="require(headImg.man+'')"></el-avatar>
            <el-avatar
              v-show="user.msg.headImg=='woman'"
              :size="50"
              :src="require(headImg.woman+'')"
            ></el-avatar>
          </span>

          <div v-show="edit">
            <a @click="user.msg.headImg = 'man'">
              <el-avatar
                :class="{highLight:user.msg.headImg=='man'}"
                :size="50"
                :src="require(headImg.man+'')"
              ></el-avatar>
            </a>
            <a @click="  user.msg.headImg = 'woman'">
              <el-avatar
                :class="{highLight:user.msg.headImg=='woman'}"
                :size="50"
                :src="require(headImg.woman+'')"
              ></el-avatar>
            </a>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="坠落">
        <span v-show="!edit">{{user.msg.dropList}}</span>

        <span v-show="edit">
          <el-radio-group v-model="user.msg.dropList" @change="updateDrop">
            <el-radio label="表情">表情</el-radio>
            <el-radio label="五角星">五角星</el-radio>
            <el-radio label="爱心">爱心</el-radio>
          </el-radio-group>
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      user: {},
      userCache: {},
      headImg: { man: "./img/man.jpg", woman: "./img/woman.jpg" },

      inputVisible: false,
      inputValue: "",
      userList: [],
      userNames: {},
      adminList: []
    };
  },
  methods: {
    // 更新对应的speaks和reply信息
    updateSR() {
      let user = this.user;
      if (user.speaks.length != 0) {
        user.speaks.forEach(item => {
          // item.name = user.msg.name;
          item.headImg = user.msg.headImg;
          item.tags = user.msg.tags || [];
        });
      }
      return user;
    },
    saveMsg() {
      this.$eventHub.$emit("headImg", this.user.msg.headImg);
      this.$store.state.user = this.updateSR();
      this.$store.commit("setUser");
      console.log(this.$store.state.user, this.user);

      this.$store.commit("setUserList");
      this.edit = false;
      this.userCache = JSON.parse(JSON.stringify(this.user));

      this.$message.success("保存成功！");
    },
    cancelMsg() {
      this.edit = false;
      let msg1 = this.user.msg,
        msg2 = this.userCache.msg;
      // this.user = JSON.parse(JSON.stringify(this.userCache));

      // msg1.name = msg2.name;
      msg1.sex = msg2.sex;
      msg1.age = msg2.age;
      msg1.sign = msg2.sign;
      msg1.headImg = msg2.headImg;
      msg1.tags = msg2.tags;
      msg1.dropList = msg2.dropList;
      this.$eventHub.$emit('dropList',msg2.dropList)
    },
    handleClose(tag) {
      this.user.msg.tags.splice(this.user.msg.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue,
        tags = this.user.msg.tags;
      if (tags.length > 10) {
        this.$notify({
          title: "通知",
          message: "最多贴10个标签，不要贪得无厌哦",
          type: "warning"
        });
      } else if (inputValue && !tags.includes(inputValue)) {
        tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    randomType() {
      return ["", "success", "info", "warning", "danger"][
        Math.floor(Math.random() * (5 - 0)) + 0
      ];
    },
    updateDrop(radio) {
      console.log(radio);
      this.$eventHub.$emit("dropList", radio);
    }
  },
  beforeMount() {
    this.user = this.$store.getters.getUser;
    this.userCache = JSON.parse(JSON.stringify(this.user));
  },
  mounted() {
    console.log(this.$date.format(1590685028328));
  }
};
</script>

<style scoped lang="scss">
</style>