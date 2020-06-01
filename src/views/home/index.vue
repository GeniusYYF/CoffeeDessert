<template>
  <div class="home">
    <div
      class="model-1"
      :style="{'background-image':`url(`+require(`./img/modelx.jpg`)+`)`,height:screenHeight-60+'px'}"
      :class="{unload:unload.model1,'load-img':!unload.model1}"
    >
      <el-card class="box-card" :class="{unload:unload.model1,load:!unload.model1}">
        <div slot="header" class="header">
          <span>咖啡 （世界三大饮料之一）</span>
        </div>
        <div class="text">咖啡，是用经过烘焙磨粉的咖啡豆制作出来的饮料。</div>

        <el-collapse accordion class="collapse" value="1">
          <el-collapse-item title="咖啡历史 history" name="1">
            <div>“咖啡”一词源自阿拉伯语“قهوة”（植物饮料），咖啡树原产于非洲埃塞俄比亚西南部的高原地区。</div>
            <div>
              据说一千多年以前一位牧羊人发现羊吃了一种植物后，变得非常兴奋活泼，进而发现了咖啡。还有说法称是因野火偶然烧毁了一片咖啡林，
              烧烤咖啡的香味引起周围居民注意。
            </div>
            <div>
              当地土著人经常把咖啡树的果实磨碎，再把它与动物脂肪掺在一起揉捏，做成许多球状的丸子。这些土著部落的人将这些咖啡丸子当成珍贵的食物，
              专供那些即将出征的战士享用。直到11世纪左右，人们才开始用水煮咖啡作为饮料。13世纪时，埃塞俄比亚军队入侵也门，将咖啡带到了阿拉伯世界。
              因为伊斯兰教义禁止教徒饮酒，有的宗教界人士认为这种饮料刺激神经，违反教义，曾一度禁止并关闭咖啡店，但埃及苏丹认为咖啡不违反教义，
              因而解禁，咖啡饮料迅速在阿拉伯地区流行开来。咖啡种植，制作的方法也被阿拉伯人不断地改进而逐渐完善。
            </div>
          </el-collapse-item>
          <el-collapse-item title="中国发展 development" name="2">
            <div>
              2008年，云南咖啡种植面积30多万亩。2010年，云南咖啡价格达41元每公斤，创下历史最高纪录。2012年至2014年初，
              受国际咖啡期货价格下跌的影响，价格一度低至每公斤13元左右，咖啡种植业连续两年走进“价格寒冬”。
              2014年1月底，随着国际咖啡期货价格回暖，云南咖啡价格也快速提升，从每公斤13元涨到25元。年底咖啡采收已接近尾声，
              但全省咖啡产量还不足6万吨。普洱咖啡产量也在2013年基础上至少下降了30%。
            </div>
            <div>
              雀巢、星巴克、咖蜜儿加大在云南开辟原料产地的力度，云南小粒咖啡也销往欧洲及美国、日本、韩国等二十多个国家和地区，
              但总体上云南咖啡产业仍停留在起步阶段，产业“突围”不容乐观。当前中国咖啡深加工业中缺乏大型综合龙头企业，本土咖啡品牌更屈指可数，
              在国内外市场占有率和市场评价方面没有起到引领作用。
            </div>
          </el-collapse-item>

          <el-collapse-item title="常见分类 classify" name="3">
            <div>黑咖啡、白咖啡、拿铁咖啡都是比较常见的咖啡种类之一。</div>
            <div>
              黑咖啡是咖啡的种类之一，黑咖啡也叫做清咖啡，指的是直接用咖啡豆烧制而成的咖啡，
              里面不会加奶、糖等任何影响咖啡原味的饮用方式，它强调咖啡本身的香味，带来的是咖啡最原始的感受。
            </div>
            <div>
              白咖啡与黑咖啡相比，颜色会淡很多，所以以白咖啡命名。白咖啡的咖啡豆没有加入焦糖，需要经过低温烘焙去除大量咖啡碱，
              里面的咖啡因含量非常低，且不会添加任何添加剂来加强味道，对肠胃的刺激性较小。
            </div>
            <div>
              拿铁咖啡又叫做咖啡牛奶，这种咖啡里面加入了大量的热牛奶和糖，意大利人喜欢将这种咖啡作为早餐饮料。
              拿铁咖啡里面的热牛奶会占大部分比例，所以饮用时能够品尝到更多鲜奶的味道，具有口感绵密细腻的特点。
            </div>
          </el-collapse-item>

          <el-collapse-item title="选购指南 guide" name="4">
            <div>不论是哪一种咖啡，新鲜度都是影响品质的重要因素。</div>
            <div>
              选购时，抓一两颗咖啡豆在嘴中嚼一下，要是清脆有声，表示咖啡豆未受潮，
              而唇齿留香的咖啡豆才是上品，但最好还是用手捏捏，感觉一下是否实心，千万不要买空壳的咖啡。
              刚炒好的咖啡豆并不适合马上饮用，一般来说，咖啡的最佳饮用期为炒后一周后，此时的咖啡最新鲜，香味口感的表现最佳。
            </div>
            <div>
              此外，咖啡豆的风味也是另一个考虑因素。内行人选咖啡豆，倒不见得是看颗粒的大小，咖啡豆在品相上，有可能存在大小不一。
              其次是色泽，日晒豆在颜色上不论生豆或是熟豆都会存在颜色不一，是正常现象，
              切勿单方面自行解读书中或是资料中的浅见，将所有咖啡豆都一概而论。相对来说，中深烘的咖啡豆相比浅烘豆更易出油，
              浅烘豆则不出油或少量出油。总之在选购咖啡时应注意其新鲜度、香味和有陈味。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <div
      class="model-1"
      v-for="(name,i) in imgList"
      :key="i"
      :style="{'background-image':`url(`+require(`./img/${name+i}.jpg`)+`)`}"
    ></div>
  </div>
</template>

<script>
import { sign_by_face } from "@/api/face";
export default {
  name: "",
  data() {
    return {
      screenHeight: "",
      unload: { model1: true },
      imgList: [
        // "model"
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model",
        // "model"
      ]
    };
  },
  methods: {},
  mounted() {
    this.screenHeight = document.body.offsetHeight - 1;
    this.unload.model1 = false;
   
  }
};
</script>

<style lang="scss" scoped>
$theamColor: rgb(255, 217, 129);
$textColor: rgb(59, 34, 0);
$titleColor: rgb(138, 67, 0);

.home {
  .unload {
    opacity: 0 !important;
  }
  .load {
    opacity: 0.95;
    transition: opacity 2s;
  }
  .load-img {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .model-1 {
    height: 650px;
    // background-image: url(../../assets/coffee1.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .box-card {
      width: 42%;
      position: relative;
      left: 55%;
      top: 8%;
      text-align: left;

      .header {
        color: $titleColor;
      }
      .text {
        color: $textColor;
      }

      /deep/ .el-card__body {
        .collapse {
          margin-top: 20px;
          .el-collapse-item__header {
            color: $titleColor;
            &:hover {
              background-color: rgba($color: $theamColor, $alpha: 0.5);
            }
          }

          .el-collapse-item__header.is-active {
            color: rgba($color: $titleColor, $alpha: 0.5);
          }

          div {
            text-indent: 2em;
            color: $textColor;
            font-size: 12px;
          }

          .el-collapse-item__content {
            padding-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
