<template>
  <div class="box">
    <img src="../imager/border1 (3).png" style="width: 100%" alt="" />
    <div class="title">
      {{ name }}
    </div>
    <div class="toDaymin">
      <div class="imgbox">
        <img src="../imager/bg7.png" alt="" />
        <div class="titleBox">
          <p class="name">sos警告</p>
          <div class="num">
            <div v-for="(item, index) in stringList(sosWarnNum)" :key="index">
              <span>{{ item }}</span>
            </div>
          </div>
          <p class="dawei">条</p>
        </div>
      </div>
      <div class="imgbox">
        <img src="../imager/bg7.png" alt="" />
        <div class="titleBox">
          <p class="name">围栏警告</p>
          <div class="num">
            <div v-for="(item, index) in stringList(fenceWarnNum)" :key="index">
              <span>{{ item }}</span>
            </div>
          </div>
          <p class="dawei">条</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getBoardMap } from "../API/api";
export default {
  data() {
    return {
      name: "今日动态",
    };
  },
  props: {
    sosWarnNum: {
      type: [String, Number],
    },
    fenceWarnNum: {
      type: [String, Number],
    },
  },
  mounted() {},
  created() {
    // this.init()
  },
  watch: {},
  methods: {
    stringList(num) {
      num = num.toString();
      let list = [];
      for (let i = 0; i < num.length; i++) {
        list.push(num[i]);
      }
      if (list.length > 6) {
        return [9, 9, 9, 9, 9, 9];
      } else {
        return list;
      }
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
    .imgbox {
      position: relative;
      width: 90%;
      margin: 5px 5%;
      img {
        width: 100%;
      }
      .titleBox {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 100px;
        .name {
          width: 25%;
          color: #fff;
          font-size: 20px;
          font-weight: 500;
          line-height: 75px;
        }
        .num {
          width: 330px;
          color: #fff;
          line-height: 60px;
          text-align: right;
          line-height: 60px;
          padding: 10px 0px 0 0px;
          div {
            padding: 0 5px;
            background-color: #0d192c;
            color: #fff;
            border-radius: 5px;
            height: 60px;
            font-size: 34px;
            font-weight: 600;
            margin: 5px 5px;
            text-align: center;
            width: 30px;
            display: inline-block;
            font-family: AgencyFB;
            font-weight: bold;
            span {
              background: linear-gradient(0deg, #388ea7 0%, #ffffff 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }
        .dawei {
          width: 10%;
          color: #00eaff;
          font-size: 20px;
          font-weight: 500;
          line-height: 75px;
        }
      }
    }
  }
}
</style>