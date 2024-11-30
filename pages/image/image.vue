<template>
  <view class="checkdiv">
    <view class="icon-container">
      <img :src="isActive1 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon1" />
      <view class="icontext">
        <text>地震</text>
      </view>
      <img :src="isActive2 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon2" />
      <view class="icontext">
        <text>滑坡</text>
      </view>
      <img :src="isActive3 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon3" />
      <view class="icontext">
        <text>火灾</text>
      </view>
      <img :src="isActive4 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon4" />
      <view class="icontext">
        <text>洪水</text>
      </view>
      <img :src="isActive5 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon5" />
      <view class="icontext">
        <text>所有灾害</text>
      </view>
    </view>
  </view>

  <!-- 第一幅图 -->
  <view class="chart-container">
    <view class="chart-title">分年灾害数量统计</view>
    <view class="charts-box">
      <qiun-data-charts
        type="line"
        :opts="opts"
        :chartData="chartData"
        :ontouch="true"
      />
    </view>
  </view>

  <!-- 第二幅图 -->
  <view class="chart-container-1">
    <view class="chart-title-1">分省灾害数量统计</view>
    <view class="charts-box-1">
      <qiun-data-charts type="column" :chartData="chartDataProvince" />
    </view>
  </view>
  
  <view>
    <u-subsection :list="list" v-model="current" class="sub" mode="button" active-color="#9227e1" bg-color="#ededed"></u-subsection>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartData = ref({});
const chartDataProvince = ref({}); // 第二幅图的数据源

const opts = {
  color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
  padding: [15,10,0,15],
  enableScroll: true,
  legend: {},
  xAxis: {
    disableGrid: true,
    scrollShow: true,
    itemCount: 4
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2
  },
  extra: {
    line: {
      type: "straight",
      width: 2,
      activeType: "hollow"
    }
  }
};

const activeIcon = '/static/img/圆形选中.png';
const inactiveIcon = '/static/img/圆形未选中.png';

const isActive1 = ref(false);
const isActive2 = ref(false);
const isActive3 = ref(false);
const isActive4 = ref(false);
const isActive5 = ref(false);

const toggleIcon1 = () => { isActive1.value = !isActive1.value; };
const toggleIcon2 = () => { isActive2.value = !isActive2.value; };
const toggleIcon3 = () => { isActive3.value = !isActive3.value; };
const toggleIcon4 = () => { isActive4.value = !isActive4.value; };
const toggleIcon5 = () => { isActive5.value = !isActive5.value; };

const list = ref([
  { name: '折线图' },
  { name: '饼状图' },
  { name: '柱状图' },
]);
const current = ref(0);

const getServerData = () => {
  setTimeout(() => {
    // 第一幅图数据
    let res1 = {
      categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
      series: [
        { name: "目标值", data: [35, 36, 31, 33, 13, 34] },
        { name: "完成量", data: [18, 27, 21, 24, 6, 28] }
      ],
    };
    chartData.value = JSON.parse(JSON.stringify(res1));

    // 第二幅图数据
    let res2 = {
      categories: ["北京", "上海", "广东", "四川", "云南"],
      series: [
        { name: "灾害数量", data: [45, 30, 50, 60, 70] },
      ],
    };
    chartDataProvince.value = JSON.parse(JSON.stringify(res2));
  }, 500);
};

onMounted(() => {
  getServerData();
});
</script>

<style scoped>
  .checkdiv {
    width: 95%;
    height: 65rpx;
    position: fixed;
    top: 30rpx;
    left: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    z-index: 999;
    background-color: #ecf5ff;
    border-radius: 15rpx;
    border: 2px solid #9227e1;
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon-image {
    width: 22px;
    height: 22px;
    margin-right: 8rpx;
  }
  .icontext {
    margin-right: 20rpx;
  }
  .chart-container {
    width: 95%;
    height: 520rpx;
    display: flex;
    margin-left: 20rpx;
    margin-top: 130rpx;
    flex-direction: column;
    align-items: center;
    border: 2px solid #9227e1;
    border-radius: 10px;
  }
  .chart-title {
    width: 100%;
    height: 70rpx;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    padding-left: 20rpx;
    line-height: 60rpx;
    color: #333;
    background-color: #e9e9e9;
    border-radius: 10px;
  }
  .charts-box {
    top: 100rpx;
    width: 100%;
    height: 250px;
  }
  .chart-container-1 {
    width: 95%;
    height: 520rpx;
    display: flex;
    margin-left: 20rpx;
    margin-top: 40rpx;
    flex-direction: column;
    align-items: center;
    border: 2px solid #9227e1;
    border-radius: 10px;
  }
  .chart-title-1 {
    width: 100%;
    height: 70rpx;
    font-size: 15px;
    text-align: center;
    font-weight: bold;
    padding-left: 20rpx;
    line-height: 60rpx;
    color: #333;
    background-color: #e9e9e9;
    border-radius: 10px;
  }
  .charts-box-1 {
    top: 110rpx;
    width: 100%;
    height: 250px;
  }
  
  .sub {
    position: fixed;
    bottom: 20rpx;
	left: 430rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>