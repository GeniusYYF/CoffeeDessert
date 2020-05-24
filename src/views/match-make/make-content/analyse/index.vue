<template>
  <div class="mm-analyse">
    <el-form :inline="true" :model="analyseList" label-suffix="：" label-position="left">
      <el-form-item :label="item.title" v-for="(item,i) in analyseList" :key="i">
        <div style="color:rgb(150,150,0);">{{item.text}}</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      analyseList: [
        {
          title: "风味【Flavor】",
          text: "对香气、酸度、与醇度的整体印象。"
        },
        {
          title: "酸度【Acidity】",
          text:
            "所有生长在高原的咖啡所具有的酸辛强烈的特质。此处的酸辛与苦味、发酸（Sour）不同，与酸碱值也无关，它是指促使咖啡发挥提振心神、涤清味觉等功能的一种清新、活泼的特质。	"
        },
        {
          title: "醇度【Body】",
          text:
            "饮用咖啡后，舌头留有的口感。醇度的变化可分为清淡到如水到淡薄、中等、高等、脂状，甚至某些印尼的咖啡如糖浆般浓稠。"
        },
        {
          title: "气味【Aroma】",
          text:
            "咖啡调配完成后所散发出来的气息与香味。用来形容气味的词包括焦糖味、碳烤味、巧克力味、果香味、草味、麦芽味，等等。"
        },
        {
          title: "苦味【Bitter】",
          text:
            "苦是一种基本的味觉，感觉区分布在舌根部分。深度烘焙的苦味是刻意营造出来的，但常见的苦味发生原因，是咖啡粉用量过多，而水太少。"
        },
        {
          title: "清淡【Bland】",
          text:
            "生长在低地的咖啡，口感通常相当清淡、无味。咖啡粉分量不足、而水太多的咖啡，也会造成同样的清淡效果。"
        },
        {
          title: "咸味【Briny】",
          text: "咖啡冲泡后，若是加热过度，将会产生一种含盐的味道。"
        },
        {
          title: "泥土的芳香【Earthy】",
          text:
            "通常用来形容辛香而具有泥土气息的印尼咖啡，并非指咖啡豆沾上泥土的味道。"
        },
        {
          title: "独特性【Exotic】",
          text:
            "形容咖啡具有独树一帜的芳香与特殊气息，如花卉、水果、香料般的甜美特质。东非与印尼所产的咖啡，通常具有这种特性。"
        },
        {
          title: "芳醇【Mellow】",
          text: "用来形容中酸度平衡性佳的咖啡。"
        },
        {
          title: "温和【Mild】",
          text:
            "用来形容某种咖啡具有调和、细致的风味，用来指除巴西以外的所有高原咖啡。"
        },
        {
          title: "柔润【Soft】",
          text: "形容像印尼咖啡这样的低酸度咖啡，亦形容为芳醇或香甜。"
        },
        {
          title: "发酸【Sour】",
          text: "一种感觉区主要位于舌头后侧的味觉，是浅度烘焙咖啡的特点。"
        },
        {
          title: "辛香【Spicy】",
          text: "指一种令人联想到某种特定香料的风味或气味。"
        },
        {
          title: "浓烈【Strong】",
          text:
            "就技术上而言，形容的是各种味觉优缺点的多寡，或指特定的调理成品中，咖啡与水的相对比例。"
        },
        {
          title: "葡萄酒味【Winy】",
          text:
            "水果般的酸度与滑润的醇度，所营造出来的对比特殊风味。肯亚咖啡便是含有葡萄酒风味的最佳典范。"
        },
        {
          title: "扩",
          text:
            "咖啡豆只有经过烘焙才能变成供研磨和饮用的咖啡豆，一般分为浅度、中度、深度和特深度烘焙。咖啡的加工方式也会影响到咖啡的风味、酸度和醇度，现主要的加工方式有三种：水洗法、半水洗法和自然干燥法，因应不同地区、气候、咖啡豆的种类等因素而采用不同的加工方法，经过不同方法加工后的咖啡豆味道也会呈现不同的风味。"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.mm-analyse {
}
</style>
