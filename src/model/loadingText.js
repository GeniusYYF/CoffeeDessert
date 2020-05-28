export const loading = {
  install: function (Vue, options) {
    Vue.component('loading', {
      props: {
        text: {
          type: String
        },
        duration: {
          type: String,
          default: '1s'
        },
		firstBig: {
		  type: Boolean
		}
      },
      data: function () {
        return {};
      },
      mounted: function () {
        var cssFlag = false;
        return function () {
          if (cssFlag) {
            return;
          }
          var head = document.querySelector('head');
          var style = document.createElement('style');
          style.type = 'text/css';
          // top:50%;
          // position: absolute;
          // display: flex;
          // padding-top: 30px;
          // height: 50px;
          // justify-content: space-between;

          // 1- border-bottom: 1px solid;
          // 2- border-bottom: none;
          style.innerText = `
            .loading-wrapper{
              align-items: center;
              justify-content: center;
              display: flex;
              position: fixed;
              left:0;
              top:0;
              z-index:9999;
              width:100%;
              height:100%;
              background-color: rgb(0,0,0,0.7)
            }
            .loading {
              width: fit-content;
              display: flex;
              padding-top: 30px;
              height: 50px;
              color: rgb(194, 188, 252);
              font-weight: border;
              text-shadow: 2px 2px 10px #5f76fa;
            }
            
            .loading span {
              margin-top: 0;
              animation: ease infinite move;
              display: block;
            }
            @keyframes move {
              0% {
                top: -10px;
              }
              50% {
                top: 10px;
              }
              100% {
                top: -10px;
              }
            }`;
          head.appendChild(style);
          cssFlag = true;
        };
      }(),
      template: `
          <div class='loading-wrapper'>
            <div class='loading'>
              <span 
                :style='{
                  position:"relative",
                  animationDuration: duration.indexOf("s") === -1 ? duration + "s" : duration , 
                  animationDelay: parseInt(duration)/text.length*index +"s",
                  fontSize: index == 0 && firstBig ? "50px":"35px"
                }' 
                v-for='char,index in text'>
                {{char}}
              </span>
            </div>
          </div>
        `
    });
  }
};