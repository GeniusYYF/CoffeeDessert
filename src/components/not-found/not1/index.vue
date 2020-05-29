<template>
  <div class="not-found" :style="{height:height-60+'px'}">
    <img src="./img/ds1.gif" />
    <div class="text">
      <span
        v-for="(ch,i) in textList[randomIndex]"
        :key="i"
        class="ch"
        :style="{color:`rgb(${getRandom(0, 255)},${getRandom(0,255)},${getRandom(0, 255)})`,
	  'text-shadow':`${getRandom(0, 10)}px ${getRandom(0, 10)}px ${getRandom(0, 5)}px 
	   rgb(${getRandom(0, 255)},${getRandom(0,255)},${getRandom(0, 255)})`,
	  'font-size':getRandom(30, 50)+'px',
	  'animation-delay': i*0.3+'s'}"
      >{{ch}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  computed: {},
  data() {
    return {
      textList: [
        ["不", "好", "，", "页", "面", "丢", "了", "❕"],
        ["hi", "，", "我", "又", "来", "了"],
        ["换", "个", "页", "面","看","看","~"],
        ["我", "美", "吗", "💢"],
        ["多", "喝", "咖", "啡","☕","☕","☕"],
        ["☕","☕","☕","☕","☕","☕","☕","☕","☕"]
      ],
      randomIndex: 0,
      height: 0,
      width: 0
    };
  },
  methods: {
    getRandom(min, max) {
      return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
  },
  mounted() {
    var interval = setInterval(_ => {
      this.randomIndex = this.getRandom(0, this.textList.length - 1);
    }, 5000);
    // 持续5分钟没重新加载实例的话，删除定时器，不再更换文字
    setTimeout(_ => {
      clearInterval(interval);
    }, 5 * 60 * 1000);

    this.height = document.body.offsetHeight;
    this.width = document.body.offsetWidth;
    console.log(window.screen, document.body);
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 600px;
  img {
    height: 300px;
  }
}
.text {
  display: block;
  position: relative;
  width: 400px; // 动画最后走到400px，这样达到居中

  .ch {
    animation: ease infinite move-ch;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    // animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(1, 1, 1, 1);
    // transition: all 0.1s;
    position: absolute;
    opacity: 0;
  }
}

@keyframes move-ch {
  0% {
    left: 0;
    top: 0;
    opacity: 1;
  }
  8% {
    left: 100px;
    top: -100px;
    opacity: 1;
  }
  16% {
    left: 200px;
    top: -50px;
    opacity: 1;
  }
  24% {
    left: 300px;
    top: -150px;
    opacity: 0.5;
  }
  32% {
    left: 400px;
    top: -200px;
    opacity: 0;
  }
  100% {
    // left: 400px;
    // top: -200px;
    // opacity: 0;
  }
}
</style>
