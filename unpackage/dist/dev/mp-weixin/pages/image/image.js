"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  (_easycom_qiun_data_charts2 + _easycom_u_subsection2)();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
const _easycom_u_subsection = () => "../../uni_modules/vk-uview-ui/components/u-subsection/u-subsection.js";
if (!Math) {
  (_easycom_qiun_data_charts + _easycom_u_subsection)();
}
const _sfc_main = {
  __name: "image",
  setup(__props) {
    const chartData = common_vendor.ref({});
    const chartDataProvince = common_vendor.ref({});
    const opts = {
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [15, 10, 0, 15],
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
    const activeIcon = "/static/img/圆形选中.png";
    const inactiveIcon = "/static/img/圆形未选中.png";
    const isActive1 = common_vendor.ref(false);
    const isActive2 = common_vendor.ref(false);
    const isActive3 = common_vendor.ref(false);
    const isActive4 = common_vendor.ref(false);
    const isActive5 = common_vendor.ref(false);
    const toggleIcon1 = () => {
      isActive1.value = !isActive1.value;
    };
    const toggleIcon2 = () => {
      isActive2.value = !isActive2.value;
    };
    const toggleIcon3 = () => {
      isActive3.value = !isActive3.value;
    };
    const toggleIcon4 = () => {
      isActive4.value = !isActive4.value;
    };
    const toggleIcon5 = () => {
      isActive5.value = !isActive5.value;
    };
    const list = common_vendor.ref([
      { name: "折线图" },
      { name: "饼状图" },
      { name: "柱状图" }
    ]);
    const current = common_vendor.ref(0);
    const getServerData = () => {
      setTimeout(() => {
        let res1 = {
          categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
          series: [
            { name: "目标值", data: [35, 36, 31, 33, 13, 34] },
            { name: "完成量", data: [18, 27, 21, 24, 6, 28] }
          ]
        };
        chartData.value = JSON.parse(JSON.stringify(res1));
        let res2 = {
          categories: ["北京", "上海", "广东", "四川", "云南"],
          series: [
            { name: "灾害数量", data: [45, 30, 50, 60, 70] }
          ]
        };
        chartDataProvince.value = JSON.parse(JSON.stringify(res2));
      }, 500);
    };
    common_vendor.onMounted(() => {
      getServerData();
    });
    return (_ctx, _cache) => {
      return {
        a: isActive1.value ? activeIcon : inactiveIcon,
        b: common_vendor.o(toggleIcon1),
        c: isActive2.value ? activeIcon : inactiveIcon,
        d: common_vendor.o(toggleIcon2),
        e: isActive3.value ? activeIcon : inactiveIcon,
        f: common_vendor.o(toggleIcon3),
        g: isActive4.value ? activeIcon : inactiveIcon,
        h: common_vendor.o(toggleIcon4),
        i: isActive5.value ? activeIcon : inactiveIcon,
        j: common_vendor.o(toggleIcon5),
        k: common_vendor.p({
          type: "line",
          opts,
          chartData: chartData.value,
          ontouch: true
        }),
        l: common_vendor.p({
          type: "column",
          chartData: chartDataProvince.value
        }),
        m: common_vendor.o(($event) => current.value = $event),
        n: common_vendor.p({
          list: list.value,
          mode: "button",
          ["active-color"]: "#9227e1",
          ["bg-color"]: "#ededed",
          modelValue: current.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fa36ddbe"], ["__file", "E:/moanyan/dachuang/生命线/pages/image/image.vue"]]);
wx.createPage(MiniProgramPage);
