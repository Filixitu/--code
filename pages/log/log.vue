<template>
  <view class="container">
    <view class="intro">
      <image src="/static/images/customer-level/5.png"></image>
      <view class="tips">生命线</view>
    </view>
    <view class="bottom">
      <button type="primary" size="default" class="login-btn" @tap="onLogin">
        <image src="/static/images/mine/wechat.png"></image>
        微信授权登录
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const hasUserInfo = ref(false);
const userInfo = ref({
  avatarUrl: '',
  nickName: ''
});

const onLogin = async () => {

  wx.getUserProfile({
    desc: '获取用户信息',
    success: async (userProfileRes) => {
      try {
        const userInfoData = userProfileRes.userInfo;

        const loginRes = await new Promise((resolve, reject) => {
          wx.login({
            success: resolve,
            fail: reject
          });
        });

        if (loginRes.code) {
          const code = loginRes.code;

          const response = await new Promise((resolve, reject) => {
            uni.request({
              url: 'http://localhost:8080/api/login',
              method: 'POST',
              header: {
                'Content-Type': 'application/json'
              },
              data: JSON.stringify({
                code,
                userInfo: {
                  nickName: userInfo.nickName,
                  avatarUrl: userInfo.avatarUrl,
				  openid:userInfo.openid,
                }
              }),
              success: resolve,
              fail: reject
            });
          });

          console.log('服务器返回的用户信息:', response.data);

          if (response.statusCode === 200) {
            wx.setStorageSync('userInfo', response.data);
            userInfo.value = response.data;
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            });

            // 使用 navigateTo 并传递参数
			// 动态添加新的参数
			uni.setStorageSync('userInfo',userInfo) 
            wx.switchTab({
              url: `/pages/personal/personal`
            });
          } else {
            uni.showToast({
              title: '登录失败',
              icon: 'none'
            });
          }
        } else {
          console.log('登录失败！' + loginRes.errMsg);
          wx.showToast({
            title: '微信登录失败',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('请求失败:', error);
        wx.showToast({
          title: '请求失败，请稍后重试',
          icon: 'none'
        });
      }
    },
    fail: (error) => {
      console.error('获取用户信息失败:', error);
      wx.showToast({
        title: '获取用户信息失败',
        icon: 'none'
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.intro {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: $font-size-base;
  color: $text-color-assist;

  image {
    width: 200rpx;
    height: 200rpx;
  }

  .tips {
    line-height: 72rpx;
    text-align: center;
  }
}

.bottom {
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 40rpx;

  .login-btn {
    width: 100%;
    border-radius: 50rem !important;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10rpx 0;

    image {
      width: 36rpx;
      height: 30rpx;
      margin-right: 10rpx;
    }
  }
}
</style>
