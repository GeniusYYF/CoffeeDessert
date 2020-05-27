<template>
  <div id="app" class="wrapper">
    <template>
      <el-backtop target=".wrapper" :visibility-height="200" :right="40" :bottom="40"></el-backtop>
    </template>

    <router-view />
    <loading :text="loadingText" duration="1" v-show="loading" :firstBig="firstBig"></loading>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loading: false,
      loadingText: "Load...",
      firstBig: true
    };
  },
  mounted() {

    this.$eventHub.$on("loading", loading => {
      this.loading = loading;
    });
    this.$eventHub.$on("loadingText", loadingText => {
      this.loadingText = loadingText;
    });
    this.$eventHub.$on("firstBig", firstBig => {
      this.firstBig = firstBig;
    });

    var faceList = [
      "😀",
      "😁",
      "😂",
      "🤣",
      "😃",
      "😄",
      "😅",
      "😆",
      "😉",
      "😊",
      "😋",
      "😎",
      "😍",
      "😘",
      "😗",
      "😙",
      "😚",
      "🙂",
      "🤗",
      "🤩",
      "🤔",
      "🤨",
      "😐",
      "😑",
      "😶",
      "🙄",
      "😏",
      "😣",
      "😥"
    ];

    var starList = ["☆", "★"];

    var loveList = ["❤", "🧡", "💛", "💙", "💚", "💜", "🖤", "💗"];

    var movePx = 0, //用做记录距上次显示图像后的移动距离px
      intervalPx = 200, // 超过这个px长度后自动产生一个
      intervalStars = "", // 定时清空器
      span, // span元素
      time = 8, // 动画时间，清空间隔（*10s）
      spans = [], // 产生的所有span
      style = document.createElement("style"), // 增加到头部的动画函数样式
      drop = document.createElement("span"), // 用于放产生的所有元素
      body = document.querySelector("body"); // body

    body.appendChild(drop);
    style.type = "text/css";
    style.innerText = `
			@keyframes mymove
			{
			from {}
			to {top:2020px;display:none}
			}
    	`;
    document.querySelector("head").appendChild(style);

    intervalStars = setInterval(() => {
      if (spans.length > 0) {
        spans.forEach((span, i) => {
          span.remove();
          console.log(`共${spans.length}个星星，正在清空第${i + 1}个星星...`);
        });
        spans = [];
      } else console.log("此时没用星星!");
    }, time * 10000);

    body.addEventListener("mousemove", e => {
      // console.log(movePx, e.x, e.y);
      if (movePx > intervalPx) {
        span = document.createElement("span");
        spans.push(span);
        let rand = Math.floor(Math.random() * loveList.length);

        span.style.cssText = `
			position:fixed;
			left:${e.x}px;
			top:${e.y}px;
			animation:mymove ${time}s 1;
			animation-fill-mode:forwards;
			font-size:${(rand + 12) * 2}px;
			text-shadow: 2px 2px 2px red;
			opacity:.5;
			`;
        span.innerText = loveList[rand];
        drop.appendChild(span);
        movePx = 0;
      } else movePx++;
    });
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
html {
  background-color: rgba($color: #fffffb, $alpha: 1);

  // 鼠标样式
  cursor: url("./assets/cursor.gif"), default;
}
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: auto;
}

// ::-webkit-scrollbar {
//   display: none; /* Chrome Safari */
// }

.el-menu--horizontal {
  .el-menu {
    .el-menu-item:hover {
      background-color: rgba($color: rgb(253, 244, 196), $alpha: 0.7);
    }
    .divider {
      height: 1px !important;

      .el-divider {
        margin: 5px 0;
      }
    }
  }
}
// 滚动条样式
#app::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 145, 0, 0.986);
  background-color: #f5f5f5;
}

#app::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

#app::-webkit-scrollbar-thumb {
  background-color: #f90;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
</style>
