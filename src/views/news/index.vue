<template>
  <div class="news">
    <div class="header">
      <div class="bd">
        <el-input placeholder="百度一下" v-model="search" @keyup.enter.native="searchClick">
          <template slot="append">
            <el-button @click="searchClick">搜索</el-button>
          </template>
        </el-input>
      </div>
      <el-divider></el-divider>

      <div class="text" v-if="!showBd">
        <div v-for="(item,i) in news" :key="i">
          <a target="_blank" :href="item.url">{{item.title}}</a>
          <div>{{item.text}}</div>
          <br />
        </div>
      </div>
    </div>
    <!-- :style="{height:screenHeight-60-30-40-24*2-1+80+'px'}" -->
    <div class="bd-content" v-if="showBd" :style="{height:screenHeight-60-30-40-24*2-1+80+'px'}">
      <iframe
        id="iframe"
        :src="`https://www.baidu.com/s?&wd=${wd}&ie=utf-8`"
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>

      <!-- <div class="cover"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  watch: {
    search(v) {
      if (!v) {
        this.showBd = false;
        return v;
      }
    }
  },
  data() {
    return {
      search: "",
      wd: "",
      showBd: false,
      screenHeight: "",
      bdHeight: "",
      news: [
        {
          title: "奶茶、咖啡、甜品和它们的神仙联名，搞定你的胃还要掏空你的钱包",
          text:
            "喧嚣的雨过后，5月的武汉迎来了初夏的燥热，迎来了旅游景点的开放，堂食的有节奏放开，地铁全线路运营。戴上口罩，走出家门，江边霓虹闪烁，如果在进食的标准时段游走于街巷，你会发现，火锅、烧烤们的香味在空气中招摇，绿豆汤、西瓜、樱桃新鲜上市，用最新鲜的颜色挑逗最放松的你的味蕾。",
          url:
            "https://baijiahao.baidu.com/s?id=1667027447403938043&wfr=spider&for=pc"
        },
        {
          title: "咖啡奶茶，小食甜品，惬意的午后，生活就该如此美好！",
          text:
            "初夏时节，阳光温暖，如此惬意的午后，找个地方享用下午茶，方才不负如此好时光。",
          url:
            "https://baijiahao.baidu.com/s?id=1665551367922637835&wfr=spider&for=pc"
        },
        {
          title: "原来喝咖啡时搭配的甜品，还有这么多的讲究，你选对了吗",
          text:
            "原来喝咖啡时搭配的甜品，还有这么多的讲究，你选对了吗？咖啡已经走入了我们中国大多数人的生活当中，咖啡不仅有提神醒脑的效果，还可以让我们的精神愉悦，越来越多的人喜欢在工作的间隙和朋友一块到喜欢的咖啡店，点上一杯咖啡，听着舒缓的音乐，享受难得的清闲时光。",
          url:
            "https://baijiahao.baidu.com/s?id=1665095390448446585&wfr=spider&for=pc"
        },
        {
          title: "五一假期之CBD│这些甜品、咖啡，为你添点“多巴胺”",
          text:
            "在CBD区域，有三家甜品、咖啡品牌不容错过：国际公认的顶级巧克力Venchi、脑洞大开的NUDAKE甜品店、拥有咖啡机界劳斯莱斯美誉的精品咖啡GREYBOX，这些能带来“多巴胺”的食物，真的让人无法拒绝。",
          url:
            "https://baijiahao.baidu.com/s?id=1665462985822396043&wfr=spider&for=pc"
        },
        {
          title: "精致下午茶：自己选咖啡豆，每样甜品都有手写标注，人均才不到40",
          text:
            "充满阳光的下午，宅在家里可能会在无聊中度过，不如和三五朋友寻个咖啡厅，聊聊天。当下中国的咖啡厅，以西式和日式为主，很少有比较韩式的咖啡厅。游品探店番外篇，走出弥漫着火锅香气的山城，游品来到了辽宁沈阳，找到了一家难得一见的韩式咖啡厅。",
          url:
            "https://baijiahao.baidu.com/s?id=1665107846427982532&wfr=spider&for=pc"
        },
        {
          title: "烧烤、日料、韩料、海鲜、西餐、咖啡厅、蛋糕甜点？",
          text:
            "湖墅南路旺铺，有稳定的租金收益，周边小区、商业大厦较多人流聚集，餐饮聚集物建筑面积260.2平方米，标的物所在建筑物为钢筋混凝土结构，总层数27层（地上25层，地下2层），标的物位于2层，该建筑物建成于2006年，产权证号：浙（2019）杭州市不动产权第0297756号。",
          url:
            "https://baijiahao.baidu.com/s?id=1665360765243467662&wfr=spider&for=pc"
        },
        {
          title: "咖啡为何经常会跟甜点搭配？研究：能增强甜味",
          text:
            "据外媒报道， 事实证明，咖啡与甜点搭配是有原因的：它能增强甜味 ，这是根据奥尔胡斯大学的一项新研究得出的结论。该研究对150多名喝咖啡的人进行了评估以此来确定咖啡对味觉和嗅觉的潜在影响。除了增加一个人对甜味的感知，研究还发现喝咖啡还会降低一个人品尝苦味的能力。",
          url:
            "https://baijiahao.baidu.com/s?id=1664667430722714221&wfr=spider&for=pc"
        }
      ]
    };
  },
  methods: {
    searchClick() {
      this.showBd = true;
      this.wd = this.search;
    }
  },
  mounted() {
    this.screenHeight = document.body.offsetHeight-1;
  }
};
</script>

<style lang="scss" scoped>
.news {
  position: relative;
  // overflow: hidden;
  width: 80%;
  margin: 0 auto;
  padding-top: 30px;

  .header {
    position: relative;
    z-index: 2;
    background-color: #fffffb;

    .bd {
      // display: inline-block;
    }
    .text {
      display: inline-block;
      text-align: left;
      a {
        color: royalblue;
        &:focus,
        &:hover {
          color: orangered;
        }
      }
    }
  }
  .bd-content {
    margin-top: -80px;
    height: 2150px;

    .cover {
      height: 85px;
      width: 100%;
      position: absolute;
      bottom: 0;
      z-index: 2;
      background: #fffffb;
    }
  }
}
</style>
