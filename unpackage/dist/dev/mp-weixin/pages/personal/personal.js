"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_switch2 = common_vendor.resolveComponent("u-switch");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_button2 + _easycom_u_switch2 + _easycom_u_popup2)();
}
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_switch = () => "../../uni_modules/vk-uview-ui/components/u-switch/u-switch.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_switch + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "personal",
  setup(__props) {
    const avatarUrl = common_vendor.ref("");
    const nickname = common_vendor.ref("");
    const openid = common_vendor.ref("");
    const newNickname = common_vendor.ref("");
    const showPopup = common_vendor.ref(false);
    const checked = common_vendor.ref(false);
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo) {
      console.log(userInfo);
      avatarUrl.value = userInfo._rawValue.userInfo.avatarUrl;
      nickname.value = userInfo._rawValue.userInfo.nickName;
      openid.value = userInfo._rawValue.userInfo.openid;
    }
    const callbtn = common_vendor.ref({
      backgroundColor: "#9227e1",
      width: "600rpx",
      height: "200rpx",
      border: "none",
      color: "#FFFFFF",
      fontSize: "64rpx",
      fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
      fontWeight: "bold"
    });
    const closebtn = common_vendor.ref({
      backgroundColor: "#9227e1",
      border: "none",
      color: "#FFFFFF",
      fontSize: "30rpx",
      fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
      fontWeight: "bold"
    });
    const sharebtn = common_vendor.ref({
      backgroundColor: "#9227e1",
      width: "150rpx",
      height: "60rpx",
      fontSize: "25rpx",
      color: "#fff",
      fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
      fontWeight: "bold"
    });
    const callpage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personal/call"
      });
    };
    const editNickname = () => {
      showPopup.value = true;
    };
    const saveNickname = async () => {
      console.log("OpenID:", openid.value);
      console.log("New Nickname:", newNickname.value);
      if (openid.value) {
        try {
          const response = await new Promise((resolve, reject) => {
            common_vendor.index.request({
              url: "http://localhost:8080/api/nickname/update",
              // 确保地址正确
              method: "POST",
              header: {
                "Content-Type": "application/json"
              },
              data: JSON.stringify({
                openid: openid.value,
                nickname: newNickname.value
              }),
              success: (response2) => {
                if (response2.statusCode === 200) {
                  resolve(response2.data);
                } else {
                  reject(new Error("网络响应错误: " + response2.statusCode));
                }
              },
              fail: (error) => {
                reject(error);
              }
            });
          });
          console.log("昵称更新成功:", response);
          nickname.value = newNickname.value;
          showPopup.value = false;
        } catch (error) {
          console.error("更新昵称时出错:", error);
        }
      } else {
        console.error("无法获取 openid");
      }
    };
    return (_ctx, _cache) => {
      return {
        a: avatarUrl.value,
        b: common_vendor.t(nickname.value),
        c: common_vendor.o(editNickname),
        d: common_vendor.o(callpage),
        e: common_vendor.p({
          shape: "circle",
          ripple: true,
          ["custom-style"]: callbtn.value
        }),
        f: common_vendor.o(($event) => checked.value = $event),
        g: common_vendor.p({
          ["active-color"]: "#9227e1",
          modelValue: checked.value
        }),
        h: common_vendor.p({
          shape: "circle",
          ripple: true,
          ["custom-style"]: sharebtn.value,
          ["open-type"]: "share"
        }),
        i: newNickname.value,
        j: common_vendor.o(($event) => newNickname.value = $event.detail.value),
        k: common_vendor.o(saveNickname),
        l: common_vendor.p({
          ripple: true,
          ["custom-style"]: closebtn.value,
          shape: "round"
        }),
        m: common_vendor.o(($event) => showPopup.value = $event),
        n: common_vendor.p({
          mode: "center",
          ["border-radius"]: "30",
          modelValue: showPopup.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6ae23533"], ["__file", "E:/moanyan/dachuang/生命线/pages/personal/personal.vue"]]);
wx.createPage(MiniProgramPage);
