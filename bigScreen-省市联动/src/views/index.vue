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
        <LeftBottom :isTime="isTime"></LeftBottom>
      </div>
      <div class="center">
        <Map
          :onlineNum="onlineNum"
          :onlineRate="onlineRate"
          :isTime="isTime"
        ></Map>
        <Center :isTime="isTime"></Center>
      </div>
      <div class="right">
        <Today :sosWarnNum="sosWarnNum" :fenceWarnNum="fenceWarnNum"></Today>
        <RightBottom :webData='webData'></RightBottom>
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
      websock: null,
      lockReconnect: false,
      heartCheck: null,
      ws: "http://whty.tyjulink.com/jeecg-boot",
      webData:{}
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

  mounted() {
    this.initWebSocket();
    this.heartCheckFun();
  },
  created() {
    this.init();
    time = setInterval(() => {
      this.date = dayjs().format("YYYY年MM月DD日");
      this.day = dayjs().day();
      this.time = dayjs().format("HH:mm:ss");
    }, 1000);
    time2 = setInterval(() => {
      this.isTime = !this.isTime;
    }, 1000 * 60 * 5);
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
    // 处理推送的信息
    getList(data) {
      // data = data || {
      //   address: "测试地址",
      //   warnTime: "2021-05-17 16:19:31",
      //   warnType: "进围栏",
      //   imei: "555",
      //   cmd: "boardWarn",
      // };
      // data.warnTime=new Date()

      //  增加数量
      if (data.warnType == "进围栏" || data.warnType == "出围栏") {
        this.fenceWarnNum++;
      } else if (data.warnType == "SOS") {
        this.sosWarnNum++;
      }
      this.webData=data
    },
    initWebSocket: function () {
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      var userId = "demo123";
      var url =
        this.ws.replace("https://", "wss://").replace("http://", "ws://") +
        "/websocket/" +
        userId;
      this.websock = new WebSocket(url);
      this.websock.onmessage = this.websocketOnmessage;
      this.websock.onopen = this.websocketOnopen;
      this.websock.onerror = this.websocketOnerror;

      this.websock.onclose = this.websocketOnclose;
    },
    websocketOnopen: function () {
      //心跳检测重置

      this.heartCheck.reset().start();
    },
    websocketOnerror: function (e) {
      this.reconnect();
    },
    websocketOnmessage: function (e) {
      console.log(e, "eee");
      var data = eval("(" + e.data + ")"); //解析对象
      // this.getList();
      if (data.cmd == "topic") {
        //系统通知
        this.loadData();
        // this.openNotification (data);
      } else if (data.cmd == "user") {
        //用户消息
        this.loadData();
        // this.openNotification (data);
      } else if (data.cmd == "boardWarn") {
        this.getList(data);
      }
      //心跳检测重置

      this.heartCheck.reset().start();
    },
    websocketOnclose: function (e) {
      this.reconnect();
    },
    websocketSend(text) {
      // 数据发送
      try {
        this.websock.send(text);
      } catch (err) {
        console.log(err);
      }
    },

    reconnect() {
      var that = this;
      if (that.lockReconnect) return;
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        console.info("尝试重连...");
        that.initWebSocket();
        that.lockReconnect = false;
      }, 5000);
    },
    heartCheckFun() {
      var that = this;
      //心跳检测,每20s心跳一次
      that.heartCheck = {
        timeout: 20000,
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function () {
          clearTimeout(this.timeoutObj);
          //clearTimeout(this.serverTimeoutObj);
          return this;
        },
        start: function () {
          var self = this;
          this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            that.websocketSend("HeartBeat");
            console.info("客户端发送心跳");
            /*self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                that.websock.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
              }, self.timeout)*/
          }, this.timeout);
        },
      };
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