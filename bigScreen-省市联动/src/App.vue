<template>
  <div
    id="app"
    :style="[
      {
        transform:
          'translate(' +
          ((1 - zoom) * thisWidth) / 2 +
          'px, ' +
          (0 * thisHeight) / 2 +
          'px) scale(' +
          zoom +
          ')',
      },
      { width: (1 / zoom) * 100 + '%' },
    ]"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: "1",
      screenWidth: document.body.clientWidth,
      thisWidth: "2",
      thisHeight: "1",
    };
  },
  mounted() {
    // 监听屏幕宽度
    const that = this;
    this.changeMargin()
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        that.changeMargin();
      })();
    };
  },
  methods: {
    changeMargin() {
      //获取元素距离屏幕左边的距离

      //获取网页可见区域宽度
      let docWidth = document.body.clientWidth;
     
      // this.thisWidth = document.body.clientWidth
      this.thisHeight = document.body.clientHeight;
      this.zoom = 1;
      if (docWidth > 1200) {
        this.zoom = docWidth / 1920;
      } else {
        // this.zoom = 1;
         this.zoom = 1200/1920;
      }
      //动态设置样式
      // if (zoom >= 1) {
      // 	$('.wrapDiv ').css({
      // 		'transform': 'translate(' + (1 - zoom) * thisWidth / 2 + 'px, ' + (0) * thisHeight / 2 + 'px) scale(' + zoom + ')',

      // 	});
      // 	$('.headDiv ').css({
      // 		'transform': 'translate(' + (0) * headerWidth / 2 + 'px, 0px) scale(' + zoom + ')',
      // 		'width': 1 / zoom * 100 + '%',
      // 		'height': zoom * headerHeight + 'px',

      // 	});
      // } else {
      // 	$('.wrapDiv').css({
      // 		'transform': 'translate(' + (0) * thisWidth / 2 + 'px, ' + (0) * thisHeight / 2 + 'px) scale(' + zoom + ')',

      // 	});
      // 	$('.headDiv ').css({
      // 		'transform': 'translate(' + (0) * headerWidth / 2 + 'px, 0px) scale(' + zoom + ')',
      // 		'width': 1 / zoom * 100 + '%',
      // 		'height': zoom * headerHeight + 'px',
      // 	});
      // }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  transform-origin: 0px 0px;
  min-width: 1210px;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
