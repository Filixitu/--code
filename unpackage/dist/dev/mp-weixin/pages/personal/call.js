"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  _easycom_u_button2();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
if (!Math) {
  _easycom_u_button();
}
const _sfc_main = {
  __name: "call",
  setup(__props) {
    const phones = common_vendor.ref([
      {
        name: "公安局",
        number: "110"
      },
      {
        name: "消防局",
        number: "119"
      },
      {
        name: "紧急联系人",
        number: "15756211743"
      },
      {
        name: "紧急联系人",
        number: "157211743"
      },
      {
        name: "紧急联系人",
        number: "157562143"
      },
      {
        name: "紧急联系人",
        number: "156211743"
      }
      // 更多号码...
    ]);
    const selectedPhone = common_vendor.ref(null);
    const call = common_vendor.ref({
      backgroundColor: "#9227e1",
      width: "675rpx",
      height: "140rpx",
      border: "none",
      color: "#FFFFFF",
      fontSize: "48rpx",
      fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
      fontWeight: "bold"
    });
    const selectPhone = (number) => {
      if (selectedPhone.value === number) {
        selectedPhone.value = null;
      } else {
        selectedPhone.value = number;
      }
    };
    const makeCall = () => {
      if (selectedPhone.value) {
        console.log("拨打电话:", selectedPhone.value);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(phones), (phone, index, i0) => {
          return {
            a: common_vendor.t(phone.name),
            b: common_vendor.t(phone.number),
            c: common_vendor.unref(selectedPhone) === phone.number ? "#f2f2f2" : "",
            d: index,
            e: common_vendor.n({
              "selected": common_vendor.unref(selectedPhone) === phone.number
            }),
            f: common_vendor.o(($event) => selectPhone(phone.number), index)
          };
        }),
        b: common_vendor.o(makeCall),
        c: common_vendor.p({
          shape: "circle",
          ripple: true,
          ["custom-style"]: common_vendor.unref(call)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8d376247"], ["__file", "E:/moanyan/dachuang/生命线/pages/personal/call.vue"]]);
wx.createPage(MiniProgramPage);
