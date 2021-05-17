<template>
  <div class="box">
    <img src="../imager/border1 (6).png" style="width: 100%" alt="" />
    <div class="title">
      {{ name }}
    </div>
    <!-- <div id="map" class="echarts"></div> -->
    <div v-show="ischain">
      <div id="map" class="echarts"></div>
    </div>
    <div v-show="!ischain">
      <div id="mapmin" class="echarts"></div>
    </div>
    <div class="numBox">
      <span>在线设备数：{{ onlineNum }}</span>
      <span>在线率：{{ onlineRate }}</span>
    </div>
  </div>
</template>
<script>
import "../API/china";
import * as echarts from "echarts";
import { getBoardMap } from "../API/api";

export default {
  data() {
    return {
      name: "智能电子证分布总览",
      nameList: [],
      numList: [],
      province: "",
      ischain: true,
      provinceList: new Map(),
    };
  },
  mounted() {
    this.init().then((res) => {
      this.getEchartsOne();
      this.getEcharts();
    });
  },
  created() {
    // this.init()
  },
  watch: {
    isTime: function () {
      this.init().then((res) => {
        this.getEchartsOne();
        this.getEcharts();
      });
    },
  },
  props: {
    isTime: Boolean,
    onlineNum: {
      type: [String, Number],
    },
    onlineRate: {
      type: [String, Number],
    },
  },
  methods: {
    init() {
      return new Promise((resolve, resJect) => {
        getBoardMap().then((res) => {
          console.log(res, this.name);
          if (res.code == "200") {
            this.nameList = [];
            this.numList = [];
            res.result.map((Element) => {
              let data = {
                name: Element.city || "",
                value: [Element.lon, Element.lat],
                num: Element.num || 0,
                province: Element.province,
              };
              this.nameList.push(data);
              if (this.provinceList.has(Element.province)) {
                let provinceDate = this.provinceList.get(Element.province);
                provinceDate.push(data);

                this.provinceList.set(Element.province, provinceDate);
              } else {
                let provinceDate = [data];
                this.provinceList.set(Element.province, provinceDate);
              }
            });
            this.numList = this.nameList.splice(0, 10);
            resolve(this.numList);
          }
        });
      });
    },
    getEchartsOne() {
      let chartDom = document.getElementById("map");
      console.log(chartDom);
      let myChart = echarts.init(chartDom);
      let option1 = {
        tooltip: {
          show: false,
        },
        geo: {
          map: "china",
          roam: false, // 一定要关闭拖拽
          zoom: 1.23,
          center: [105, 36], // 调整地图位置
          label: {
            normal: {
              show: false, //关闭省份名展示
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#0d0059",
              borderColor: "#389dff",
              borderWidth: 1, //设置外层边框
              shadowBlur: 5,
              shadowOffsetY: 8,
              shadowOffsetX: 0,
              shadowColor: "#01012a",
            },
            emphasis: {
              areaColor: "#184cff",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 5,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            roam: false,
            zoom: 1.23,
            center: [105, 36],
            // geoIndex: 1,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#0d0059",
                borderColor: "#389dff",
                borderWidth: 0.5,
              },
              emphasis: {
                areaColor: "#17008d",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option1 && myChart.setOption(option1);
      let that = this;
      
      myChart.off("click");
      myChart.on("click", function (chinaParam) {
        that.province = chinaParam.name;
        that.initImportFile(chinaParam.name);
        that.ischain = false;
         myChart.clear();
        setTimeout(() => {
          that.initChinaMap();
          console.log("渲染", chinaParam.name);
        }, 300);
      });
    },
    getEcharts() {
      let chartDom = document.getElementById("map");
      let myChart = echarts.init(chartDom);

      var option = {
        series: [
          {
            type: "map",
            map: "china",
            roam: false,
            zoom: 1.23,
            center: [105, 36],
            // geoIndex: 1,
            // aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#0d0059",
                borderColor: "#389dff",
                borderWidth: 0.5,
              },
              emphasis: {
                areaColor: "#17008d",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            name: "",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.nameList,
            //   symbolSize: function(val) {
            //     return val[2] / 10;
            //   },
            symbol: "circle",
            symbolSize: 8,
            hoverSymbolSize: 10,
            tooltip: {
              formatter(value) {
                return value.data.name + "<br/>" + "设备数：" + value.data.num;
              },
              show: true,
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            itemStyle: {
              color: "#0efacc",
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            zlevel: 2,
          },
          {
            name: "Top 10",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: this.numList,
            // symbolSize: 15,
            symbol: "circle",
            symbolSize: 8,
            hoverSymbolSize: 10,
            tooltip: {
              trigger: "item",

              show: false,
            },
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              color: "#0efacc",
              period: 9,
              scale: 5,
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: [10, 10],
              show: true,
            },
            itemStyle: {
              color: "#0efacc",
              shadowBlur: 2,
              shadowColor: "#333",
            },

            zlevel: 1,
          },
        ],
      };
      option && myChart.setOption(option);
    },
    initImportFile() {
      var filaName = {
        浙江: "zhejiang.js",
        安徽: "anhui.js",
        澳门: "aomen.js",
        北京: "beijing.js",
        重庆: "chongqing.js",
        福建: "fujian.js",
        甘肃: "gansu.js",
        广东: "guangdong.js",
        广西: "guangxi.js",
        贵州: "guizhou.js",
        海南: "hainan.js",
        河北: "hebei.js",
        黑龙江: "heilongjiang.js",
        河南: "henan.js",
        湖北: "hubei.js",
        湖南: "hunan.js",
        江苏: "jiangsu.js",
        江西: "jiangxi.js",
        吉林: "jilin.js",
        辽宁: "liaoning.js",
        内蒙古: "neimenggu.js",
        宁夏: "ningxia.js",
        青海: "qinghai.js",
        山东: "shandong.js",
        上海: "shanghai.js",
        山西: "shanxi.js",
        山西1: "shanxi1.js",
        四川: "sichuan.js",
        台湾: "taiwan.js",
        天津: "tianjin.js",
        香港: "xianggang.js",
        新疆: "xinjiang.js",
        西藏: "xizang.js",
        云南: "yunnan.js",
      };
      require(`echarts/map/js/province/${filaName[this.province]}`);
    },
    initChinaMap() {
      let option = {
        tooltip: {
          show: false,
        },
        geo: {
          map: this.province,
          roam: false,
          // zoom: 1.23,
          label: {
            normal: {
              show: false,
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#0d0059",
              borderColor: "#389dff",
              borderWidth: 1, //设置外层边框
              shadowBlur: 5,
              shadowOffsetY: 8,
              shadowOffsetX: 0,
              shadowColor: "#01012a",
            },
            emphasis: {
              areaColor: "#184cff",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 5,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        series: [
          {
            type: "map",
            map: this.province,
            roam: false,
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "#0d0059",
                borderColor: "#389dff",
                borderWidth: 0.5,
              },
              emphasis: {
                areaColor: "#17008d",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            name: "",
            type: "scatter",
            coordinateSystem: "geo",
            data: this.provinceName(this.province),
            //   symbolSize: function(val) {
            //     return val[2] / 10;
            //   },
            symbol: "circle",
            symbolSize: 8,
            hoverSymbolSize: 10,
            tooltip: {
              formatter(value) {
                return value.data.name + "<br/>" + "设备数：" + value.data.num;
              },
              show: true,
            },
            encode: {
              value: 2,
            },
            label: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            itemStyle: {
              color: "#0efacc",
            },
            emphasis: {
              label: {
                show: false,
              },
            },
          },
          {
            name: "Top 10",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: this.provinceTopName(this.province),
            symbolSize: 15,
            tooltip: {
              formatter(value) {
                return value.data.name + "<br/>" + "设备数：" + value.data.num;
              },
              show: true,
            },
            encode: {
              value: 2,
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              color: "#0efacc",
              period: 9,
              scale: 5,
            },
            hoverAnimation: true,
            label: {
              formatter: "{b}",
              position: "right",
              show: true,
            },
            itemStyle: {
              color: "#0efacc",
              shadowBlur: 2,
              shadowColor: "#333",
            },
            zlevel: 1,
          },
        ],
      };
      let chartDom = document.getElementById("mapmin");
      let myChart = echarts.init(chartDom);
      let that = this;
    
      myChart.off("click");
      myChart.on("click", function (chinaParam) {
        that.ischain = true;
          myChart.clear();
        setTimeout(() => {
        
          that.getEchartsOne();
          that.getEcharts();
          console.log("渲染中国");
        }, 100);
      });
      option && myChart.setOption(option);
    },
    // 省市输出
    provinceName(name) {
      console.log(name, "name");
      if (this.provinceList.has(name)) {
        return this.provinceList.get(name);
      } else if (this.provinceList.has(name + "省")) {
        return this.provinceList.get(name + "省");
      } else if (this.provinceList.has(name + "市")) {
        return this.provinceList.get(name + "市");
      } else {
        return [];
      }
    },
    // 省市排名城市输出
    provinceTopName(name) {
      let data = [];
      this.numList.map((res) => {
        if (
          res.province == name ||
          res.province == name + "省" ||
          res.province == name + "市"
        ) {
          data.push(res);
        }
      });
      return data;
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
    height: 500px;
    position: absolute;
    top: 50px;
  }
  .numBox {
    width: 90%;
    margin: 0px 5%;
    height: 50px;
    position: absolute;
    bottom: 10px;
    text-align: left;
    color: #fff;
    span {
      margin: 0 20px;
    }
  }
}
</style>