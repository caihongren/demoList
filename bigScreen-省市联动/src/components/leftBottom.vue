<template>
  <div class="box">
    <img src="../imager/border1 (2).png" style="width: 100%" alt="" />
    <div class="title">
      {{ name }}
    </div>
    <div id="leftBottom" class="echarts"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getBoardChannel } from "../API/api";
export default {
  data() {
    return {
      name: "设备渠道分布TOP10",
      nameList: [],
      numList: [],
    };
  },
  mounted() {
    this.init().then((res) => {
      this.getEcharts();
    });
  },
  created() {
    // this.init()
  },
  props: {
    isTime: Boolean,
  },

  watch: {
    isTime: function () {
      this.init().then((res) => {
        this.getEcharts();
      });
    },
  },
  methods: {
    init() {
      return new Promise((resolve, resJect) => {
        getBoardChannel().then((res) => {
          if (res.code == "200") {
            this.nameList = [];
            this.numList = [];
            // let list = res.result.sort(this.objectArraySort("number"));
            let list = res.result;
            list.map((item, index) => {
              if (index < 10) {
                this.nameList.push(this.nameLength(item.channelName));
                this.numList.push(item.number);
              }
            });
            this.nameList.reverse();
            this.numList.reverse();
            resolve(this.numList);
          }
        });
      });
    },
    objectArraySort(keyName) {
      return function (objectN, objectM) {
        var valueN = objectN[keyName];
        var valueM = objectM[keyName];
        if (valueN < valueM) return 1;
        else if (valueN > valueM) return -1;
        else return 0;
      };
    },
    nameLength(name) {
      name = name || "";
      if (name.length > 10) {
        return name.substring(0, 10) + "*";
      } else {
        return name;
      }
    },
    getEcharts() {
      let chartDom = document.getElementById("leftBottom");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          x: 20,
          text: "",
          top: 0,
          textStyle: {
            color: "#ffffff",
            fontSize: "12",
            // fontWeight: "500",
          },
          subtext: "",
          subtextStyle: {
            color: "#ffffff",
            fontSize: "12",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [],
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: false,
          boundaryGap: [0, 0.01],
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#ffffff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: this.nameList,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#ffffff",
              fontSize: "16",
              // fontWeight: "500",
            },
          },
        },
        series: [
          {
            name: "激活数",
            type: "bar",
            data: this.numList,
            barWidth: 18,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  // position: "inside", //数据在中间显示
                  position: "right",
                  color: "#fff",
                  formatter: "{c}", //百分比显示，模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数
                },
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  // {offset: 0, color: '#1a9cee'},
                  // {offset: 1, color: '#2fcfdc'}
                  { offset: 0, color: "#0184d7" },
                  { offset: 1, color: "#50fefe" },
                ]),
              },
            },
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
  .echarts {
    width: 90%;
    margin: 0px 5%;
    height: 400px;
    position: absolute;
    top: 20px;
  }
}
</style>