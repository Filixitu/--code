"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_subsection2 = common_vendor.resolveComponent("u-subsection");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_search2 + _easycom_u_subsection2 + _easycom_u_popup2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_subsection = () => "../../uni_modules/vk-uview-ui/components/u-subsection/u-subsection.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_subsection + _easycom_u_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const latitude = common_vendor.ref(0);
    const longitude = common_vendor.ref(0);
    const markers = common_vendor.ref([]);
    const polygons = common_vendor.ref([]);
    const polyline = common_vendor.ref([]);
    const keyword = common_vendor.ref("");
    const list = common_vendor.ref([
      { name: "标准地图" },
      { name: "卫星地图" }
    ]);
    const current = common_vendor.ref(0);
    const isactive = common_vendor.ref(false);
    const recommendedPlaces = common_vendor.ref([]);
    const waylist = common_vendor.ref([
      { name: "步行" },
      { name: "自行车" },
      { name: "电动车" },
      { name: "驾车" }
    ]);
    const waycurrent = common_vendor.ref(0);
    const show = common_vendor.ref(false);
    const timeshow = common_vendor.ref(false);
    const date = /* @__PURE__ */ new Date();
    const currentYear = date.getFullYear();
    const years = common_vendor.ref([]);
    for (let i = 1990; i <= currentYear; i++) {
      years.value.push(i);
    }
    years.value.push(0);
    const year = common_vendor.ref(currentYear);
    const value = common_vendor.ref([years.value.indexOf(currentYear)]);
    const visible = common_vendor.ref(true);
    const indicatorStyle = common_vendor.ref("height: 50px;");
    const currentrange = common_vendor.ref(0);
    const list_range = common_vendor.ref([
      { name: "50m" },
      { name: "200m" },
      { name: "500m" },
      { name: "1km" },
      { name: "全球" }
    ]);
    const activeIcon = "/static/img/圆形选中.png";
    const inactiveIcon = "/static/img/圆形未选中.png";
    const isActive1 = common_vendor.ref(false);
    const toggleIcon1 = () => {
      isActive1.value = !isActive1.value;
      const radius = getRadiusFromRange(currentrange.value);
      if (isActive1.value) {
        earthquakeLocations(latitude.value, longitude.value, radius, year.value);
        console.log("marker after adding earthquake:", markers.value);
      } else {
        markers.value = markers.value.filter((marker) => marker.describe !== "earthquake_location");
        console.log("markers after removing earthquake:", markers.value);
      }
    };
    const isActive2 = common_vendor.ref(false);
    const toggleIcon2 = () => {
      isActive2.value = !isActive2.value;
      console.log("isActive2:", isActive2.value);
      const radius = getRadiusFromRange(currentrange.value);
      if (isActive2.value) {
        landslideLocations(latitude.value, longitude.value, radius, year.value);
        console.log("marker after adding landslide:", markers.value);
      } else {
        markers.value = markers.value.filter((marker) => marker.describe !== "landslide_location");
        console.log("markers after removing landslide:", markers.value);
      }
    };
    const isActive3 = common_vendor.ref(false);
    const toggleIcon3 = () => {
      isActive3.value = !isActive3.value;
      console.log("isActive3:", isActive3.value);
      const radius = getRadiusFromRange(currentrange.value);
      if (isActive3.value) {
        fireLocations(latitude.value, longitude.value, radius, year.value);
        console.log("marker after adding fires:", markers.value);
      } else {
        markers.value = markers.value.filter((marker) => marker.describe !== "fire_location");
        console.log("markers after removing fire:", markers.value);
      }
    };
    const isActive4 = common_vendor.ref(false);
    const toggleIcon4 = () => {
      isActive4.value = !isActive4.value;
      console.log("isActive4:", isActive4.value);
      const radius = getRadiusFromRange(currentrange.value);
      if (isActive4.value) {
        landslideLocations(latitude.value, longitude.value, radius, year.value);
        console.log("marker after adding water:", markers.value);
      } else {
        markers.value = markers.value.filter((marker) => marker.describe !== "water_location");
        console.log("markers after removing water:", markers.value);
      }
    };
    const isActive5 = common_vendor.ref(false);
    const toggleIcon5 = () => {
      isActive5.value = !isActive5.value;
    };
    const bindChange = (e) => {
      const val = e.detail.value;
      year.value = years.value[val[0]];
    };
    const getRadiusFromRange = (range) => {
      switch (range) {
        case 0:
          return 50;
        case 1:
          return 200;
        case 2:
          return 500;
        case 3:
          return 1e3;
        case 4:
          return 0;
        default:
          return 300;
      }
    };
    const getLocation = () => {
      common_vendor.wx$1.getLocation({
        type: "gcj02",
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
            iconPath: "../../static/img/透明图片.png",
            describe: "user_location"
          }];
        },
        fail: () => {
          common_vendor.wx$1.showToast({
            title: "无法获取位置信息",
            icon: "none"
          });
        }
      });
    };
    const landslideLocations = (latitude2, longitude2, radius, year2) => {
      common_vendor.index.request({
        url: "http://localhost:8080/api/landslide",
        method: "POST",
        data: {
          latitude: latitude2,
          longitude: longitude2,
          radius,
          year: year2
          // 传递年份参数
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (response) => {
          const existingMarkers = markers.value.filter((marker) => marker.describe !== "landslide_location");
          markers.value = [
            ...existingMarkers,
            ...response.data.map((location, index) => ({
              id: index + 1,
              // 从1开始以避免与当前位置的标记ID冲突
              latitude: location.latitude,
              longitude: location.longitude,
              width: 30,
              height: 30,
              iconPath: "../../static/img/landslide_point.png",
              // 使用自定义图标
              describe: "landslide_location"
            }))
          ];
          if (radius === 0) {
            polygons.value = [];
          } else {
            polygons.value = [{
              points: calculateCircle(latitude2, longitude2, radius),
              strokeWidth: 1,
              strokeColor: "rgba(146, 39, 225, 0.7)",
              fillColor: "rgba(146, 39, 225, 0.15)"
              // 透明的 #9227e1
            }];
          }
        },
        fail: (error) => {
          console.error("获取地点数据时出错:", error);
        }
      });
    };
    const earthquakeLocations = (latitude2, longitude2, radius, year2) => {
      common_vendor.index.request({
        url: "http://localhost:8080/api/earthquake",
        method: "POST",
        data: {
          latitude: latitude2,
          longitude: longitude2,
          radius,
          year: year2
          // 传递年份参数
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (response) => {
          const existingMarkers = markers.value.filter((marker) => marker.describe !== "earthquake_location");
          markers.value = [
            ...existingMarkers,
            ...response.data.map((location, index) => ({
              id: index + 1,
              // 从1开始以避免与当前位置的标记ID冲突
              latitude: location.earthquakeLat,
              longitude: location.earthquakeLon,
              width: 30,
              height: 30,
              iconPath: "../../static/img/fire_point.png",
              // 使用自定义图标
              describe: "earthquake_location"
            }))
          ];
          if (radius === 0) {
            polygons.value = [];
          } else {
            polygons.value = [{
              points: calculateCircle(latitude2, longitude2, radius),
              strokeWidth: 1,
              strokeColor: "rgba(146, 39, 225, 0.7)",
              fillColor: "rgba(146, 39, 225, 0.15)"
              // 透明的 #9227e1
            }];
          }
        },
        fail: (error) => {
          console.error("获取地点数据时出错:", error);
        }
      });
    };
    const fireLocations = (latitude2, longitude2, radius, year2) => {
      common_vendor.index.request({
        url: "http://localhost:8080/api/fire",
        method: "POST",
        data: {
          latitude: latitude2,
          longitude: longitude2,
          radius,
          year: year2
          // 传递年份参数
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (response) => {
          const existingMarkers = markers.value.filter((marker) => marker.describe !== "fire_location");
          markers.value = [
            ...existingMarkers,
            ...response.data.map((location, index) => ({
              id: index + 1,
              // 从1开始以避免与当前位置的标记ID冲突
              latitude: location.earthquakeLat,
              longitude: location.earthquakeLon,
              width: 30,
              height: 30,
              iconPath: "../../static/img/fire_point.png",
              // 使用自定义图标
              describe: "earthquake_location"
            }))
          ];
          if (radius === 0) {
            polygons.value = [];
          } else {
            polygons.value = [{
              points: calculateCircle(latitude2, longitude2, radius),
              strokeWidth: 1,
              strokeColor: "rgba(146, 39, 225, 0.7)",
              fillColor: "rgba(146, 39, 225, 0.15)"
              // 透明的 #9227e1
            }];
          }
        },
        fail: (error) => {
          console.error("获取地点数据时出错:", error);
        }
      });
    };
    const waterLocations = (latitude2, longitude2, radius, year2) => {
      common_vendor.index.request({
        url: "http://localhost:8080/api/water",
        method: "POST",
        data: {
          latitude: latitude2,
          longitude: longitude2,
          radius,
          year: year2
          // 传递年份参数
        },
        header: {
          "Content-Type": "application/json"
        },
        success: (response) => {
          const existingMarkers = markers.value.filter((marker) => marker.describe !== "water");
          markers.value = [
            ...existingMarkers,
            ...response.data.map((location, index) => ({
              id: index + 1,
              // 从1开始以避免与当前位置的标记ID冲突
              latitude: location.earthquakeLat,
              longitude: location.earthquakeLon,
              width: 30,
              height: 30,
              iconPath: "../../static/img/fire_point.png",
              // 使用自定义图标
              describe: "earthquake_location"
            }))
          ];
          if (radius === 0) {
            polygons.value = [];
          } else {
            polygons.value = [{
              points: calculateCircle(latitude2, longitude2, radius),
              strokeWidth: 1,
              strokeColor: "rgba(146, 39, 225, 0.7)",
              fillColor: "rgba(146, 39, 225, 0.15)"
              // 透明的 #9227e1
            }];
          }
        },
        fail: (error) => {
          console.error("获取地点数据时出错:", error);
        }
      });
    };
    common_vendor.watch([currentrange, year], ([newRange, newYear]) => {
      console.log("currentrange or year changed:", newRange, newYear);
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
    const calculateCircle = (latitude2, longitude2, radius) => {
      const points = [];
      const numPoints = 100;
      for (let i = 0; i < numPoints; i++) {
        const angle = i * 2 * Math.PI / numPoints;
        points.push({
          latitude: latitude2 + radius / 111e3 * Math.cos(angle),
          longitude: longitude2 + radius / (111e3 * Math.cos(latitude2 * Math.PI / 180)) * Math.sin(angle)
        });
      }
      return points;
    };
    const onChange = (value2) => {
      common_vendor.wx$1.request({
        url: "https://apis.map.qq.com/ws/place/v1/suggestion",
        method: "GET",
        data: {
          keyword: value2,
          // 使用用户输入的关键字
          key: "A7GBZ-RU4LT-3NTXB-V6ADO-YR2D3-TTBYQ"
          // 替换为你的腾讯地图 API 密钥
        },
        success: (response) => {
          console.log("搜索结果:", response.data);
          if (response.data.status === 0) {
            recommendedPlaces.value = response.data.data;
            isactive.value = true;
          } else {
            common_vendor.wx$1.showToast({
              title: "搜索失败",
              icon: "none"
            });
          }
        },
        fail: (error) => {
          console.error("搜索请求失败:", error);
          common_vendor.wx$1.showToast({
            title: "搜索请求失败",
            icon: "none"
          });
        }
      });
    };
    const updateMapCenter = () => {
      const marker = markers.value.find((marker2) => marker2.describe === "destinct_location");
      if (marker) {
        latitude.value = marker.latitude;
        longitude.value = marker.longitude;
      }
    };
    const selectPlace = (place) => {
      keyword.value = place.title;
      const existingMarkerIndex = markers.value.findIndex((marker) => marker.describe === "destinct_location");
      if (existingMarkerIndex !== -1) {
        markers.value[existingMarkerIndex] = {
          ...markers.value[existingMarkerIndex],
          // 保留现有标记的其他属性
          latitude: place.location.lat,
          longitude: place.location.lng,
          iconPath: "../../static/img/current_point.png"
        };
      } else {
        const maxId = markers.value.reduce((max, marker) => marker.id > max ? marker.id : max, 0);
        const newMarker = {
          id: maxId + 1,
          latitude: place.location.lat,
          longitude: place.location.lng,
          width: 30,
          height: 30,
          iconPath: "../../static/img/current_point.png",
          describe: "destinct_location"
        };
        markers.value.push(newMarker);
      }
      isactive.value = false;
    };
    const onSearch = (value2) => {
      console.log("用户输入的搜索关键字:", value2);
      isactive.value = false;
      updateMapCenter();
    };
    const navshow = () => {
      const markersArray = markers.value || [];
      const userLocation = markersArray.find((marker) => marker.describe === "user_location");
      const distinctLocation = markersArray.find((marker) => marker.describe === "destinct_location");
      if (userLocation && distinctLocation) {
        const start = { latitude: userLocation.latitude, longitude: userLocation.longitude };
        const end = { latitude: distinctLocation.latitude, longitude: distinctLocation.longitude };
        common_vendor.wx$1.request({
          url: "https://apis.map.qq.com/ws/direction/v1/driving/",
          data: {
            from: `${start.latitude},${start.longitude}`,
            to: `${end.latitude},${end.longitude}`,
            key: "A7GBZ-RU4LT-3NTXB-V6ADO-YR2D3-TTBYQ"
          },
          success: (response) => {
            if (response.data.status === 0) {
              const coors = response.data.result.routes[0].polyline;
              for (let i = 2; i < coors.length; i++) {
                coors[i] = coors[i - 2] + coors[i] / 1e6;
              }
              const polylinePoints = [];
              for (let i = 0; i < coors.length; i += 2) {
                polylinePoints.push({
                  latitude: coors[i],
                  longitude: coors[i + 1]
                });
              }
              console.log("路线：", polylinePoints);
              polyline.value = [{
                points: polylinePoints,
                color: "#FF0000DD",
                width: 4
              }];
              console.log("路线总：", polyline.value);
              markers.value = markersArray.map((marker) => {
                if (marker.describe === "user_location") {
                  marker.iconPath = "../../static/img/透明图片.png";
                } else if (marker.describe === "destinct_location") {
                  marker.iconPath = "../../static/img/9终点.png";
                }
                return marker;
              });
              const mapContext = common_vendor.wx$1.createMapContext("myMap");
              mapContext.includePoints({
                points: polylinePoints,
                padding: [100, 100, 100, 100]
              });
            } else {
              console.error("获取路线数据失败:", response.data);
            }
          },
          fail: (error) => {
            console.error("请求失败:", error);
          }
        });
      } else {
        console.error("无法找到用户位置或目标位置");
      }
    };
    const updateMapCenterToUserLocation = () => {
      const userLocationMarker = markers.value.find((marker) => marker.describe === "user_location");
      if (userLocationMarker) {
        console.log("标记：", markers);
        latitude.value = userLocationMarker.latitude;
        longitude.value = userLocationMarker.longitude;
      }
    };
    const removeDestinctLocationMarker = () => {
      markers.value = markers.value.filter((marker) => marker.describe !== "destinct_location");
    };
    const pointshow = () => {
      console.log("用户点击了按钮");
      console.log("markers:", markers.value);
      updateMapCenterToUserLocation();
      removeDestinctLocationMarker();
      console.log("更新后的标记:", markers.value);
    };
    const onRegionChange = (e) => {
      if (e.type === "end") {
        const { centerLocation } = e.detail;
        if (centerLocation) {
          latitude.value = centerLocation.lat;
          longitude.value = centerLocation.lng;
        }
      }
    };
    const onFocus = () => {
    };
    const onBlur = () => {
      isactive.value = false;
    };
    common_vendor.onMounted(() => {
      common_vendor.wx$1.authorize({
        scope: "scope.userLocation",
        success: getLocation,
        fail: () => {
          common_vendor.wx$1.showToast({
            title: "请授权地理位置信息",
            icon: "none"
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onChange),
        b: common_vendor.o(onSearch),
        c: common_vendor.o(onSearch),
        d: common_vendor.o(onFocus),
        e: common_vendor.o(onBlur),
        f: common_vendor.o(($event) => keyword.value = $event),
        g: common_vendor.p({
          placeholder: "输入目的地以查询避险路线",
          height: "80",
          shape: "round",
          bgColor: "#ecf5ff",
          borderColor: "#9227e1",
          actionText: "搜索",
          showAction: true,
          clearable: true,
          animation: false,
          searchIcon: "search",
          modelValue: keyword.value
        }),
        h: isactive.value
      }, isactive.value ? {
        i: common_vendor.f(recommendedPlaces.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.address),
            c: index,
            d: common_vendor.o(($event) => selectPlace(item), index)
          };
        })
      } : {}, {
        j: common_vendor.o(($event) => waycurrent.value = $event),
        k: common_vendor.p({
          list: waylist.value,
          mode: "button",
          ["active-color"]: "#9227e1",
          ["bg-color"]: "#ecf5ff",
          modelValue: waycurrent.value
        }),
        l: common_vendor.o(($event) => show.value = true),
        m: common_vendor.o(($event) => currentrange.value = $event),
        n: common_vendor.p({
          list: list_range.value,
          mode: "button",
          ["active-color"]: "#9227e1",
          ["bg-color"]: "#ededed",
          modelValue: currentrange.value
        }),
        o: common_vendor.o(($event) => show.value = $event),
        p: common_vendor.p({
          mode: "bottom",
          height: "20%",
          modelValue: show.value
        }),
        q: common_vendor.o(($event) => timeshow.value = true),
        r: visible.value
      }, visible.value ? {
        s: common_vendor.f(years.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item === 0 ? "所有时间段" : item + "年"),
            b: index
          };
        }),
        t: indicatorStyle.value,
        v: value.value,
        w: common_vendor.o(bindChange)
      } : {}, {
        x: common_vendor.o(($event) => timeshow.value = $event),
        y: common_vendor.p({
          mode: "bottom",
          height: "40%",
          modelValue: timeshow.value
        }),
        z: common_vendor.o(pointshow),
        A: common_vendor.o(navshow),
        B: isActive1.value ? activeIcon : inactiveIcon,
        C: common_vendor.o(toggleIcon1),
        D: isActive2.value ? activeIcon : inactiveIcon,
        E: common_vendor.o(toggleIcon2),
        F: isActive3.value ? activeIcon : inactiveIcon,
        G: common_vendor.o(toggleIcon3),
        H: isActive4.value ? activeIcon : inactiveIcon,
        I: common_vendor.o(toggleIcon4),
        J: isActive5.value ? activeIcon : inactiveIcon,
        K: common_vendor.o(toggleIcon5),
        L: common_vendor.o(($event) => current.value = $event),
        M: common_vendor.p({
          list: list.value,
          mode: "button",
          ["active-color"]: "#9227e1",
          ["bg-color"]: "#ededed",
          modelValue: current.value
        }),
        N: latitude.value,
        O: longitude.value,
        P: markers.value,
        Q: common_vendor.o(onRegionChange),
        R: polygons.value,
        S: polyline.value,
        T: current.value === 1
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/moanyan/dachuang/生命线/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
