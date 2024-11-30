"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-subsection",
  emits: ["change", "update:modelValue", "input"],
  props: {
    // tab的数据
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: [String, Number],
      default: 0
    },
    modelValue: {
      type: [String, Number],
      default: 0
    },
    // 当前活动的tab的index
    current: {
      type: [Number, String],
      default: 0
    },
    // 激活的颜色
    activeColor: {
      type: String,
      default: "#303133"
    },
    // 未激活的颜色
    inactiveColor: {
      type: String,
      default: "#606266"
    },
    // 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
    mode: {
      type: String,
      default: "button"
    },
    // 字体大小，单位rpx
    fontSize: {
      type: [Number, String],
      default: 28
    },
    // 是否开启动画效果
    animation: {
      type: Boolean,
      default: true
    },
    // 组件的高度，单位rpx
    height: {
      type: [Number, String],
      default: 70
    },
    // 激活tab的字体是否加粗
    bold: {
      type: Boolean,
      default: true
    },
    // mode=button时，组件背景颜色
    bgColor: {
      type: String,
      default: "#eeeeef"
    },
    // mode = button时，滑块背景颜色
    buttonColor: {
      type: String,
      default: "#ffffff"
    },
    // 在切换分段器的时候，是否让设备震一下
    vibrateShort: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Array,
      default: function() {
        return [0, 0];
      }
    }
  },
  data() {
    return {
      itemBgStyle: {
        width: 0,
        left: 0,
        backgroundColor: "#ffffff",
        height: "100%",
        transition: ""
      },
      currentIndex: this.current,
      buttonPadding: 3,
      // mode = button 时，组件的内边距
      borderRadius: 5,
      // 圆角值
      firstTimeVibrateShort: true,
      // 组件初始化时，会触发current变化，此时不应震动
      listInfo: []
    };
  },
  watch: {
    valueCom: {
      immediate: true,
      handler(nVal) {
        if (!nVal)
          nVal = 0;
        this.currentIndex = nVal;
        this.changeSectionStatus(nVal);
      }
    },
    current: {
      immediate: true,
      handler(nVal) {
        if (!nVal)
          nVal = this.valueCom || 0;
        this.currentIndex = nVal;
        this.changeSectionStatus(nVal);
      }
    },
    list: {
      deep: true,
      handler(nVal = []) {
        this.listInfoFn();
        setTimeout(() => {
          this.getTabsInfo();
        }, 10);
      }
    }
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    // 设置mode=subsection时，滑块特有的样式
    noBorderRight() {
      return (index) => {
        if (this.mode != "subsection")
          return;
        let classs = "";
        if (index < this.list.length - 1)
          classs += " u-none-border-right";
        if (index == 0)
          classs += " u-item-first";
        if (index == this.list.length - 1)
          classs += " u-item-last";
        return classs;
      };
    },
    // 文字的样式
    textStyle() {
      return (index) => {
        let style = {};
        if (this.mode == "subsection") {
          if (index == this.currentIndex) {
            style.color = "#ffffff";
          } else {
            style.color = this.activeColor;
          }
        } else {
          if (index == this.currentIndex) {
            style.color = this.activeColor;
          } else {
            style.color = this.inactiveColor;
          }
        }
        if (index == this.currentIndex && this.bold)
          style.fontWeight = "bold";
        style.fontSize = this.fontSize + "rpx";
        return style;
      };
    },
    // 每个分段器item的样式
    itemStyle() {
      return (index) => {
        let style = {};
        if (this.mode == "subsection") {
          style.borderColor = this.activeColor;
          style.borderWidth = "1px";
          style.borderStyle = "solid";
        }
        return style;
      };
    },
    // mode=button时，外层view的样式
    subsectionStyle() {
      let style = {};
      style.height = common_vendor.index.upx2px(this.height) + "px";
      if (this.mode == "button") {
        style.backgroundColor = this.bgColor;
        style.padding = `${this.buttonPadding}px`;
        style.borderRadius = `${this.borderRadius}px`;
      }
      return style;
    },
    // 滑块的样式
    itemBarStyle() {
      let style = {};
      style.backgroundColor = this.activeColor;
      style.zIndex = 1;
      if (this.mode == "button") {
        style.backgroundColor = this.buttonColor;
        style.borderRadius = `${this.borderRadius}px`;
        style.bottom = `${this.buttonPadding}px`;
        style.height = common_vendor.index.upx2px(this.height) - this.buttonPadding * 2 + "px";
        style.zIndex = 0;
      }
      return Object.assign(this.itemBgStyle, style);
    }
  },
  mounted() {
    this.listInfoFn();
    setTimeout(() => {
      this.getTabsInfo();
    }, 10);
  },
  methods: {
    listInfoFn() {
      this.listInfo = this.list.map((val, index) => {
        if (typeof val != "object") {
          let obj = {
            width: 0,
            name: val
          };
          return obj;
        } else {
          return val;
        }
      });
      return this.listInfo;
    },
    // 改变滑块的样式
    changeSectionStatus(nVal) {
      if (this.mode == "subsection") {
        if (nVal == this.list.length - 1) {
          this.itemBgStyle.borderRadius = `0 ${this.buttonPadding}px ${this.buttonPadding}px 0`;
        }
        if (nVal == 0) {
          this.itemBgStyle.borderRadius = `${this.buttonPadding}px 0 0 ${this.buttonPadding}px`;
        }
        if (nVal > 0 && nVal < this.list.length - 1) {
          this.itemBgStyle.borderRadius = "0";
        }
      }
      setTimeout(() => {
        this.itemBgLeft();
      }, 10);
      if (this.vibrateShort && !this.firstTimeVibrateShort) {
        common_vendor.index.vibrateShort();
      }
      this.firstTimeVibrateShort = false;
    },
    click(index) {
      if (index == this.currentIndex)
        return;
      this.currentIndex = index;
      this.changeSectionStatus(index);
      this.$emit("change", Number(index));
      this.$emit("input", Number(index));
      this.$emit("update:modelValue", Number(index));
    },
    // 获取各个tab的节点信息
    getTabsInfo() {
      let view = common_vendor.index.createSelectorQuery().in(this);
      for (let i = 0; i < this.list.length; i++) {
        view.select(".u-item-" + i).boundingClientRect();
      }
      view.exec((res) => {
        if (!res.length) {
          setTimeout(() => {
            this.getTabsInfo();
            return;
          }, 10);
        }
        res.map((val, index) => {
          this.listInfo[index].width = val.width;
        });
        if (this.mode == "subsection") {
          this.itemBgStyle.width = this.listInfo[0].width + "px";
        } else if (this.mode == "button") {
          this.itemBgStyle.width = this.listInfo[0].width + "px";
        }
        this.itemBgLeft();
      });
    },
    itemBgLeft() {
      if (this.animation) {
        this.itemBgStyle.transition = "all 0.35s";
      } else {
        this.itemBgStyle.transition = "all 0s";
      }
      let left = 0;
      this.listInfo.map((val, index) => {
        if (index < this.currentIndex)
          left += val.width;
      });
      if (this.mode == "subsection") {
        this.itemBgStyle.left = left + "px";
      } else if (this.mode == "button") {
        this.itemBgStyle.left = left + this.buttonPadding + "px";
      }
    }
  }
};
if (!Array) {
  const _easycom_u_badge2 = common_vendor.resolveComponent("u-badge");
  _easycom_u_badge2();
}
const _easycom_u_badge = () => "../u-badge/u-badge.js";
if (!Math) {
  _easycom_u_badge();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.listInfo, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.s($options.textStyle(index)),
        c: item.num > 0
      }, item.num > 0 ? {
        d: "ea8687ee-0-" + i0,
        e: common_vendor.p({
          count: item.num,
          offset: $props.offset,
          size: "mini"
        })
      } : {}, {
        f: common_vendor.s($options.itemStyle(index)),
        g: common_vendor.o(($event) => $options.click(index), index),
        h: common_vendor.n($options.noBorderRight(index)),
        i: common_vendor.n("u-item-" + index),
        j: index
      });
    }),
    b: common_vendor.s($options.itemBarStyle),
    c: common_vendor.s($options.subsectionStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ea8687ee"], ["__file", "E:/moanyan/dachuang/生命线/uni_modules/vk-uview-ui/components/u-subsection/u-subsection.vue"]]);
wx.createComponent(Component);
