"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      checkboxValue1: [],
      // 基本案列数据
      checkboxList1: [
        {
          name: "苹果",
          disabled: false
        },
        {
          name: "香蕉",
          disabled: false
        },
        {
          name: "橙子",
          disabled: false
        }
      ]
    };
  },
  methods: {
    checkboxChange(n) {
      console.log("change", n);
    }
  }
};
if (!Array) {
  const _easycom_u_checkbox2 = common_vendor.resolveComponent("u-checkbox");
  const _easycom_u_checkbox_group2 = common_vendor.resolveComponent("u-checkbox-group");
  (_easycom_u_checkbox2 + _easycom_u_checkbox_group2)();
}
const _easycom_u_checkbox = () => "../../uni_modules/vk-uview-ui/components/u-checkbox/u-checkbox.js";
const _easycom_u_checkbox_group = () => "../../uni_modules/vk-uview-ui/components/u-checkbox-group/u-checkbox-group.js";
if (!Math) {
  (_easycom_u_checkbox + _easycom_u_checkbox_group)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.checkboxList1, (item, index, i0) => {
      return {
        a: index,
        b: "794d37c2-1-" + i0 + ",794d37c2-0",
        c: common_vendor.p({
          customStyle: {
            marginBottom: "8px"
          },
          label: item.name,
          name: item.name
        })
      };
    }),
    b: common_vendor.o($options.checkboxChange),
    c: common_vendor.o(($event) => $data.checkboxValue1 = $event),
    d: common_vendor.p({
      placement: "column",
      modelValue: $data.checkboxValue1
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/moanyan/dachuang/生命线/pages/text/text.vue"]]);
wx.createPage(MiniProgramPage);
