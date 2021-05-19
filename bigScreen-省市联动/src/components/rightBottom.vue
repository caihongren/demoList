<template>
  <div class="box">
    <img
      src="../imager/border1 (4).png"
      style="width: 100%; height: 120%"
      alt=""
    />
    <div class="title">
      {{ name }}
    </div>
    <div class="toDaymin">
      >
      <div class="headerLi li">
        <div class="time">时间</div>
        <div class="imei">设备号</div>
        <div class="type">类型</div>
        <div class="site">地点</div>
      </div>
      <div
        :class="['li', item.type ? 'two' : 'one']"
        v-for="(item, index) in data.slice(0, 7)"
        :key="index"
      >
        <div class="time">{{ dayjs(item.warnTime).format("HH:mm:ss") }}</div>
        <div class="imei">{{ item.imei }}</div>
        <div class="type">{{ item.warnType }}</div>
        <div class="site">{{ item.address }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getBoardWarn } from "../API/api";
import dayjs from "dayjs"; // ES 2015
var time3 = null;
export default {
  data() {
    return {
      name: "实时警告",
      data: [],
    };
  },

  mounted() {},
  created() {
    this.init();
    //     time3=setInterval(()=>{
    //  this.init()
    //     },5000)
  },
  props: {
    webData: Object,
  },
  watch: {
    webData: {
      handler: function (newval, oidVal) {
        console.log(newval, oidVal);
        this.changeList(newval);
      },
      deep: true,
    },
  },
  methods: {
    dayjs,
    init() {
      getBoardWarn().then((res) => {
        // console.log(res, this.name);
        if (res.code == "200") {
          this.data = res.result;
        }
      });
    },
    changeList(data) {
      let list = JSON.parse(JSON.stringify(this.data));
      // console.log(list,'this.list')
      data.type = true;
      list.unshift(data);
      if (list.length > 7) {
        list = list.splice(0, 7);
      }
      let oldList=JSON.parse(JSON.stringify(list));
      setTimeout(() => {
        this.getTime(oldList);
      }, 5000);
      // console.log(list,'list')
      this.data = list;
    },
    getTime(list) {
      this.data.forEach((res) => {
        if (res.type) {
        
          for (let i = 0; i < list.length; i++) {
            if ((list[i].warnTime = res.warnTime)) {
              res.type = false;
               this.$forceUpdate()
              break;
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  .title {
    position: absolute;
    top: 0px;
    text-align: left;
    width: 80%;
    padding: 0 40px;
    height: 60px;
    font-size: 20px;
    font-family: Alibaba PuHuiTi;
    // font-weight: 500;
    color: #fff;
    line-height: 60px;
  }
  .toDaymin {
    width: 90%;
    margin: 00px 5%;

    position: absolute;
    top: 60px;
    left: 0;
    overflow: hidden;
    .li {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      color: #fff;
      height: 60px;
      line-height: 40px;
      text-align: center;
      div {
        width: 20%;
      }
      .imei {
        width: 24%;
      }
      .site {
        line-height: 20px;
        width: 35%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
    .headerLi {
      color: #03c6e8;
    }
    .two {
      background-color: rgba(3, 198, 232, 0.25);
    }
  }
}
</style>