<template>
  <map class="map" id="myMap" show-location="true" :scale=17 :latitude="latitude" :longitude="longitude" :markers="markers" @regionchange="onRegionChange" :polygons="polygons" :polyline="polyline" enable-traffic="true" :enable-satellite="current === 1">
    <view>
      <u-search class="searchbar" placeholder="输入目的地以查询避险路线" height="80" v-model="keyword" shape="round"
        bgColor="#ecf5ff" borderColor="#9227e1" actionText="搜索" :showAction="true" :clearable="true"
        :animation="false" searchIcon="search" @change="onChange" @custom="onSearch" @search="onSearch" @focus="onFocus" @blur="onBlur"></u-search>
      <view v-if="isactive" class="recommendation-container">
        <view v-for="(item, index) in recommendedPlaces" :key="index" class="recommendation-item"
          @click="selectPlace(item)">
          <image src="../../static/img/search.png" class="searchimg"></image>
          <view class="place">
            <text class="place-item">{{ item.title }}</text>
            <text class="position-item">{{ item.address }}</text>
          </view>
        </view>
      </view>
	  <view class="way">
		  <u-subsection :list="waylist" v-model="waycurrent" class="wayoption" mode="button" active-color="#9227e1" bg-color="#ecf5ff"></u-subsection>
	  </view>
    </view>
    <view>
      <!-- 点击区域 -->
      <view class="rangediv" @tap="show = true">
        <image src="/static/img/范围.png" class="edit-icon" />
      </view>
      <!-- 弹窗 -->
      <u-popup v-model="show" mode="bottom" height="20%">
        <view class="popdiv">
          <view class="pop-item">选取灾害显示范围</view>
          <u-subsection :list="list_range" mode="button" v-model="currentrange" active-color="#9227e1" bg-color="#ededed" class="pop-subsection"></u-subsection>
        </view>
      </u-popup>
    </view>
    <view>
      <!-- 点击区域 -->
      <view class="timediv" @tap="timeshow = true">
        <image src="/static/img/时间.png" class="edit-icon" />
      </view>
      <u-popup mode="bottom" height="40%" v-model="timeshow">
        <view class="content">
          <view class="uni-padding-wrap">
            <view class="uni-title">选取灾害显示时间</view>
          </view>
          <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
            <picker-view-column>
              <view class="item" v-for="(item, index) in years" :key="index">{{ item === 0 ? '所有时间段' : item + '年' }}</view>
            </picker-view-column>
          </picker-view>
        </view>
      </u-popup>
    </view>
	<view>
		<!-- 点击区域 -->
		<view class="pointdiv" @tap="pointshow">
		  <image src="/static/img/定位.png" class="point-icon" />
		</view>
		<!-- 点击区域 -->
		<view class="navdiv" @tap="navshow">
		  <image src="/static/img/路线配置.png" class="nav-icon" />
		</view>
	</view>
	<view class="checkdiv">
		<view class="icon-container">
		    <img :src="isActive1 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon1"/>
		    <view  class="icontext">
				<text>地震</text>
			</view>
			<img :src="isActive2 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon2"/>
			<view  class="icontext">
				<text>滑坡</text>
			</view>
			<img :src="isActive3 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon3"/>
			<view  class="icontext">
				<text>火灾</text>
			</view>
			<img :src="isActive4 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon4"/>
			<view  class="icontext">
				<text>洪水</text>
			</view>
			<img :src="isActive5 ? activeIcon : inactiveIcon" alt="icon" class="icon-image" @click="toggleIcon5"/>
			<view  class="icontext">
				<text>所有灾害</text>
			</view>
		</view>
	</view>
    <view class="subdiv">
		<u-subsection :list="list" v-model="current" class="sub" mode="button" active-color="#9227e1" bg-color="#ededed"></u-subsection>
	</view>
  </map>
</template>

<script setup>
import { ref, onMounted, watch} from 'vue';

// 定义响应式数据
const latitude = ref(0);
const longitude = ref(0);
const markers = ref([]);
const polygons = ref([]);
const polyline = ref([]);
const keyword = ref('');
const list = ref([
  { name: '标准地图' },
  { name: '卫星地图' }
]);
const current = ref(0);
const isactive = ref(false);
const recommendedPlaces = ref([]);

const waylist = ref([
  { name: '步行' },
  { name: '自行车' },
  { name: '电动车' },
  { name: '驾车' },
]);
const waycurrent = ref(0);



// 控制弹窗显示与隐藏的状态
const show = ref(false);
const timeshow = ref(false);

// 获取当前年份
const date = new Date();
const currentYear = date.getFullYear();
// 生成年份数组
const years = ref([]);
for (let i = 1990; i <= currentYear; i++) {
  years.value.push(i);
}
years.value.push(0); // 将 0 添加到数组的最后

// 定义响应式数据
const year = ref(currentYear);
const value = ref([years.value.indexOf(currentYear)]);
const visible = ref(true);
const indicatorStyle = ref('height: 50px;');

const currentrange = ref(0);
const list_range = ref([
  { name: '50m' },
  { name: '200m' },
  { name: '500m' },
  { name: '1km' },
  { name: '全球' },
]);

// 定义图片路径
const activeIcon = '/static/img/圆形选中.png';
const inactiveIcon = '/static/img/圆形未选中.png';

const isActive1 = ref(false); // 初始状态

const toggleIcon1 = () => {
  isActive1.value = !isActive1.value; // 切换图标状态
  const radius = getRadiusFromRange(currentrange.value);
  if (isActive1.value) {
    earthquakeLocations(latitude.value, longitude.value, radius, year.value);
	console.log("marker after adding earthquake:", markers.value);
  } else {
    markers.value = markers.value.filter(marker => marker.describe !== 'earthquake_location');
    console.log("markers after removing earthquake:", markers.value);
  }
};

const isActive2 = ref(false); // 初始状态

const toggleIcon2 = () => {
  isActive2.value = !isActive2.value; // 切换图标状态
  console.log('isActive2:', isActive2.value);
  const radius = getRadiusFromRange(currentrange.value);
  if (isActive2.value) {
    landslideLocations(latitude.value, longitude.value, radius, year.value);
	console.log("marker after adding landslide:", markers.value);
  } else {
    markers.value = markers.value.filter(marker => marker.describe !== 'landslide_location');
    console.log("markers after removing landslide:", markers.value);
  }
};

const isActive3 = ref(false); // 初始状态

const toggleIcon3 = () => {
  isActive3.value = !isActive3.value; // 切换图标状态
  console.log('isActive3:', isActive3.value);
  const radius = getRadiusFromRange(currentrange.value);
  if (isActive3.value) {
    fireLocations(latitude.value, longitude.value, radius, year.value);
  	console.log("marker after adding fires:", markers.value);
  } else {
    markers.value = markers.value.filter(marker => marker.describe !== 'fire_location');
    console.log("markers after removing fire:", markers.value);
  }
};

const isActive4 = ref(false); // 初始状态

const toggleIcon4 = () => {
  isActive4.value = !isActive4.value; // 切换图标状态
  console.log('isActive4:', isActive4.value);
  const radius = getRadiusFromRange(currentrange.value);
  if (isActive4.value) {
    landslideLocations(latitude.value, longitude.value, radius, year.value);
  	console.log("marker after adding water:", markers.value);
  } else {
    markers.value = markers.value.filter(marker => marker.describe !== 'water_location');
    console.log("markers after removing water:", markers.value);
  }
};

const isActive5 = ref(false); // 初始状态

const toggleIcon5 = () => {
  isActive5.value = !isActive5.value; // 切换图标状态
  
};

// 处理选择变化
const bindChange = (e) => {
  const val = e.detail.value;
  year.value = years.value[val[0]];
};

// 获取半径值
const getRadiusFromRange = (range) => {
  switch (range) {
    case 0: return 50;
    case 1: return 200;
    case 2: return 500;
    case 3: return 1000;
    case 4: return 0;
    default: return 300; // 默认半径
  }
};

// 获取位置并请求附近地点数据
const getLocation = () => {
  wx.getLocation({
    type: 'gcj02',
	geocode: true,
    success: (res) => {
      latitude.value = res.latitude;
      longitude.value = res.longitude;
      markers.value = [{
        id: 0,
        latitude: res.latitude,
        longitude: res.longitude,
        width: 30,
        height: 30,
        iconPath: '../../static/img/透明图片.png',
		describe: 'user_location'
      }];
    },
    fail: () => {
      wx.showToast({
        title: '无法获取位置信息',
        icon: 'none',
      });
    }
  });
};

// 请求附近地点数据
const landslideLocations = (latitude, longitude, radius, year) => {
  uni.request({
    url: 'http://localhost:8080/api/landslide',
    method: 'POST',
    data: {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      year: year // 传递年份参数
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: (response) => {
      // 先过滤掉现有的 describe 为 'disaster_location' 的标记
      const existingMarkers = markers.value.filter(marker => marker.describe !== 'landslide_location');

      // 将新的标记数据添加到 markers 中
      markers.value = [
        ...existingMarkers,
        ...response.data.map((location, index) => ({
          id: index + 1, // 从1开始以避免与当前位置的标记ID冲突
          latitude: location.latitude,
          longitude: location.longitude,
          width: 30,
          height: 30,
          iconPath: '../../static/img/landslide_point.png', // 使用自定义图标
          describe: 'landslide_location'
        }))
      ];

      // 更新圆形覆盖区域
      if (radius === 0) {
        polygons.value = []; // 清空 polygons
      } else {
        polygons.value = [{
          points: calculateCircle(latitude, longitude, radius),
          strokeWidth: 1,
          strokeColor: "rgba(146, 39, 225, 0.7)",
          fillColor: "rgba(146, 39, 225, 0.15)" ,// 透明的 #9227e1
        }];
      }
    },
    fail: (error) => {
      console.error('获取地点数据时出错:', error);
    }
  });
};

// 请求附近地点数据
const earthquakeLocations = (latitude, longitude, radius, year) => {
  uni.request({
    url: 'http://localhost:8080/api/earthquake',
    method: 'POST',
    data: {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      year: year // 传递年份参数
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: (response) => {

      // 先过滤掉现有的 describe 为 'disaster_location' 的标记
      const existingMarkers = markers.value.filter(marker => marker.describe !== 'earthquake_location');

      // 将新的标记数据添加到 markers 中
      markers.value = [
        ...existingMarkers,
        ...response.data.map((location, index) => ({
          id: index + 1, // 从1开始以避免与当前位置的标记ID冲突
          latitude: location.earthquakeLat,
          longitude: location.earthquakeLon,
          width: 30,
          height: 30,
          iconPath: '../../static/img/fire_point.png', // 使用自定义图标
          describe: 'earthquake_location'
        }))
      ];

      // 更新圆形覆盖区域
      if (radius === 0) {
        polygons.value = []; // 清空 polygons
      } else {
        polygons.value = [{
          points: calculateCircle(latitude, longitude, radius),
          strokeWidth: 1,
          strokeColor: "rgba(146, 39, 225, 0.7)",
          fillColor: "rgba(146, 39, 225, 0.15)" ,// 透明的 #9227e1
        }];
      }
    },
    fail: (error) => {
      console.error('获取地点数据时出错:', error);
    }
  });
};

// 请求附近地点数据
const fireLocations = (latitude, longitude, radius, year) => {
  uni.request({
    url: 'http://localhost:8080/api/fire',
    method: 'POST',
    data: {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      year: year // 传递年份参数
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: (response) => {

      // 先过滤掉现有的 describe 为 'disaster_location' 的标记
      const existingMarkers = markers.value.filter(marker => marker.describe !== 'fire_location');

      // 将新的标记数据添加到 markers 中
      markers.value = [
        ...existingMarkers,
        ...response.data.map((location, index) => ({
          id: index + 1, // 从1开始以避免与当前位置的标记ID冲突
          latitude: location.earthquakeLat,
          longitude: location.earthquakeLon,
          width: 30,
          height: 30,
          iconPath: '../../static/img/fire_point.png', // 使用自定义图标
          describe: 'earthquake_location'
        }))
      ];

      // 更新圆形覆盖区域
      if (radius === 0) {
        polygons.value = []; // 清空 polygons
      } else {
        polygons.value = [{
          points: calculateCircle(latitude, longitude, radius),
          strokeWidth: 1,
          strokeColor: "rgba(146, 39, 225, 0.7)",
          fillColor: "rgba(146, 39, 225, 0.15)" ,// 透明的 #9227e1
        }];
      }
    },
    fail: (error) => {
      console.error('获取地点数据时出错:', error);
    }
  });
};

// 请求附近地点数据
const waterLocations = (latitude, longitude, radius, year) => {
  uni.request({
    url: 'http://localhost:8080/api/water',
    method: 'POST',
    data: {
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      year: year // 传递年份参数
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: (response) => {

      // 先过滤掉现有的 describe 为 'disaster_location' 的标记
      const existingMarkers = markers.value.filter(marker => marker.describe !== 'water');

      // 将新的标记数据添加到 markers 中
      markers.value = [
        ...existingMarkers,
        ...response.data.map((location, index) => ({
          id: index + 1, // 从1开始以避免与当前位置的标记ID冲突
          latitude: location.earthquakeLat,
          longitude: location.earthquakeLon,
          width: 30,
          height: 30,
          iconPath: '../../static/img/fire_point.png', // 使用自定义图标
          describe: 'earthquake_location'
        }))
      ];

      // 更新圆形覆盖区域
      if (radius === 0) {
        polygons.value = []; // 清空 polygons
      } else {
        polygons.value = [{
          points: calculateCircle(latitude, longitude, radius),
          strokeWidth: 1,
          strokeColor: "rgba(146, 39, 225, 0.7)",
          fillColor: "rgba(146, 39, 225, 0.15)" ,// 透明的 #9227e1
        }];
      }
    },
    fail: (error) => {
      console.error('获取地点数据时出错:', error);
    }
  });
};


// 监听 currentrange 和 year 的变化
watch([currentrange, year], ([newRange, newYear]) => {
  console.log('currentrange or year changed:', newRange, newYear);
  const radius = getRadiusFromRange(newRange);
  if (isActive1.value) {
    earthquakeLocations(latitude.value, longitude.value, radius, newYear);
  }
  if (isActive2.value) {
    landslideLocations(latitude.value, longitude.value, radius, newYear);
  }
  if (isActive3.value) {
    fireLocations(latitude.value, longitude.value, radius, newYear);
  }
  if (isActive4.value) {
    waterLocations(latitude.value, longitude.value, radius, newYear);
  }
  if (isActive5.value) {
	earthquakeLocations(latitude.value, longitude.value, radius, newYear);
    landslideLocations(latitude.value, longitude.value, radius, newYear);
	firmLocations(latitude.value, longitude.value, radius, newYear);
	waterLocations(latitude.value, longitude.value, radius, newYear);
  }
}, { immediate: true });

// 计算圆的点
const calculateCircle = (latitude, longitude, radius) => {
  const points = [];
  const numPoints = 100; // 圆周上的点数量
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints;
    points.push({
      latitude: latitude + (radius / 111000) * Math.cos(angle),
      longitude: longitude + (radius / (111000 * Math.cos(latitude * Math.PI / 180))) * Math.sin(angle)
    });
  }
  return points;
};

// 使用腾讯地图 API 进行搜索
const onChange = (value) => {
  wx.request({
    url: 'https://apis.map.qq.com/ws/place/v1/suggestion',
    method: 'GET',
    data: {
      keyword: value, // 使用用户输入的关键字
      key: 'A7GBZ-RU4LT-3NTXB-V6ADO-YR2D3-TTBYQ' // 替换为你的腾讯地图 API 密钥
    },
    success: (response) => {
      console.log('搜索结果:', response.data);
      if (response.data.status === 0) {
        recommendedPlaces.value = response.data.data;
        isactive.value = true; // 显示推荐地点列表
      } else {
        wx.showToast({
          title: '搜索失败',
          icon: 'none'
        });
      }
    },
    fail: (error) => {
      console.error('搜索请求失败:', error);
      wx.showToast({
        title: '搜索请求失败',
        icon: 'none'
      });
    }
  });
};

// 设置地图中心坐标为目的地
const updateMapCenter = () => {
  const marker = markers.value.find(marker => marker.describe === 'destinct_location');
  if (marker) {
    latitude.value = marker.latitude;
    longitude.value = marker.longitude;
  }
};

// 选择推荐地点
const selectPlace = (place) => {
  keyword.value = place.title; 
  // 查找是否已有标记的 describe 为 'destinct_location'
  const existingMarkerIndex = markers.value.findIndex(marker => marker.describe === 'destinct_location');
  
  if (existingMarkerIndex !== -1) {
    // 如果存在，更新现有标记
    markers.value[existingMarkerIndex] = {
      ...markers.value[existingMarkerIndex], // 保留现有标记的其他属性
      latitude: place.location.lat,
      longitude: place.location.lng,
      iconPath: '../../static/img/current_point.png'
    };
  } else {
    // 如果不存在，添加新标记
    const maxId = markers.value.reduce((max, marker) => marker.id > max ? marker.id : max, 0);
    const newMarker = {
      id: maxId + 1,
      latitude: place.location.lat,
      longitude: place.location.lng,
      width: 30,
      height: 30,
      iconPath: '../../static/img/current_point.png',
      describe: 'destinct_location'
    };
    markers.value.push(newMarker);
  }
  isactive.value = false; // 隐藏推荐地点列表
  
};

// 搜索目的地
const onSearch = (value) => {
  console.log('用户输入的搜索关键字:', value);
  isactive.value = false; // 隐藏推荐地点列表
  updateMapCenter();
};

const navshow = () => {
  const markersArray = markers.value || [];
  
  const userLocation = markersArray.find(marker => marker.describe === 'user_location');
  const distinctLocation = markersArray.find(marker => marker.describe === 'destinct_location');
  
  if (userLocation && distinctLocation) {
    const start = { latitude: userLocation.latitude, longitude: userLocation.longitude };
    const end = { latitude: distinctLocation.latitude, longitude: distinctLocation.longitude };

    wx.request({
      url: 'https://apis.map.qq.com/ws/direction/v1/driving/',
      data: {
        from: `${start.latitude},${start.longitude}`,
        to: `${end.latitude},${end.longitude}`,
        key: 'A7GBZ-RU4LT-3NTXB-V6ADO-YR2D3-TTBYQ'
      },
      success: (response) => {
        if (response.data.status === 0) {
          const coors = response.data.result.routes[0].polyline;
          
          // 解压缩坐标
          for (let i = 2; i < coors.length; i++) {
            coors[i] = coors[i - 2] + coors[i] / 1000000;
          }

          const polylinePoints = [];
          for (let i = 0; i < coors.length; i += 2) {
            polylinePoints.push({
              latitude: coors[i],
              longitude: coors[i + 1]
            });
          }

          console.log("路线：", polylinePoints);
          
          // 更新 polyline
          polyline.value = [{
            points: polylinePoints,
            color: "#FF0000DD",
            width: 4
          }];
		  
          console.log("路线总：", polyline.value);

          // 更新图标
          markers.value = markersArray.map(marker => {
            if (marker.describe === 'user_location') {
              marker.iconPath = '../../static/img/透明图片.png';  // 设置用户位置图标路径
            } else if (marker.describe === 'destinct_location') {
              marker.iconPath = '../../static/img/9终点.png';  // 设置目标位置图标路径
            }
            return marker;
          });

          // 调整地图视图
          const mapContext = wx.createMapContext('myMap');  // 假设你的地图组件 id 是 "myMap"
          mapContext.includePoints({
            points: polylinePoints,
            padding: [100, 100, 100, 100]
          });
        } else {
          console.error('获取路线数据失败:', response.data);
        }
      },
      fail: (error) => {
        console.error('请求失败:', error);
      }
    });
  } else {
    console.error('无法找到用户位置或目标位置');
  }
};

// 更新地图中心为用户的坐标
const updateMapCenterToUserLocation = () => {
  const userLocationMarker = markers.value.find(marker => marker.describe === 'user_location');
  if (userLocationMarker) {
	  console.log("标记：",markers);
    latitude.value = userLocationMarker.latitude;
    longitude.value = userLocationMarker.longitude;
  }
};

// 删除 'destinct_location' 的标记
const removeDestinctLocationMarker = () => {
  markers.value = markers.value.filter(marker => marker.describe !== 'destinct_location');
};

// 点击按钮后的处理函数
const pointshow = () => {
  console.log('用户点击了按钮');
  console.log("markers:",markers.value);
  updateMapCenterToUserLocation();
  removeDestinctLocationMarker();
  console.log('更新后的标记:', markers.value);
};

// 处理视野变化
const onRegionChange = (e) => {
  if (e.type === 'end') {
    const { centerLocation } = e.detail;
    if (centerLocation) {
      latitude.value = centerLocation.lat;
      longitude.value = centerLocation.lng;
    }
  }
};

// 监听搜索框的聚焦事件
const onFocus = () => {
};

// 监听搜索框的失焦事件
const onBlur = () => {
  isactive.value = false; // 隐藏推荐地点列表
};

// 页面挂载后获取位置
onMounted(() => {
    wx.authorize({
        scope: 'scope.userLocation',
        success: getLocation,
        fail: () => {
            wx.showToast({
                title: '请授权地理位置信息',
                icon: 'none',
            });
        }
    });
});
</script>

<style lang="scss" scoped>
	.map {
		width: 100vw;
		height: 100vh;
		.searchbar {
			background-color: #f3f6f9; // 设置搜索栏的背景颜色
			border-radius: 50px; // 圆角设计
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 阴影效果
			display: flex; // 使用flex布局
			align-items: center; // 垂直居中
			justify-content: center; // 水平居中
			padding: 20rpx; // 内边距
			margin-top: 30rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-bottom: 10rpx;
			position: relative; // 为了定位推荐列表
		}
		.recommendation-container {
			position: relative;
			width: 690rpx;
			top: 50px; // 根据实际情况调整
			left: 30rpx;
			max-height: 510rpx; // 最大高度
			border-radius: 30rpx;
			background-color: #f3f6f9; // 背景颜色
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 阴影效果
			overflow-y: auto; // 允许垂直滚动
			z-index: 10; // 确保在顶层

			.recommendation-item {
				height: auto;
				background-color: #ecf5ff;
				border-radius: 20rpx;
				margin: 20rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 20rpx;
				padding-top: 10rpx;
				padding-bottom: 20rpx;
				border: 2px solid rgba(146, 39, 225, 0.5); /* 添加带透明度的#9227e1色边框 */
				.searchimg {
					margin-right: 40rpx;
					width: 30rpx;
					height: 30rpx;
					flex-shrink: 0; /* 防止图片被压缩 */
				}

				.place {
					display: flex;
					flex-direction: column;
					flex-grow: 1; /* 占据剩余空间 */
					  overflow: hidden; /* 防止超出边界 */
					.place-item {
						font-size: 28rpx;
						font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
						padding-bottom: 10rpx;
						overflow: hidden; /* 防止文本超出容器 */
						text-overflow: ellipsis; /* 添加省略号 */
						white-space: nowrap; /* 强制文本不换行 */
					}

					.position-item {
						font-size: 20rpx;
						font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
						color: #999999;
					}
				}
			}
		}
		.rangediv {
		    width: 85rpx;
			height: 85rpx;
		    position: fixed;
		    margin-top: 120rpx;
		    margin-left: 630rpx;
		    background-color: #ecf5ff;  /* 背景颜色 */
			border-color: #9227e1;
		    border-radius: 10rpx;       /* 圆角，调整值以改变圆角的大小 */
		    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 阴影效果
		    display: flex;              /* 使用 flex 布局 */
		    align-items: center;        /* 垂直居中 */
		    justify-content: center;    /* 水平居中 */
			.edit-icon {
			    width: 60rpx;
			    height: 60rpx;
			}
		}	
		.subdiv{
			width: 100%; /* 宽度设置为视口宽度的 90% */
			  position: fixed; /* 固定在视口中 */
			  bottom: 170rpx;
			  left: 200rpx; /* 从视口左边开始 */
			  display: flex; /* 使用 Flexbox 布局 */
			  justify-content: center; /* 水平居中 */
			  align-items: center; /* 垂直居中 */
			  margin: 0 auto; /* 确保容器本身居中（可选） */
			  z-index: 1001; /* 确保元素在其他内容之上 */
			.sub {
				width: 40%; /* 占满父容器的宽度，即 .way 的宽度的 90% */
				position: fixed; /* 固定在视口中 */
				  margin-top: 10rpx;
				  border-radius: 10rpx;       /* 圆角，调整值以改变圆角的大小 */
				  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
				 // border: 1px solid #9227e1; /* 添加边框 */	
			}
		}
		
		.checkdiv{
			  width: 92%; /* 宽度设置为视口宽度的 90% */
			  height: 65rpx;
			  position: fixed; /* 固定在视口中 */
			  bottom: 40rpx;
			  left: 37rpx; /* 从视口左边开始 */
			  display: flex; /* 使用 Flexbox 布局 */
			  justify-content: center; /* 水平居中 */
			  align-items: center; /* 垂直居中 */
			  margin: 0 auto; /* 确保容器本身居中（可选） */
			  z-index: 999; /* 确保元素在其他内容之上 */
			  background-color: #ecf5ff;
			  border-radius: 15rpx;
			  border: 1px solid #9227e1; /* 添加边框 */	
			  .icon-container {
			    display: flex;
			    align-items: center;
			    justify-content: center;
				.icon-image {
				  width: 22px; /* 图标的宽度 */
				  height: 22px; /* 图标的高度 */
				  margin-right: 8rpx;
				}
				.icontext{
					margin-right: 20rpx;
				}
			  }
			  }

		.way{
			width: 90%; /* 宽度设置为视口宽度的 90% */
			  height: 190rpx; /* 高度设置 */
			  position: fixed; /* 固定在视口中 */
			  top: 100rpx; /* 在视口顶部 */
			  left: 30rpx; /* 从视口左边开始 */
			  display: flex; /* 使用 Flexbox 布局 */
			  justify-content: center; /* 水平居中 */
			  align-items: center; /* 垂直居中 */
			  margin: 0 auto; /* 确保容器本身居中（可选） */
			  z-index: 1000; /* 确保元素在其他内容之上 */
			.wayoption {
				width: 100%; /* 占满父容器的宽度，即 .way 的宽度的 90% */
				  margin-top: 10rpx;
				  border-radius: 10rpx;       /* 圆角，调整值以改变圆角的大小 */
				  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
				  border: 1px solid #9227e1; /* 添加边框 */	
			}
		}
		.popdiv{
			display: flex;                  /* 使用 Flexbox 布局 */
			flex-direction: column;         /* 垂直方向排布 */
			align-items: center;            /* 水平居中 */
			justify-content: center;        /* 垂直居中 */
			height: 100%;                    /* 使弹窗适应其父容器的高度 */
			.place-item {
			    font-size: 28rpx;
			    font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
			    padding-bottom: 10rpx;
			}
			.pop-subsection{
				margin-top:40rpx;
				width: 500rpx;
			}
		}
		.timediv {
		    width: 85rpx;
			height: 85rpx;
		    position: fixed;
		    margin-top: 220rpx;
		    margin-left: 630rpx;
		    background-color: #ecf5ff;  /* 背景颜色 */
			border-color: #9227e1;
		    border-radius: 10rpx;       /* 圆角，调整值以改变圆角的大小 */
		    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 阴影效果
		    display: flex;              /* 使用 flex 布局 */
		    align-items: center;        /* 垂直居中 */
		    justify-content: center;    /* 水平居中 */
			.edit-icon {
			    width: 60rpx;
			    height: 60rpx;
			}	
		}
		.content {
			.uni-padding-wrap{
				display: flex;                  /* 使用 Flexbox 布局 */
				flex-direction: column;         /* 垂直方向排布 */
				align-items: center;            /* 水平居中 */
				.uni-title{
					font-size: 28rpx;
					font-family: "Microsoft YaHei", "微软雅黑", "SimHei", "黑体";
					padding-bottom: 10rpx;
					margin-top: 40rpx;
				}
			}
			.picker-view {
				width: 750rpx;
				height: 400rpx;
				margin-top: 40rpx;
				}
				.item {
					line-height: 100rpx;
					text-align: center;
					}
		}
		.pointdiv {
		    width: 85rpx;
			height: 85rpx;
		    position: fixed;
		    margin-top: 320rpx;
		    margin-left: 630rpx;
		    background-color: #ecf5ff;  /* 背景颜色 */
			border-color: #9227e1;
		    border-radius: 10rpx;       /* 圆角，调整值以改变圆角的大小 */
		    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 阴影效果
		    display: flex;              /* 使用 flex 布局 */
		    align-items: center;        /* 垂直居中 */
		    justify-content: center;    /* 水平居中 */
			.point-icon {
			    width: 70rpx;
			    height: 70rpx;
			}
		}
		.navdiv {
		    width: 85rpx;
			height: 85rpx;
		    position: fixed;
		    margin-top: 420rpx;
		    margin-left: 630rpx;
		    background-color: #ecf5ff;  /* 背景颜色 */
			border-color: #9227e1;
		    border-radius: 10rpx;       /* 圆角，调整值以改变圆角的大小 */
		    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 阴影效果
		    display: flex;              /* 使用 flex 布局 */
		    align-items: center;        /* 垂直居中 */
		    justify-content: center;    /* 水平居中 */
			.nav-icon {
			    width: 60rpx;
			    height: 60rpx;
			}
		}
	}
		
</style>