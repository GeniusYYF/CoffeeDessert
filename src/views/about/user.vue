<template>
  <div class="about">
    <el-steps :active="status" finish-status="success" simple style="margin-top: 20px">
      <el-step title="填写 1"></el-step>
      <el-step title="等待 2"></el-step>
      <el-step title="已回 3"></el-step>
    </el-steps>

    <el-form
      class="model1"
      v-if="status==1"
      :label-position="labelPosition"
      label-width="100px"
      :model="feedback"
      size="mini"
    >
      <el-form-item label="作者：">
        <span>{{author.name}}</span>
      </el-form-item>
      <el-form-item label="qq：">
        <span>{{author.qq}}</span>
      </el-form-item>
      <el-form-item label="tips：">
        <span>{{author.tips}}</span>
      </el-form-item>
      <el-form-item label="评分：">
        <el-rate v-model="feedback.rate" :colors="colors"></el-rate>
      </el-form-item>
      <el-form-item label="意见：">
        <el-input v-model="feedback.idea" type="textarea" :rows="2" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="联系方式：">
        <el-input v-model="feedback.tel" size="small" placeholder="请输入电话或者qq"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提 交</el-button>
      </el-form-item>
    </el-form>

    <div class="model2" v-else-if="status==2">
      <i class="el-icon-circle-check"></i>
      <span>提交成功！请耐心等待...</span>
      <div>
        <el-button @click="refresh">刷新进度</el-button>
      </div>
    </div>

    <el-form
      class="model3"
      v-if="status==3"
      :label-position="labelPosition"
      label-width="100px"
      :model="res"
      size="mini"
    >
      <el-form-item label="作者：">
        <span>{{author.name}}</span>
      </el-form-item>
      <el-form-item label="qq：">
        <span>{{author.qq}}</span>
      </el-form-item>

      <el-form-item label="评分：">
        <el-rate
          v-model="res.rate"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>
      </el-form-item>
      <el-form-item label="回馈：">
        <span>{{res.replyText}}</span>
      </el-form-item>

      <el-form-item>
        <el-popconfirm
          title="这将删除之前的反馈，继续吗？"
          @onCancel="reset"
          cancelButtonText="继续"
          cancelButtonType="warning"
          confirmButtonText="取消"
          confirmButtonType
        >
          <el-button slot="reference" type="success">再来提一下</el-button>
        </el-popconfirm>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      labelPosition: "left",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      author: {
        name: "Genius淼",
        qq: "739416541",
        tips: "有（好的）想法就说出来嘛"
      },
      feedback: {
        rate: 0,
        idea: "",
        tel: ""
      },
      feedbackCache: {
        rate: 0,
        idea: "",
        tel: ""
      },
      res: {
        rate: "",
        replyText: ""
      },
      status: 1,
      user: {},
      adminList: []
    };
  },
  methods: {
    same(a, b) {
      return JSON.stringify(a) == JSON.stringify(b);
    },
    submit() {
      let error = "";
      if (this.feedback.rate == 0) error = "星星还没点呢";
      else if (this.feedback.idea == "") error = "请留下你的idea";
      else if (this.feedback.tel == "") error = "你还没告诉我怎么联系你呢";

      if (error) {
        this.$notify({
          title: "警告",
          message: error,
          type: "warning"
        });
      } else {
        this.$eventHub.$emit("loading", true);
        setTimeout(() => {
          let adminList = this.adminList,
            user = this.user,
            feedback = this.feedback,
            item = {
              userId: user.id,
              userName: user.name,
              rate: feedback.rate,
              idea: feedback.idea,
              tel: feedback.tel,
              replyText: "",
              stamp: Date.now()
            }; // 填写内容

          adminList[0].ideas = adminList[0].ideas || [];
          let res = this.getListIndex(
            adminList[0].ideas,
            "userId",
            this.user.id
          );

          if (res.item) {
            adminList[0].ideas[res.index] = item;
          } else {
            adminList[0].ideas.push(item);
          }

          this.$storage.set("adminList", adminList);
          console.log(adminList);

          this.$eventHub.$emit("loading", false);
          this.status = 2;
        }, 500);
      }
    },
    refresh() {
      let ideas = this.$storage.get("adminList")[0].ideas;
      let idea = this.getListIndex(ideas, "userId", this.user.id).item;
      console.log("刷新结果：", idea);
      if (idea.replyText) {
        this.res.rate = idea.rate;
        this.res.replyText = idea.replyText;
        this.status = 3;
      } else {
        this.$notify({
          title: "通知",
          message: "稍安勿躁，作者还在回复的路上...",
          type: "info"
        });
      }
    },
    initStatus() {
      let ideas = this.adminList[0].ideas || [];
      let idea = this.getListIndex(ideas, "userId", this.user.id).item;
      console.log(idea);
      if (idea) {
        if (idea.replyText) {
          this.res.rate = idea.rate;
          this.res.replyText = idea.replyText;
          this.status = 3;
        } else this.status = 2;
      } else this.status = 1;
    },
    // [{k:v},]
    getListIndex(list, k, v) {
      for (let i = 0; i < list.length; i++) {
        if (list[i][k] == v + "") {
          return { index: i, val: v, item: list[i] };
        }
      }
      return { index: "", val: "", item: "" };
    },
    reset() {
      let index = this.getListIndex(
        this.adminList[0].ideas,
        "userId",
        this.user.id
      ).index;
      // 避免 0 触发成false
      if (index + "") {
        this.adminList[0].ideas.splice(index, 1);
        this.$storage.set("adminList", this.adminList);
        console.log(this.adminList[0].ideas);
      }
      this.status = 1;
    }
  },
  mounted() {
    this.adminList = this.$storage.get("adminList");
    this.user = this.$session.get("user");
    this.initStatus();
    console.log(this.adminList);
  }
};
</script>

<style scoped lang="scss">
.about {
  height: 100%;
  width: 60%;
  margin: 0 auto;
  text-align: left;
  padding-top: 20px;

  .model1 {
    padding: 20px 0;
  }
  .model2 {
    padding: 50px 0;
    font-size: 30px;
    color: springgreen;
    text-align: center;
    div {
      margin-top: 20px;
    }
  }
  .model3 {
    padding: 20px 0;
  }
}
</style>