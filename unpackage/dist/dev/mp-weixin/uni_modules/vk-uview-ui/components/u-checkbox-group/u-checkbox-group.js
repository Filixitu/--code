"use strict";
const uni_modules_vkUviewUi_libs_util_emitter = require("../../libs/util/emitter.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-checkbox-group",
  emits: ["update:modelValue", "input", "change"],
  mixins: [uni_modules_vkUviewUi_libs_util_emitter.Emitter],
  props: {
    // 匹配某一个radio组件，如果某个radio的name值等于此值，那么这个radio就被会选中
    value: {
      type: [String, Number, Array, Boolean],
      default: ""
    },
    modelValue: {
      type: [String, Number, Array, Boolean],
      default: ""
    },
    // 最多能选中多少个checkbox
    max: {
      type: [Number, String],
      default: 999
    },
    // 所有选中项的 name
    // value: {
    // 	default: Array,
    // 	default() {
    // 		return []
    // 	}
    // },
    // 是否禁用所有复选框
    disabled: {
      type: Boolean,
      default: false
    },
    // 在表单内提交时的标识符
    name: {
      type: [Boolean, String],
      default: ""
    },
    // 是否禁止点击提示语选中复选框
    labelDisabled: {
      type: Boolean,
      default: false
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: "square"
    },
    // 选中状态下的颜色
    activeColor: {
      type: String,
      default: "#2979ff"
    },
    // 组件的整体大小
    size: {
      type: [String, Number],
      default: 34
    },
    // 每个checkbox占u-checkbox-group的宽度
    width: {
      type: String,
      default: "auto"
    },
    // 是否每个checkbox都换行
    wrap: {
      type: Boolean,
      default: false
    },
    // 图标的大小，单位rpx
    iconSize: {
      type: [String, Number],
      default: 20
    }
  },
  data() {
    return {
      values: [],
      uFromData: {
        inputAlign: "left"
      }
    };
  },
  created() {
    this.children = [];
  },
  mounted() {
    let parent = this.$u.$parent.call(this, "u-form");
    if (parent) {
      Object.keys(this.uFromData).map((key) => {
        this.uFromData[key] = parent[key];
      });
    }
  },
  methods: {
    emitEvent(obj) {
      let values = this.values || [];
      if (obj.value) {
        let index = values.indexOf(obj.name);
        if (index === -1) {
          values.push(obj.name);
        }
      } else {
        let index = values.indexOf(obj.name);
        if (index > -1) {
          values.splice(index, 1);
        }
      }
      this.$emit("change", values);
      this.$emit("input", values);
      this.$emit("update:modelValue", values);
      setTimeout(() => {
        this.dispatch("u-form-item", "onFieldChange", values);
      }, 60);
    },
    _emitEvent(obj) {
      let values = this.values || [];
      if (obj.value) {
        let index = values.indexOf(obj.name);
        if (index === -1) {
          values.push(obj.name);
        }
      } else {
        let index = values.indexOf(obj.name);
        if (index > -1) {
          values.splice(index, 1);
        }
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.uFromData.inputAlign == "right" ? "flex-end" : "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6a8aa283"], ["__file", "E:/moanyan/dachuang/生命线/uni_modules/vk-uview-ui/components/u-checkbox-group/u-checkbox-group.vue"]]);
wx.createComponent(Component);
