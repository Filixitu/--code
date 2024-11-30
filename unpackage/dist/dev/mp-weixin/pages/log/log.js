"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "log",
  setup(__props) {
    common_vendor.ref(false);
    const userInfo = common_vendor.ref({
      avatarUrl: "",
      nickName: ""
    });
    const onLogin = async () => {
      common_vendor.wx$1.getUserProfile({
        desc: "获取用户信息",
        success: async (userProfileRes) => {
          try {
            const userInfoData = userProfileRes.userInfo;
            const loginRes = await new Promise((resolve, reject) => {
              common_vendor.wx$1.login({
                success: resolve,
                fail: reject
              });
            });
            if (loginRes.code) {
              const code = loginRes.code;
              const response = await new Promise((resolve, reject) => {
                common_vendor.index.request({
                  url: "http://localhost:8080/api/login",
                  method: "POST",
                  header: {
                    "Content-Type": "application/json"
                  },
                  data: JSON.stringify({
                    code,
                    userInfo: {
                      nickName: userInfo.nickName,
                      avatarUrl: userInfo.avatarUrl,
                      openid: userInfo.openid
                    }
                  }),
                  success: resolve,
                  fail: reject
                });
              });
              console.log("服务器返回的用户信息:", response.data);
              if (response.statusCode === 200) {
                common_vendor.wx$1.setStorageSync("userInfo", response.data);
                userInfo.value = response.data;
                common_vendor.index.showToast({
                  title: "登录成功",
                  icon: "success"
                });
                common_vendor.index.setStorageSync("userInfo", userInfo);
                common_vendor.wx$1.switchTab({
                  url: `/pages/personal/personal`
                });
              } else {
                common_vendor.index.showToast({
                  title: "登录失败",
                  icon: "none"
                });
              }
            } else {
              console.log("登录失败！" + loginRes.errMsg);
              common_vendor.wx$1.showToast({
                title: "微信登录失败",
                icon: "none"
              });
            }
          } catch (error) {
            console.error("请求失败:", error);
            common_vendor.wx$1.showToast({
              title: "请求失败，请稍后重试",
              icon: "none"
            });
          }
        },
        fail: (error) => {
          console.error("获取用户信息失败:", error);
          common_vendor.wx$1.showToast({
            title: "获取用户信息失败",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-58ca02d5"], ["__file", "E:/moanyan/dachuang/生命线/pages/log/log.vue"]]);
wx.createPage(MiniProgramPage);
