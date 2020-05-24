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
        <el-button type="primary" @click="status=2">提 交</el-button>
      </el-form-item>
    </el-form>

    <div class="model2" v-else-if="status==2">
      <i class="el-icon-circle-check"></i>
      <span>提交成功！请耐心等待...</span>
      <div><el-button  @click="status=3">刷新进度</el-button></div>
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
        <span>{{res.idea}}</span>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="status=1;">再来提一下</el-button>
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
        rate: null,
        idea: "",
        tel: ""
      },
      res: {
        rate: "4.5",
        idea: "感谢反馈！"
      },
      status: 1
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
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
    div{
      margin-top: 20px;
    }
  }
  .model3{
padding: 20px 0;
  }
}
</style>
