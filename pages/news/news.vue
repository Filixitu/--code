<template>
	<view>
		<u-sticky>
			<u-tabs active-color="#9227e1" name="cate_name" count="cate_count" :list="list" :is-scroll="false"
				v-model="current" @change="change"></u-tabs>
		</u-sticky>
		<view v-if="current === 0">
			<view class="titlediv">
				<text class="title">地震</text>
				<text class="intr">地壳快速释能量过程中造成振动\n期间会产生地震波的一种自然现象</text>
			</view>
			<view class="texttitlediv1">
				<u-icon name="question-circle" size="40"></u-icon>
				<text class="texttilte1">地震避灾小知识</text>
			</view>
			<view class="textdiv">
				<text class="textindex">01 室内</text>
				<text class="textcon">
					1. 就近躲避，震后迅速撤离
					\n2. 选择结实、能掩护身体的物体
					\n3. 室外开阔、安全的地方
					\n4. 身体应采取的姿势：伏而待定，蹲下或坐下，尽量蜷曲身体，降低身体重心
					\n5. 抓住桌腿等牢固的物体
					\n6. 保护头颈、眼睛，掩住口鼻
					\n7. 避开人流，不要随便点明火，空气中可能有易燃易爆气体
				</text>
				<text class="textindex">02 室外</text>
				<text class="textcon">
					1. 就开阔地，趴下或蹲下避震，保护头部。
					\n2. 不要乱跑，避开人多的地方;
					\n3. 要远离山崖、陡坡、河岸及高压线等。
					\n4. 避开高大建筑物或构筑物：楼房，过街桥、立交桥，高烟囱、水塔下。
					\n5. 避开高悬挂物：变压器、电线杆、路灯、广告牌、吊车等。
					\n6. 避开危险场所：狭窄的街道、危旧房屋、危墙
				</text>
				<text class="textindex">03 震后自救</text>
				<text class="textcon">
					<text style="font-weight: bold; margin-left: 2em; ">
						地震后，往往还有多次余震发生，处境可能继续恶化，为了免遭新的伤害，要尽量改善自己所处环境。
					</text>
					\n1.
					保护呼吸畅通，挪开头部、胸部的杂物，闻到煤气、毒气时，用湿衣服等物捂住口、鼻；避开身体上方不结实的倒塌物和其它容易引起掉落的物体；扩大和稳定生存空间，用砖块、术棍等支撑残垣断壁，以防余震发生后，环境进一步恶化。
					\n2. 尽量保存体力，用石块敲击能发出声响的物体，向外发出呼救信号，不要哭喊、急躁和盲目行动，这样会大量消耗精力和体力，尽可能控制自己的情绪或闭目休息，
					等待救援人员到来。如果受伤，要想法包扎，避免流血过多。
					\n3. 如果被埋在废墟下的时间比较长，救援人员未到，或者没有听到呼救信号，就要想办法维持自己的生命，防震包的水和食品一定要节约，尽量寻找食品和饮用水，必要时自己的尿液也能起到解渴作用。
					\n4. 如果你在三脚架区，可以利用旁边的东西来护住自己，以免余震再次把自己伤害，再把手和前胸伸出来，把脸前的碎石子清理干净，让自己可以呼吸，等人救援.
				</text>
				<text class="textindex">04 震后互救</text>
				<text class="textcon">
					<text style="font-weight: bold; margin-left: 2em; ">
						震后20分钟获救的救活率达98%以上，震后一小时获救的救活率下降到63%，震后2小时还无法获救的人员中，窒息死亡人数占死亡人数的58%。
					</text>
					\n1. 注意倾听被困者的呼喊、呻吟或敲击声，根据建筑结构的特点，先确定被位置，特别是头部的位置，再开挖抢救，避免损伤。
					\n2. 先抢救容易获救的被困者。
					\n3. 抢救时，要先使被救者头部暴露出来，并迅速清除其口鼻内的灰土，防止窒息，进而暴露其胸腹部。
					\n4. 对于埋压时间较长的幸存者，要先喂些含盐饮料，但不可给予高糖类饮食。然后边挖边支撑，注意保护被救者的头部和眼睛。
					\n5. 对怀疑有骨折或颈椎、腰椎受伤的被救者，抢救时一定不可强拉硬拖，避免二次损伤，要设法暴露其全身。
				</text>
			</view>
			<text>
				\n
			</text>
		</view>
		<view v-if="current === 1">
			<view class="titlediv">
				<text class="title">泥石流</text>
				<text class="intr">由降水引发的沟谷或山坡洪流\n携带大量泥砂和石块</text>
			</view>
			<view class="texttitlediv2">
				<u-icon name="question-circle" size="40"></u-icon>
				<text class="texttilte2">泥石流避灾小知识</text>
			</view>
			<view class="textdiv">
				<text style="margin-top: 40rpx; font-weight: bold; margin-left: 2em; ">
					泥石流具有突发性强、影响面积广和破坏力大等特点。
				</text>
				<text class="textindex">01 预防</text>
				<text class="textcon">
					1. 远离山崖、陡坡、河岸及高压线等。
					\n2. 避开高大建筑物或构筑物：楼房，过街桥、立交桥，高烟囱、水塔下。
					\n3. 避开高悬挂物：变压器、电线杆、路灯、广告牌、吊车等。
					\n4. 避开危险场所：狭窄的街道、危旧房屋、危墙
				</text>
				<text class="textindex">02 避灾</text>
				<text class="textcon">
					1. 不能沿沟向下或向上跑，而应向两侧山坡上跑，离开沟道、河谷地带。
					\n2. 不应上树躲避，因泥石流不同于一般洪水，其流动中可能剪断树木卷入泥石流。
					\n3. 不要往地势空旷，树木生长稀疏的地方逃生，可以就近选择树木生长密集的地带逃生，密集的树木可以阻挡泥石流的前进。
					\n4. 不要停留在低平的弯道凹侧，因为弯道处水位较高。也不要躲在有滚石和大量堆积物的陡峭山坡下方。
					\n5. 不要往土层较厚的地带逃生，要向地质坚硬、无碎石，不易被雨水冲毁的岩石地带逃生。
					<text>
						\n
					</text>
				</text>
			</view>
			<text>
				\n
			</text>
		</view>
		<view v-if="current === 2">
			<view class="titlediv">
				<text class="title">山体滑坡</text>
				<text class="intr">由地质不稳定、降水或地震\n引发的岩石、泥土等的下滑</text>
			</view>
			<view class="texttitlediv3">
				<u-icon name="question-circle" size="40"></u-icon>
				<text class="texttilte3">山体滑坡避灾小知识</text>
			</view>
			<view class="textdiv">
				<text class="textindex">01 前兆</text>
				<text class="textcon">
					1. 堵塞多年的泉水有复活现象，或者出现泉水突然干枯，井水位突变等类似的异常现象。
					\n2. 滑坡体前缘坡脚处，土体出现上隆现象,这是滑坡明显的向前推挤现象。有岩石开裂或被剪切挤压的音响。
					\n3. 滑坡体前部出现横向及纵向放射状裂缝，它反映了滑坡体向前推挤并受到阻碍，已进入临滑状态。
					\n4. 滑坡体四周岩体会出现小型崩塌和松弛现象。滑坡后缘的裂缝急剧扩展，并从裂缝中冒出热气或冷风。
				</text>
				<text class="textindex">02 避灾</text>
				<text class="textcon">
					1. 首先要沉着冷静，不要慌乱，慌乱不仅浪费时间，而且极可能做出错误的决定。
					\n2. 迅速环顾四周，向较为安全的地段撤离。一般除高速滑坡外，只要行动迅速，都有可能逃离危险区段。逃离时，以向两侧跑为最佳方向。
					\n3. 千万不要将避灾场地选择在滑坡的上坡或者下坡。有组织时，要听从统一安排，不要自择路线。
					\n4. 当遇到无法跑离的高速滑坡时，如滑坡呈整体滑动，迅速抱住身边的树木等固定物体，或可躲避在结实的障碍物下。应注意保护好头部，利用身边衣物裹住头部，不失为一种有效的自救措施。
					\n5. 在确保安全的情况下，离原居住处越近越好，交通、水源、电源更为方便。切记不要在逃离时顺着滑坡方向跑。
					\n6. 对于尚未滑动的滑坡危险区，一旦发生可疑的滑坡活动，应立即报告相关部门，及时采取措施。
					<text>
						\n
					</text>
				</text>
			</view>
			<text>
				\n
			</text>
		</view>
		<view v-if="current === 3">
			<view class="titlediv">
				<text class="title">森林火灾</text>
				<text class="intr">失控的林地火灾\n对森林、生态和人类造成危害</text>
			</view>
			<view class="texttitlediv4">
				<u-icon name="question-circle" size="40"></u-icon>
				<text class="texttilte4">森林火灾避灾小知识</text>
			</view>
			<view class="textdiv">
				<text class="textindex">01 避灾</text>
				<text class="textcon">
					1. 如果火势较小，可以用水浇、土埋、树枝扑打等方法及时扑灭。如果火势已起，一定要马上转移避险，并拨打森林火警电话12119报警！
					\n2. 转移避险时，一定要先判断风向，逆风逃生。如果风停了或者暂时无风，有可能是风向要发生变化，一定不要大意！
					\n3. 注意远离密集的灌木、草丛，寻找空旷的安全地带。进入安全地带后，要迅速清除周国可燃物，排除安全隐患。切记不可选择低洼或坑、洞，因为低洼地和坑、洞容易沉积烟尘。
					\n4. 森林火灾除了高温火焰会给人造成伤害，还有浓烟和一氧化碳，撤离时如果周边有水源，可用浸湿的衣物等遮掩口鼻。
					\n5. 撤离时如果被大火包围在半山腰时，要快速向山下跑，切忌往山上跑，通常火势向上蔡延的速度要比人跑的快得多，火会跑到你的前面。
					\n6. 如果被大火包围，确实没有别的逃生办法，选择火势较弱的地方，用衣物护住头部迅速穿越火线逃生。
				</text>
			</view>
			<text>
				\n
			</text>
		</view>
		<view v-if="current === 4">
			<view class="titlediv">
				<text class="title">洪水</text>
				<text class="intr">由过量降雨、河流泛滥或海洋风暴潮\n引起的水位上升</text>
			</view>
			<view class="texttitlediv5">
				<u-icon name="question-circle" size="40"></u-icon>
				<text class="texttilte5">洪水避灾小知识</text>
			</view>
			<view class="textdiv">
				<text class="textindex">01 预防</text>
				<text class="textcon">
					1.
					接到洪水预报时，应备足食品、衣物、饮用水、生活日用品和必要医疗用品，妥善安置家庭贵重物品。保存好尚能够使用的通信设备。收集手电、口哨、镜子、打火机、色彩艳丽的衣服等可作为信号用的物品，做好被整理援的准备。
					\n2. 严重的水灾通常发生在河流、沿海地带以及低洼地带。如果住在这些地方，当有连续暴雨或大暴雨时，要格外小心。搜集木盆、木材、大件泡沫塑料等适合漂浮的材料，加工成救生装置以备急需。
				</text>
				<text class="textindex">02 避灾</text>
				<text class="textcon">
					1. 受到洪水威胁，如果时间充裕,应按照预定路线，有组织地向山坡、高地等处转移；在已经受到洪水包围的情况下，要尽可能利用船只、木排、门板、木床等，做水上转移。
					\n2. 若洪水来得太快，已来不及转移时，可以爬上屋顶、楼房高屋、大树高墙，做暂时避险，等待援救，尽量不要独自游水转移。
					\n3. 在山区，如果连降大雨，容易暴发山洪。遇到这种情况，应注意避免渡河，以防止被山洪冲走，还要注意防止山体滑坡、滚石、泥石流的伤害。
					\n4. 发现高压线铁塔倾倒、电线低垂或断折时，要远离避险，不可触摸或接近，防止触电。
				</text>
			</view>
			<text>
				\n
			</text>
		</view>
	</view>
</template>

<script setup>
	
	const list = ref([
		{ cate_name: '地震' },
		{ cate_name: '泥石流' },
		{cate_name: '山体滑坡'},
		{cate_name: '森林火灾'}, 
		{cate_name: '洪水'}
		// Add more categories as needed
	]);
	const current = ref(0);
	
	const change = (index) => {
		console.log("index", index);
	};

</script>

<style lang="scss" scoped>
	.titlediv {
		display: flex;
		align-items: center;
		margin-left: 30rpx;
		margin-top: 30rpx;

		.title {
			white-space: nowrap;
			font-weight: bold;
			font-size: 64rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
			position: relative; // 为了添加伪元素
			margin-right: 20rpx; // 确保标题和竖线之间有空间

			&::after {
				content: ''; // 伪元素内容为空
				position: absolute;
				right: -30rpx; // 竖线位于文字右侧
				top: 50%;
				transform: translateY(-40%); // 垂直居中
				height: 80%; // 竖线高度
				width: 4rpx; // 竖线宽度
				background-color: #9227e1; // 竖线颜色
			}
		}

		.intr {
			width: 450rpx;
			font-size: 26rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
			position: relative; // 为了添加伪元素
			margin-left: 50rpx; // 确保标题和竖线之间有空间
			margin-top: 10rpx;
			line-height: 40rpx;
		}
	}

	.texttitlediv1 {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 690rpx;
		margin-top: 40rpx;
		margin-left: 30rpx;
		background-color: #ffecbd;
		padding: 10px 10px;
		border-radius: 10px;

		.texttilte1 {
			font-weight: bold;
			font-size: 32rpx;
			margin-left: 15rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}

	.texttitlediv2 {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 690rpx;
		margin-top: 40rpx;
		margin-left: 30rpx;
		background-color: #f8dec3;
		padding: 10px 10px;
		border-radius: 10px;

		.texttilte2 {
			font-weight: bold;
			font-size: 32rpx;
			margin-left: 15rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}

	.texttitlediv3 {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 690rpx;
		margin-top: 40rpx;
		margin-left: 30rpx;
		background-color: #b5ccad;
		padding: 10px 10px;
		border-radius: 10px;

		.texttilte3 {
			font-weight: bold;
			font-size: 32rpx;
			margin-left: 15rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}

	.texttitlediv4 {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 690rpx;
		margin-top: 40rpx;
		margin-left: 30rpx;
		background-color: #e6bcb0;
		padding: 10px 10px;
		border-radius: 10px;

		.texttilte4 {
			font-weight: bold;
			font-size: 32rpx;
			margin-left: 15rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}
	.texttitlediv5 {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 690rpx;
		margin-top: 40rpx;
		margin-left: 30rpx;
		background-color: #a0d1ff;
		padding: 10px 10px;
		border-radius: 10px;
	
		.texttilte5 {
			font-weight: bold;
			font-size: 32rpx;
			margin-left: 15rpx;
			font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
		}
	}
	.textdiv {
		width: 690rpx;
		height: auto;
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;
		justify-content: flex-start;
		margin-left: 30rpx;
		margin-top: 30rpx;
		border-radius: 10px;

		.textindex {
			margin-top: 40rpx;
			margin-left: 40rpx;
			margin-bottom: 30rpx;
			font-weight: bold;
			font-size: 48rpx;
			font-family: "Graduate";
			color: #9227e1;
		}

		.textcon {
			margin-right: 30rpx;
			margin-left: 50rpx;
			margin-top: 10rpx;
			margin-bottom: 30rpx;
			font-size: 32rpx;
			line-height: 60rpx;
		}
	}
</style>