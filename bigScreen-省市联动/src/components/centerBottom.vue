<template>
  <div class="box">
    <img src="../imager/border1 (5).png" style="width: 100%" alt="" />
    <div class="title">
      {{ name }}
    </div>
    <div id="getDayActive" class="echarts"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getDayActive } from "../API/api";
import dayjs from "dayjs"; // ES 2015
export default {
  data() {
    return {
      name: "日均活跃曲线",
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
        getDayActive().then((res) => {
          console.log(res,this.name)
          if (res.code == "200") {
            this.nameList = [];
            this.numList = [];
            res.result.map(ele=>{
              this.nameList.push( dayjs(ele.time).format("HH时")  ||'')
               this.numList.push(ele.num||0)
            })
   
            resolve(this.numList);
          }
        });
      });
    },
  
    
    getEcharts() {
      let chartDom = document.getElementById("getDayActive");
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    
  
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: this.nameList
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '活跃数量',
            type: 'line',
            stack: '总量',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#03C6E8'
                }, {
                    offset: 1,
                    color: '#25BF9D'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: this.numList
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
    width: 85%;
    margin: 0px 7%;
    height: 270px;
    position: absolute;
    top: 20px;
  }
}
</style>