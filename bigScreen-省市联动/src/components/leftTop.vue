<template>
  <div class="box">
    <img src="../imager/border1 (1).png" style="width: 100%" alt="" />
    <div class="title">
      {{ name }}
    </div>

    <div class="echarts">
      <div class="echartsMIn">
        <div class="name">设备总数：{{ data.deviceTotal }}</div>
        <div id="main"></div>
      </div>
      <div class="echartsMIn">
        <div class="name"></div>
        <div id="deviceTotal"></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getBoardInfo } from "../API/api";
export default {
  data() {
    return {
      name: "设备数量分析",
      deviceTotal: "",
      deviceTotalList: [],
      iotNameList: [],
      ioNumList: [],
    };
  },
  props: {
    data: Object,
  },
  mounted() {
    this.init(this.data).then((res) => {
      this.getEcharts();
      this.getEchartsTwo();
    });
  },
  created() {},
  watch: {
    data: function (val, oldval) {
      this.init(this.data).then((res) => {
        this.getEcharts();
        this.getEchartsTwo();
      });
    },
  },
  methods: {
    init(data) {
      return new Promise((resolve, reject) => {
        if (data) {
          this.deviceTotalList = [
            {
              name: "已激活数量",
              value: data.deviceActivated,
            },
            {
              name: "未激活数量",
              value: data.deviceUnactivated,
            },
          ];
          if (data.devicetype) {
            this.iotNameList = [];
            this.ioNumList = [];
            data.devicetype.map((Element) => {
              this.iotNameList.push({
                name: Element.iotName,
                value: Element.num || 0,
              });
            });
          }
          resolve(this.deviceTotalList);
        }
      });
    },
    getEcharts() {
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        color: [
          "#F2FF1A",
          "#06DEB2",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3",
        ],
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "5px",
          left: "center",
          textStyle: {
            color: "rgba(248, 245, 245, 1)",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
           center: ["50%", "28%"],
            avoidLabelOverlap: false,

            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                color: "#fff",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.deviceTotalList,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    getEchartsTwo() {
      let chartDom = document.getElementById("deviceTotal");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        color: [
          "#E570AE",
          "#0A76E4",
          "#06DEB2",
          "#F2FF1A",
          "#91c7ae",
          "#749f83",
          "#bd2e56",
          "#ae2ebd",
          "#2ebd61",
          "#2e76bd",
          "#06DEB2",
        ],
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "5px",
          left: "center",
          textStyle: {
            color: "rgba(248, 245, 245, 1)",
          },
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "28%"],
            avoidLabelOverlap: false,

            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                color: "#fff",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.iotNameList,
          },
        ],
      };
      option && myChart.setOption(option);
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
    text-align: center;
    width: 30%;
    padding: 0 30px;
    height: 60px;
    font-size: 20px;
    font-family: Alibaba PuHuiTi;
    // font-weight: 500;
    color: #fff;
    line-height: 60px;
  }
  .echarts {
    width: 90%;
    margin: 0px 5%;
    height: 350px;
    position: absolute;
    display: flex;
    top: 50px;
    .echartsMIn {
      width: 50%;
      height: 350px;
      .name {
        width: 80%;
        height: 50px;
        color: #fff;
        text-align: left;
        line-height: 50px;
        padding: 0 10%;
      }
      #main {
        width: 100%;
        height: 100%;
      }
      #deviceTotal {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>