export const loading = {
  install: function (Vue, options) {
    Vue.component('loading', {
      props: {
        type: {
          type: String
        },
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
              display: flex;
              width:300px;
              height:300px; 
              background: url(./img/drinkAn1.gif) no-repeat;
              background-size: 100% 100%;
            }
            `;
          head.appendChild(style);
          cssFlag = true;
        };
      }(),
      template: `
          <div class='loading-wrapper'>
          <div class='loading' />
          </div>
        `
    });
  }
};