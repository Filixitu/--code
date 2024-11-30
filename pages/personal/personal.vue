<template>
    <view class="page">
        <!-- 头像点击更换 -->
        <view class="imgdiv">
            <image class="img" :src="avatarUrl"></image>
        </view>
        <!-- 昵称显示与编辑 -->
        <view class="namediv">
            <view class="name">
                {{ nickname }}
                <image src="/static/img/nickname.png" class="edit-icon" @tap="editNickname"/>
            </view>
        </view>
        <!-- 其他UI元素保持不变 -->
        <view class="btndiv">
            <u-button shape="circle" :ripple="true" :custom-style="callbtn" @click="callpage">
                <image src="/static/img/phone-call.png" class="btn-icon" />呼叫求助
            </u-button>
        </view>
        <view>
            <view class="alarmdiv">
                <text class="alarm">紧急警报</text>
            </view>
            <view class="infdiv">
                <text class="inf">启用通知</text>
                <u-switch v-model="checked" active-color="#9227e1"></u-switch>
            </view>
        </view>
        <view>
            <view class="sharetextdiv">
                <text class="sharetext">分享小程序</text>
            </view>
            <view class="sharediv">
                <text class="share">分享至微信好友</text>
                <u-button shape="circle" :ripple="true" :custom-style="sharebtn" open-type="share">分享</u-button>
            </view>
        </view>

        <!-- 弹出框用于编辑昵称 -->
        <u-popup v-model="showPopup" mode="center" border-radius="30">
            <view class="pop">
                <input class="edit-text" v-model="newNickname"/>
                <view class="close">
                    <u-button :ripple="true" :custom-style="closebtn" shape="round" @click="saveNickname">修改</u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	// 定义所有的 ref 对象
	const avatarUrl = ref('');
	const nickname = ref('');
	const openid = ref('');
	const newNickname = ref('');
	const showPopup = ref(false);
	const checked = ref(false);
	
	
	// 从本地存储中获取用户信息
	const userInfo = uni.getStorageSync('userInfo');
	
	if (userInfo) {
		console.log(userInfo)
	    avatarUrl.value = userInfo._rawValue.userInfo.avatarUrl;
	    nickname.value = userInfo._rawValue.userInfo.nickName;
		openid.value = userInfo._rawValue.userInfo.openid;
	}

    // 按钮样式
    const callbtn = ref({
        backgroundColor: '#9227e1',
        width: '600rpx',
        height: '200rpx',
        border: 'none',
        color: '#FFFFFF',
        fontSize: '64rpx',
        fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
        fontWeight: 'bold',
    });

    const closebtn = ref({
        backgroundColor: '#9227e1',
        border: 'none',
        color: '#FFFFFF',
        fontSize: '30rpx',
        fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
        fontWeight: 'bold',
    })

    const sharebtn = ref({
        backgroundColor: '#9227e1',
        width: '150rpx',
        height: '60rpx',
        fontSize: '25rpx',
        color: '#fff',
        fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
        fontWeight: 'bold',
    });

    // 页面跳转逻辑
    const callpage = () => {
        uni.navigateTo({
            url: '/pages/personal/call'
        });
    };

    // 编辑昵称
    const editNickname = () => {
        showPopup.value = true;
    };
    
    const saveNickname = async () => {
        console.log('OpenID:', openid.value);
        console.log('New Nickname:', newNickname.value);
    
        if (openid.value) {
            try {
                const response = await new Promise((resolve, reject) => {
                    uni.request({
                        url: 'http://localhost:8080/api/nickname/update', // 确保地址正确
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            openid: openid.value,
                            nickname: newNickname.value
                        }),
                        success: (response) => {
                            if (response.statusCode === 200) {
                                resolve(response.data);
                            } else {
                                reject(new Error('网络响应错误: ' + response.statusCode));
                            }
                        },
                        fail: (error) => {
                            reject(error);
                        }
                    });
                });
    
                console.log('昵称更新成功:', response);
                nickname.value = newNickname.value; // 更新昵称显示
                showPopup.value = false;
            } catch (error) {
                console.error('更新昵称时出错:', error);
            }
        } else {
            console.error('无法获取 openid');
        }
    };



    
</script>

<style lang="scss" scoped>
	.page {
		background-color: #ffffff; // 设置页面背景颜色
		width: 100vw;
		height: 100vh;
	}
	.pop{
		width: 400rpx;
		height: auto;
		overflow: hidden; 
		.edit-text{
			height: 80rpx;
			border: 1rpx solid #9227e1;
			border-radius: 15rpx;
			margin-top: 50rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 30rpx;
			padding-left: 20rpx;
		}
		.close{
			width: 340rpx;
			margin-left: 30rpx;
			border-radius: 20rpx;
			margin-bottom: 40rpx;
		}
	}
	.imgdiv {
		display: flex;             // 使用flex布局
		align-items: center;       // 垂直居中
		justify-content: center;   // 水平居中
		.img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%; 
			margin-top: 100rpx;         // 仅在图片上下移25rpx
			box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		}
	}
	.namediv{
		display: flex;             // 使用flex布局
		align-items: center;       // 垂直居中
		justify-content: center;   // 水平居中
		.name{
			margin-top: 40rpx;
			font-size: 64rpx; 
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
			font-weight: bold;
			.edit-icon{
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	.btndiv{
	        display: flex;
	        align-items: center;
	        justify-content: center;
	        margin-top: 80rpx;
			.btn-icon {
			    width: 80rpx;  // 调整为合适的大小
			    height: 80rpx; // 调整为合适的大小
			    margin-right: 60rpx; // 如果需要在图标和文字之间添加间距
			}
	    }
	.alarmdiv{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 60rpx;
		margin-left: 70rpx;
		.alarm{
			font-weight: bold;
			font-size: 32rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}
	.infdiv{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%; // 根据需要调整
		background-color: #ededed; 
		padding: 10px 20px; // 内边距，根据需要调整
		border-radius: 20px; // 
		margin-left: 37rpx;
		margin-top: 20rpx;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		.inf{
			font-size: 16px;
			font-weight: bold;
			
		}  
	}
	.sharetextdiv{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 60rpx;
		margin-left: 70rpx;
		.sharetext{
			font-weight: bold;
			font-size: 32rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}
	.sharediv{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%; // 根据需要调整
		background-color: #ededed; 
		padding: 10px 20px; // 内边距，根据需要调整
		border-radius: 20px; // 
		margin-left: 37rpx;
		margin-top: 20rpx;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		.share{
			font-size: 16px;
			font-weight: bold;
			
		}  
	}
</style>