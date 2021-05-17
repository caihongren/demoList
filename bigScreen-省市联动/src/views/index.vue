<template>
  <div class="boxOne">
    <header>
      <img src="../imager/headerBg.png" alt="" />
      <div class="text">
        <div class="time"></div>
        <div class="name">{{ name }}</div>
        <div class="time">
          当前日期：{{ date }} {{ dayString(day) }} {{ time }}
        </div>
      </div>
    </header>
    <div class="min">
      <div class="left">
        <LeftTop :data="data"></LeftTop>
        <LeftBottom :isTime='isTime'></LeftBottom>
      </div>
      <div class="center">
        <Map :onlineNum="onlineNum" :onlineRate="onlineRate" :isTime='isTime'></Map>
        <Center :isTime='isTime'></Center>
      </div>
      <div class="right">
        <Today :sosWarnNum="sosWarnNum" :fenceWarnNum="fenceWarnNum"></Today>
        <RightBottom></RightBottom>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import { Toast } from "vant";
import { getBoardInfo } from "../API/api";
import { dayString } from "../API/tools";
import LeftTop from "../components/leftTop";
import LeftBottom from "../components/leftBottom";
import Map from "../components/map";
import Center from "../components/centerBottom";
import Today from "../components/toDay";
import RightBottom from "../components/rightBottom";
import dayjs from "dayjs"; // ES 2015
var time = null;
var time2 = null;
export default {
  name: "index",
  data() {
    return {
      name: "智能电子证数据分析中心",
      isTime: true,
      date: "",
      day: "",
      time: "",
      sosWarnNum: "0", //SOS告警数量
      //围栏告警数量
      fenceWarnNum: "0",
      deviceTotal: "", // 设备总数
      deviceActivated: "",
      deviceUnactivated: "",
      //在线设备
      onlineNum: "0",
      //在线设备率
      onlineRate: "0",
      data: {},
    };
  },
  components: {
    LeftTop,
    LeftBottom,
    Map,
    Center,
    Today,
    RightBottom,
  },

  mounted() {},
  created() {
    this.init();
    time = setInterval(() => {
      this.date = dayjs().format("YYYY年MM月DD日");
      this.day = dayjs().day();
      this.time = dayjs().format("HH:mm:ss");
    }, 1000);
    time2 = setInterval(() => {
      this.isTime=!this.isTime
    }, 1000*60*5);
  },
  watch: {},
  methods: {
    dayString,
    init() {
      getBoardInfo().then((res) => {
        console.log(res, this.name);
        if (res.code == "200") {
          this.fenceWarnNum = res.result.fenceWarnNum || "0";
          this.sosWarnNum = res.result.sosWarnNum || "0";
          this.onlineNum = res.result.onlineNum || "0";
          this.onlineRate = res.result.onlineRate || "0";
          this.data = res.result;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.boxOne {
  width: calc(100% - 0px);
  min-height: 100vh;
  padding: 0 0px;
  header {
    margin: 0;
    width: 100%;
    position: relative;
    height: 100px;
    color: #ffffff;
    img {
      height: 100%;
      width: 100%;
    }
    .text {
      width: 100%;
      // height: 45px;
      font-size: 36px;
      font-family: Alibaba PuHuiTi;

      color: #ffffff;
      line-height: 90px;
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;

      // background: linear-gradient(0deg, #00e4ff 0%, #bdf8ff 100%);
      // -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
      display: flex;
      justify-content: space-around;
      .name {
        width: 40%;
        color: #ffffff;
      }
      .time {
        width: 30%;
        overflow: hidden;
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
  .min {
    display: flex;
    justify-content: space-around;
    // margin: 10px;
    .left,
    .right {
      width: 30%;
      padding: 10px;
    }
    .center {
      flex: 1;
      padding: 10px;
    }
    .left,
    .right {
    }
  }
}
</style>

<style >
body {
  /* background-image: url("../imager/backImager.png"); */
  background: url("../imager/bg.png") no-repeat center 0px;
  background-position: center 0;
  background-size: cover;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>