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
      firstBig: true,
      dropList: [],
      faceList: [
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
      ],
      starList: ["☆", "★"],
      loveList: ["❤", "🧡", "💛", "💙", "💚", "💜", "🖤", "💗"]
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

    this.$eventHub.$on("dropList", dropList => {
      if (dropList == "表情") this.dropList = this.faceList;
      else if (dropList == "五角星") this.dropList = this.starList;
      else this.dropList = this.loveList;
    });

    if (this.$session.get("user")) {
      let dropList = this.$session.get("user").msg.dropList;
      if (dropList == "表情") this.dropList = this.faceList;
      else if (dropList == "五角星") this.dropList = this.starList;
      else this.dropList = this.loveList;
    }

    var movePx = 0, //用做记录距上次显示图像后的移动距离px
      intervalPx = 100, // 超过这个px长度后自动产生一个
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
    this.dropList = this.dropList.length == 0 ? this.loveList : this.dropList;

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
        let rand = Math.floor(Math.random() * this.dropList.length);

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
        span.innerText = this.dropList[rand];
        drop.appendChild(span);
        movePx = 0;
      } else movePx++;
    });

    // 人脸登录成功
    let href = location.href.split("?")[1].split("&"),
      res = href[0].split("=")[1],
      username = href[1].split("=")[1];
    console.log(res, username);
    if (res == "true" && username) {
      let userList = this.$storage.get("userList"),
        adminList = this.$storage.get("adminList");
      userList.forEach(item => {
        if (item.name == username) {
          this.$store.commit("setUser", item);
          window.location.href = "127.0.0.1:8080/";
          // location.reload();
        }
      });
      adminList.forEach(item => {
        if (item.name == username) {
          this.$store.commit("setUser", item);
          window.location.href = "127.0.0.1:8080/";
          // location.reload();
        }
      });
    }
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
