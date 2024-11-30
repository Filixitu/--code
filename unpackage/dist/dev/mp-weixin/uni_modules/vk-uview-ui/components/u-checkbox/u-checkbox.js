"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-checkbox",
  emits: ["update:modelValue", "input", "change"],
  props: {
    // 是否为选中状态
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    // checkbox的名称
    name: {
      type: [String, Number],
      default: ""
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: ""
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: ""
    },
    // 是否禁止点击提示语选中复选框
    labelDisabled: {
      type: [String, Boolean],
      default: ""
    },
    // 选中状态下的颜色，如设置此值，将会覆盖checkboxGroup的activeColor值
    activeColor: {
      type: String,
      default: ""
    },
    // 图标的大小，单位rpx
    iconSize: {
      type: [String, Number],
      default: ""
    },
    // label的字体大小，rpx单位
    labelSize: {
      type: [String, Number],
      default: ""
    },
    // 组件的整体大小
    size: {
      type: [String, Number],
      default: ""
    },
    // 设置不确定状态，仅负责样式控制
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parentDisabled: false,
      newParams: {}
    };
  },
  created() {
    this.parent = this.$u.$parent.call(this, "u-checkbox-group");
    this.parent && this.parent.children.push(this);
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    // 是否禁用，如果父组件u-checkbox-group禁用的话，将会忽略子组件的配置
    isDisabled() {
      return this.disabled !== "" ? this.disabled : this.parent ? this.parent.disabled : false;
    },
    // 是否禁用label点击
    isLabelDisabled() {
      return this.labelDisabled !== "" ? this.labelDisabled : this.parent ? this.parent.labelDisabled : false;
    },
    // 组件尺寸，对应size的值，默认值为34rpx
    checkboxSize() {
      return this.size ? this.size : this.parent ? this.parent.size : 34;
    },
    // 组件的勾选图标的尺寸，默认20
    checkboxIconSize() {
      return this.iconSize ? this.iconSize : this.parent ? this.parent.iconSize : 20;
    },
    // 组件选中激活时的颜色
    elActiveColor() {
      return this.activeColor ? this.activeColor : this.parent ? this.parent.activeColor : "primary";
    },
    // 组件的形状
    elShape() {
      return this.shape ? this.shape : this.parent ? this.parent.shape : "square";
    },
    iconStyle() {
      let style = {};
      if (this.elActiveColor && this.valueCom && !this.isDisabled) {
        style.borderColor = this.elActiveColor;
        style.backgroundColor = this.elActiveColor;
      }
      style.width = this.$u.addUnit(this.checkboxSize);
      style.height = this.$u.addUnit(this.checkboxSize);
      return style;
    },
    // checkbox内部的勾选图标，如果选中状态，为白色，否则为透明色即可
    iconColor() {
      if (this.indeterminate)
        return "#ffffff";
      return this.valueCom ? "#ffffff" : "transparent";
    },
    iconClass() {
      let classes = [];
      classes.push("u-checkbox__icon-wrap--" + this.elShape);
      if (this.valueCom == true)
        classes.push("u-checkbox__icon-wrap--checked");
      if (this.isDisabled)
        classes.push("u-checkbox__icon-wrap--disabled");
      if (this.valueCom && this.isDisabled)
        classes.push("u-checkbox__icon-wrap--disabled--checked");
      if (this.indeterminate === true)
        classes.push("u-checkbox__icon-wrap--indeterminate");
      return classes.join(" ");
    },
    checkboxStyle() {
      let style = {};
      if (this.parent && this.parent.width) {
        style.width = this.parent.width;
        style.float = "left";
      }
      if (this.parent && this.parent.wrap) {
        style.width = "100%";
      }
      return style;
    }
  },
  mounted() {
    this._emitEvent();
  },
  watch: {
    valueCom: {
      handler: function(newVal, oldVal) {
        this._emitEvent();
      }
    }
  },
  methods: {
    _emitEvent() {
      let value = this.valueCom;
      let obj = {
        value,
        name: this.name
      };
      if (this.parent && this.parent.emitEvent)
        this.parent.emitEvent(obj);
    },
    onClickLabel() {
      if (!this.isLabelDisabled && !this.isDisabled) {
        this.setValue();
      }
    },
    toggle() {
      if (!this.isDisabled) {
        this.setValue();
      }
    },
    emitEvent() {
      let obj = {
        value: !this.valueCom,
        name: this.name
      };
      this.$emit("change", obj);
      if (this.parent && this.parent.emitEvent)
        this.parent.emitEvent(obj);
    },
    // 设置input的值，这里通过input事件，设置通过v-model绑定的组件的值
    setValue() {
      let value = this.valueCom;
      let checkedNum = 0;
      if (this.parent && this.parent.children) {
        this.parent.children.map((val) => {
          if (val.value)
            checkedNum++;
        });
      }
      if (value == true) {
        this.emitEvent();
        this.$emit("input", !value);
        this.$emit("update:modelValue", !value);
      } else {
        if (this.parent && checkedNum >= this.parent.max) {
          return this.$u.toast(`最多可选${this.parent.max}项`);
        }
        this.emitEvent();
        this.$emit("input", !value);
        this.$emit("update:modelValue", !value);
      }
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.indeterminate
  }, $props.indeterminate ? {
    b: common_vendor.p({
      name: "minus",
      size: $options.checkboxIconSize,
      color: $options.iconColor
    })
  } : {
    c: common_vendor.p({
      name: "checkbox-mark",
      size: $options.checkboxIconSize,
      color: $options.iconColor
    })
  }, {
    d: common_vendor.o((...args) => $options.toggle && $options.toggle(...args)),
    e: common_vendor.n($options.iconClass),
    f: common_vendor.s($options.iconStyle),
    g: common_vendor.o((...args) => $options.onClickLabel && $options.onClickLabel(...args)),
    h: _ctx.$u.addUnit($props.labelSize),
    i: common_vendor.s($options.checkboxStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cafae08d"], ["__file", "E:/moanyan/dachuang/生命线/uni_modules/vk-uview-ui/components/u-checkbox/u-checkbox.vue"]]);
wx.createComponent(Component);
