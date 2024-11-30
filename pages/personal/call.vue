<template>
	<view>
		<view>
			<text class="sentence">"如果你处在危险之中，请保持冷静"</text>
		</view>
		<view class="calltextdiv">
			<text class="calltext">选择号码以呼叫求助</text>
		</view>
		<view class="phonedivs">
		        <view v-for="(phone, index) in phones" :key="index"
		              :class="['phonediv', { 'selected': selectedPhone === phone.number }]"
		              @tap="selectPhone(phone.number)">
		            <text class="phonename">{{ phone.name }}</text>
		            <text class="phonenum" :style="{ color: selectedPhone === phone.number ? '#f2f2f2' : '' }">{{ phone.number }}</text>
		        </view>
		    </view>
		<view>
			<u-button shape="circle" :ripple="true" :custom-style="call" @tap="makeCall">
				<image src="/static/img/phone-call.png" class="btn-icon" />呼叫求助
			</u-button>
		</view>
	</view>
</template>


<script setup>
const phones = ref([{
        name: '公安局',
        number: '110'
    },
    {
        name: '消防局',
        number: '119'
    },
    {
        name: '紧急联系人',
        number: '15756211743'
    },
	{
		name: '紧急联系人',
		number: '157211743'
	},
	{
		name: '紧急联系人',
		number: '157562143'
	},
	{
		name: '紧急联系人',
		number: '156211743'
	},
    // 更多号码...
]);
const selectedPhone = ref(null); // 存储选中的电话号码
const call = ref({
    backgroundColor: '#9227e1',
    width: '675rpx',
    height: '140rpx',
    border: 'none',
    color: '#FFFFFF',
    fontSize: '48rpx',
    fontFamily: "Microsoft YaHei, 微软雅黑, SimHei, 黑体",
    fontWeight: 'bold',
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
        console.log('拨打电话:', selectedPhone.value);
        // 实现拨打电话功能
    }
};
</script>
	
<style lang="scss" scoped>
	.sentence {
		width: 675rpx;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		margin-left: 37rpx;
		background-color: #9227e1;
		font-weight: bold;
		font-size: 36rpx;
		color: aliceblue;
		border-radius: 30rpx;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		font-family: " Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
	}

	.calltextdiv {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 30rpx;
		margin-left: 70rpx;

		.calltext {
			font-weight: bold;
			font-size: 32rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}

	.phonedivs {
		width: 675rpx;
		height: 860rpx;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;
		margin-left: 37rpx;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
		background-color: #ededed;
		border-radius: 30rpx;
		box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;

		.phonediv {
			background-color: #fff;
			width: 615rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin-top: 30rpx;
			margin-left: 30rpx;
			border-radius: 20rpx;
			&.selected {
				background-color: #ffba37; // 选中时的背景颜色
			}
			.phonename {
				width: 300rpx;
				height: 110rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: bold;
				font-size: 32rpx;
				color: aliceblue;
				font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
				background-color: #9227e1;
				border-radius: 20rpx;
			}

			.phonenum {
				font-weight: bold;
				font-size: 40rpx;
				font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
				width: 360rpx;
				margin-left: 40rpx;
			}
		}
	}

	.btn-icon {
		width: 60rpx; // 调整为合适的大小
		height: 60rpx; // 调整为合适的大小
		margin-right: 80rpx; // 如果需要在图标和文字之间添加间距
	}
</style>