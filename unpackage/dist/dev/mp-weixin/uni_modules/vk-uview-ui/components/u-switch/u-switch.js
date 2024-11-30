"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-switch",
  emits: ["update:modelValue", "input", "change"],
  props: {
    // 通过v-model双向绑定的值
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    // 是否为加载中状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否为禁用装填
    disabled: {
      type: Boolean,
      default: false
    },
    // 开关尺寸，单位rpx
    size: {
      type: [Number, String],
      default: 50
    },
    // 打开时的背景颜色
    activeColor: {
      type: String,
      default: "#2979ff"
    },
    // 关闭时的背景颜色
    inactiveColor: {
      type: String,
      default: "#ffffff"
    },
    // 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
    vibrateShort: {
      type: Boolean,
      default: false
    },
    // 打开选择器时的值
    activeValue: {
      type: [Number, String, Boolean],
      default: true
    },
    // 关闭选择器时的值
    inactiveValue: {
      type: [Number, String, Boolean],
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    switchStyle() {
      let style = {};
      style.fontSize = this.size + "rpx";
      style.backgroundColor = this.valueCom ? this.activeColor : this.inactiveColor;
      return style;
    },
    loadingColor() {
      return this.valueCom ? this.activeColor : null;
    }
  },
  methods: {
    onClick() {
      if (!this.disabled && !this.loading) {
        if (this.vibrateShort)
          common_vendor.index.vibrateShort();
        this.$emit("input", !this.valueCom);
        this.$emit("update:modelValue", !this.valueCom);
        this.$nextTick(() => {
          this.$emit("change", this.valueCom ? this.activeValue : this.inactiveValue);
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_u_loading2 = common_vendor.resolveComponent("u-loading");
  _easycom_u_loading2();
}
const _easycom_u_loading = () => "../u-loading/u-loading.js";
if (!Math) {
  _easycom_u_loading();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      show: $props.loading,
      size: $props.size * 0.6,
      color: $options.loadingColor
    }),
    b: _ctx.$u.addUnit($props.size),
    c: _ctx.$u.addUnit($props.size),
    d: common_vendor.n($options.valueCom == true ? "u-switch--on" : ""),
    e: common_vendor.n($props.disabled ? "u-switch--disabled" : ""),
    f: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    g: common_vendor.s($options.switchStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-033901d2"], ["__file", "E:/moanyan/dachuang/生命线/uni_modules/vk-uview-ui/components/u-switch/u-switch.vue"]]);
wx.createComponent(Component);
