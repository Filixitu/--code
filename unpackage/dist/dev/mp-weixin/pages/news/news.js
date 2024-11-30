"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_tabs2 = common_vendor.resolveComponent("u-tabs");
  const _easycom_u_sticky2 = common_vendor.resolveComponent("u-sticky");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_tabs2 + _easycom_u_sticky2 + _easycom_u_icon2)();
}
const _easycom_u_tabs = () => "../../uni_modules/vk-uview-ui/components/u-tabs/u-tabs.js";
const _easycom_u_sticky = () => "../../uni_modules/vk-uview-ui/components/u-sticky/u-sticky.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_tabs + _easycom_u_sticky + _easycom_u_icon)();
}
const _sfc_main = {
  __name: "news",
  setup(__props) {
    const list = common_vendor.ref([
      { cate_name: "地震" },
      { cate_name: "泥石流" },
      { cate_name: "山体滑坡" },
      { cate_name: "森林火灾" },
      { cate_name: "洪水" }
      // Add more categories as needed
    ]);
    const current = common_vendor.ref(0);
    const change = (index) => {
      console.log("index", index);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(change),
        b: common_vendor.o(($event) => common_vendor.isRef(current) ? current.value = $event : null),
        c: common_vendor.p({
          ["active-color"]: "#9227e1",
          name: "cate_name",
          count: "cate_count",
          list: common_vendor.unref(list),
          ["is-scroll"]: false,
          modelValue: common_vendor.unref(current)
        }),
        d: common_vendor.unref(current) === 0
      }, common_vendor.unref(current) === 0 ? {
        e: common_vendor.p({
          name: "question-circle",
          size: "40"
        })
      } : {}, {
        f: common_vendor.unref(current) === 1
      }, common_vendor.unref(current) === 1 ? {
        g: common_vendor.p({
          name: "question-circle",
          size: "40"
        })
      } : {}, {
        h: common_vendor.unref(current) === 2
      }, common_vendor.unref(current) === 2 ? {
        i: common_vendor.p({
          name: "question-circle",
          size: "40"
        })
      } : {}, {
        j: common_vendor.unref(current) === 3
      }, common_vendor.unref(current) === 3 ? {
        k: common_vendor.p({
          name: "question-circle",
          size: "40"
        })
      } : {}, {
        l: common_vendor.unref(current) === 4
      }, common_vendor.unref(current) === 4 ? {
        m: common_vendor.p({
          name: "question-circle",
          size: "40"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-24bc9d41"], ["__file", "E:/moanyan/dachuang/生命线/pages/news/news.vue"]]);
wx.createPage(MiniProgramPage);
