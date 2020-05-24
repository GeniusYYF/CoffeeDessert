<template>
  <div class="mm-make-use">
    <div class="use">
      <el-divider content-position="left">滴滤咖啡</el-divider>
      <div class="text">
        <div>
          德国人发明的冲煮方法。简单的说就是把咖啡磨粉后，放在一个漏斗里然后再加层滤纸，上面浇上热水（理想水温80℃到85℃之间），
          首先注入一次热水闷蒸20秒，然后再以绕圈的方式注入热水，由于地球引力作用，咖啡就从底下流出来。
          咖啡的量通常是7～10克粉可以做大约120ml的一杯。
        </div>
        <div>
          <strong>研磨度：</strong>咖啡呈现砂糖状的细微颗粒感
        </div>
        <div>
          <strong>水粉比：</strong>（视个人口味、豆品、使用情况而定）
        </div>
      </div>

      <div class="use-image" :style="{'background-image':`url(`+require(`./img/use1.png`)+`)`}"></div>
    </div>

    <div class="use">
      <el-divider content-position="left">虹吸壶（Syphon）</el-divider>
      <div class="text">
        <div>坊间咖啡馆最普及的咖啡煮法之一。</div>
        <div>
          <strong>原理：</strong>在酒精灯的燃烧下，下层容器中的水温达到92℃时，水流被吸到有咖啡粉末的上层容器中，通过浸泡、搅拌后，制成的咖啡再原路返回。
        </div>
        <div>
          <strong>研磨度：</strong>比粉状略粗，接近特粒细砂糖。
        </div>
      </div>

      <div class="use-image" :style="{'background-image':`url(`+require(`./img/use2.png`)+`)`}"></div>
    </div>

    <div class="use">
      <el-divider content-position="left">摩卡壶（Moka Pot）</el-divider>
      <div class="text">
        <div>
          摩卡壶基本原理利用加压的热水快速通过咖啡粉萃取咖啡液。最早的摩卡壶是意大利人Alfonso Bialetti在1933年制造的，
          他的公司Bialetti一直以生产这种咖啡壶而闻名世界。摩卡咖啡壶在欧洲使用比较普遍。
          摩卡壶分为上下两部分，水放在下半部分煮开沸腾产生蒸气压力；滚水上升，经过装有咖啡粉的过滤壶；
          当咖啡流至上半部时，将火关小，如果温度太高会使咖啡产生焦味。
        </div>
        <div>
          <strong>使用注意事项：</strong>
        </div>
        <div>
          1．水位：使用温水，水位在安全阀下0.5厘米位置。安全阀在遇到下壶压力过高时会自动泄压，
          以防止出现安全事故，水位如果高过安全阀，安全阀的作用就不能正常发挥。
          <div>
            2．咖啡粉：咖啡粉采用中细粒度，装满粉槽，装粉的时候适当振动粉槽让咖啡粉均匀分布，
            装满以后，用手指轻轻按压表面，使粉更密实一些。
          </div>
        </div>
      </div>

      <div class="use-image" :style="{'background-image':`url(`+require(`./img/use3.png`)+`)`}"></div>
    </div>

    <div class="use">
      <el-divider content-position="left">比利时皇家咖啡壶（Balancing Syphon）</el-divider>
      <div class="text">
        <div>
          兼有虹吸式咖啡壶和摩卡壶特色的比利时壶，演出过程充满跷跷板式趣味。
          它结合了数种自然的力量：火、蒸汽、压力、重力，这些使得比利时皇家咖啡壶的操作感觉更具可看性。
        </div>
      </div>
      <div class="use-image" :style="{'background-image':`url(`+require(`./img/use4.png`)+`)`}"></div>
    </div>

    <div class="use">
      <el-divider content-position="left">法式滤压壶</el-divider>
      <div class="text">
        <div>简称法压壶，是一种同时具备冲茶器功能的咖啡壶。</div>
        <div>
          <strong>原理：</strong>用浸泡的方式，通过水与咖啡粉全面接触浸泡的焖煮法来释放咖啡的精华。适用咖啡：浓淡口味均可的咖啡粉。研磨度：粗颗粒状。
        </div>
        <div>
          <strong>缺点：</strong>由于金属滤网对细粉无法彻底的过滤，咖啡豆需要粗研磨，咖啡粉颗粒变粗，导致大量内容物无法萃取。
          而长时间浸泡又会萃取过度，苦味、涩味、杂味纷纷涌出，因此咖啡口感稍逊一筹。
        </div>
      </div>
      <div class="use-image" :style="{'background-image':`url(`+require(`./img/use5.png`)+`)`}"></div>
    </div>

    <div class="use">
      <el-divider content-position="left">电动式咖啡机</el-divider>
      <div class="text">
        <div>
          一般市面上常见的有美式咖啡滴漏机、意大利式蒸汽咖啡机。美式滴漏咖啡机的价格与虹吸壶不相上下，适合中度或偏深度烘焙的咖啡，
          研磨颗粒略细，口味偏苦涩。它通过电力将水煮沸后浸泡，这样做的黑咖啡最简单，但由于用沸水制作，口感稍逊一筹。
          用意大利式蒸汽咖啡机冲泡的咖啡比较浓，温度也比较高，口味比美式滴漏机冲泡的咖啡要重。
          意式蒸汽咖啡壶是种通过高压高温让蒸汽快速通过咖啡粉萃取咖啡的机器，煮咖啡的最佳温度在90～98摄氏度之间，
          意式咖啡机温控做得相当好。家用的意式咖啡机往往还带着一支打奶泡的嘴，做卡布奇诺；另外往往还有将杯子温热的功能。
        </div>
      </div>
      <div class="use-image" :style="{'background-image':`url(`+require(`./img/use6.png`)+`)`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.mm-make-use {
  .use {
    margin-top: 30px;
    margin-bottom: 30px;

    .el-divider div {
      font-size: 18px;
      background-color: #fffffb;
      left: 0;
      padding-left: 0;
    }
    .text {
      text-indent: 2em;
      // color: $textColor;
      font-size: 14px;
      line-height: 1.5;
    }
    .use-image {
      height: 500px;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }
}
</style>
