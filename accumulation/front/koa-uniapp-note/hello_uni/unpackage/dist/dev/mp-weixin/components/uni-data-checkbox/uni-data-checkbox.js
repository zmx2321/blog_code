(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/uni-data-checkbox/uni-data-checkbox"],{

/***/ 1167:
/*!***********************************************************************************!*\
  !*** E:/demo/uniapp/hello_uni/components/uni-data-checkbox/uni-data-checkbox.vue ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-data-checkbox.vue?vue&type=template&id=250d7450&scoped=true& */ 1168);
/* harmony import */ var _uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-data-checkbox.vue?vue&type=script&lang=js& */ 1170);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_data_checkbox_vue_vue_type_style_index_0_id_250d7450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-data-checkbox.vue?vue&type=style&index=0&id=250d7450&scoped=true&lang=css& */ 1174);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 12);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "250d7450",
  null,
  false,
  _uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/uni-data-checkbox/uni-data-checkbox.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 1168:
/*!******************************************************************************************************************************!*\
  !*** E:/demo/uniapp/hello_uni/components/uni-data-checkbox/uni-data-checkbox.vue?vue&type=template&id=250d7450&scoped=true& ***!
  \******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-data-checkbox.vue?vue&type=template&id=250d7450&scoped=true& */ 1169);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_template_id_250d7450_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 1169:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/demo/uniapp/hello_uni/components/uni-data-checkbox/uni-data-checkbox.vue?vue&type=template&id=250d7450&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniLoadMore: function() {
      return Promise.all(/*! import() | components/uni-load-more/uni-load-more */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-load-more/uni-load-more")]).then(__webpack_require__.bind(null, /*! @/components/uni-load-more/uni-load-more.vue */ 1226))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 1170:
/*!************************************************************************************************************!*\
  !*** E:/demo/uniapp/hello_uni/components/uni-data-checkbox/uni-data-checkbox.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-data-checkbox.vue?vue&type=script&lang=js& */ 1171);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1171:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/demo/uniapp/hello_uni/components/uni-data-checkbox/uni-data-checkbox.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * DataChecklist 数据选择器
 * @description 通过数据渲染 checkbox 和 radio
 * @tutorial https://ext.dcloud.net.cn/plugin?id=xxx
 * @property {String} mode = [default| list | button | tag] 显示模式
 * @value default  	默认横排模式
 * @value list		列表模式
 * @value button	按钮模式
 * @value tag 		标签模式
 * @property {Boolean} multiple = [true|false] 是否多选
 * @property {Array|String|Number} value 默认值
 * @property {Array} localdata 本地数据 ，格式 [{text:'',value:''}]
 * @property {Number|String} min 最小选择个数 ，multiple为true时生效
 * @property {Number|String} max 最大选择个数 ，multiple为true时生效
 * @property {Boolean} wrap 是否换行显示
 * @property {String} icon = [left|right]  list 列表模式下icon显示位置
 * @property {Boolean} selectedColor 选中颜色
 * @property {Boolean} emptyText 没有数据时显示的文字 ，本地数据无效
 * @property {Boolean} selectedTextColor 选中文本颜色，如不填写则自动显示
 * @property {Object} map 字段映射， 默认 map={text:'text',value:'value'}
 * @value left 左侧显示
 * @value right 右侧显示
 * @event {Function} change  选中发生变化触发
 */

// import clientdb from './clientdb.js'
var _default2 = {
  name: 'uniDataChecklist',
  // mixins: [clientdb],
  mixins: [uniCloud.mixinDatacom || {}],
  // model: {
  // 	prop: 'modelValue',
  // 	event: 'update:modelValue'
  // },
  emits: ['input', 'update:modelValue', 'change'],
  props: {
    mode: {
      type: String,
      default: 'default' },


    multiple: {
      type: Boolean,
      default: false },

    value: {
      type: [Array, String, Number],
      default: function _default() {
        return '';
      } },

    // TODO vue3
    modelValue: {
      type: [Array, String, Number],
      default: function _default() {
        return '';
      } },

    localdata: {
      type: Array,
      default: function _default() {
        return [];
      } },

    min: {
      type: [Number, String],
      default: '' },

    max: {
      type: [Number, String],
      default: '' },

    wrap: {
      type: Boolean,
      default: false },

    icon: {
      type: String,
      default: 'left' },

    selectedColor: {
      type: String,
      default: '' },

    selectedTextColor: {
      type: String,
      default: '' },

    emptyText: {
      type: String,
      default: '暂无数据' },

    disabled: {
      type: Boolean,
      default: false },

    map: {
      type: Object,
      default: function _default() {
        return {
          text: 'text',
          value: 'value' };

      } } },


  watch: {
    localdata: {
      handler: function handler(newVal) {
        this.range = newVal;
        this.dataList = this.getDataList(this.getSelectedValue(newVal));
      },
      deep: true },

    mixinDatacomResData: function mixinDatacomResData(newVal) {
      this.range = newVal;
      this.dataList = this.getDataList(this.getSelectedValue(newVal));
    },
    value: function value(newVal) {
      this.dataList = this.getDataList(newVal);
      // fix by mehaotian is_reset 在 uni-forms 中定义
      if (!this.is_reset) {
        this.is_reset = false;
        this.formItem && this.formItem.setValue(newVal);
      }
    },
    modelValue: function modelValue(newVal) {
      this.dataList = this.getDataList(newVal);
      if (!this.is_reset) {
        this.is_reset = false;
        this.formItem && this.formItem.setValue(newVal);
      }
    } },

  data: function data() {
    return {
      dataList: [],
      range: [],
      contentText: {
        contentdown: '查看更多',
        contentrefresh: '加载中',
        contentnomore: '没有更多' },

      isLocal: true,
      styles: {
        selectedColor: '#007aff',
        selectedTextColor: '#333' },

      isTop: 0 };

  },
  computed: {
    dataValue: function dataValue() {
      if (this.value === '') return this.modelValue;
      if (this.modelValue === '') return this.value;
      return this.value;
    } },

  created: function created() {
    this.form = this.getForm('uniForms');
    this.formItem = this.getForm('uniFormsItem');
    // this.formItem && this.formItem.setValue(this.value)

    if (this.formItem) {
      this.isTop = 6;
      if (this.formItem.name) {
        // 如果存在name添加默认值,否则formData 中不存在这个字段不校验
        if (!this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(this.dataValue);
        }
        this.rename = this.formItem.name;
        this.form.inputChildrens.push(this);
      }
    }

    if (this.localdata && this.localdata.length !== 0) {
      this.isLocal = true;
      this.range = this.localdata;
      this.dataList = this.getDataList(this.getSelectedValue(this.range));
    } else {
      if (this.collection) {
        this.isLocal = false;
        this.loadData();
      }
    }
  },
  methods: {
    loadData: function loadData() {var _this = this;
      this.mixinDatacomGet().then(function (res) {
        _this.mixinDatacomResData = res.result.data;
        if (_this.mixinDatacomResData.length === 0) {
          _this.isLocal = false;
          _this.mixinDatacomErrorMessage = _this.emptyText;
        } else {
          _this.isLocal = true;
        }
      }).catch(function (err) {
        _this.mixinDatacomErrorMessage = err.message;
      });
    },
    /**
        * 获取父元素实例
        */
    getForm: function getForm() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'uniForms';
      var parent = this.$parent;
      var parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    chagne: function chagne(e) {var _this2 = this;
      var values = e.detail.value;

      var detail = {
        value: [],
        data: [] };


      if (this.multiple) {
        this.range.forEach(function (item) {

          if (values.includes(item[_this2.map.value] + '')) {
            detail.value.push(item[_this2.map.value]);
            detail.data.push(item);
          }
        });
      } else {
        var range = this.range.find(function (item) {return item[_this2.map.value] + '' === values;});
        if (range) {
          detail = {
            value: range[this.map.value],
            data: range };

        }
      }
      this.formItem && this.formItem.setValue(detail.value);
      // TODO 兼容 vue2
      this.$emit('input', detail.value);
      // // TOTO 兼容 vue3
      this.$emit('update:modelValue', detail.value);
      this.$emit('change', {
        detail: detail });

      if (this.multiple) {
        // 如果 v-model 没有绑定 ，则走内部逻辑
        // if (this.value.length === 0) {
        this.dataList = this.getDataList(detail.value, true);
        // }
      } else {
        this.dataList = this.getDataList(detail.value);
      }
    },

    /**
        * 获取渲染的新数组
        * @param {Object} value 选中内容
        */
    getDataList: function getDataList(value) {var _this3 = this;
      // 解除引用关系，破坏原引用关系，避免污染源数据
      var dataList = JSON.parse(JSON.stringify(this.range));
      var list = [];
      if (this.multiple) {
        if (!Array.isArray(value)) {
          value = [];
        }
      }
      dataList.forEach(function (item, index) {
        item.disabled = item.disable || item.disabled || false;
        if (_this3.multiple) {
          if (value.length > 0) {
            var have = value.find(function (val) {return val === item[_this3.map.value];});
            item.selected = have !== undefined;
          } else {
            item.selected = false;
          }
        } else {
          item.selected = value === item[_this3.map.value];
        }

        list.push(item);
      });
      return this.setRange(list);
    },
    /**
        * 处理最大最小值
        * @param {Object} list
        */
    setRange: function setRange(list) {var _this4 = this;
      var selectList = list.filter(function (item) {return item.selected;});
      var min = Number(this.min) || 0;
      var max = Number(this.max) || '';
      list.forEach(function (item, index) {
        if (_this4.multiple) {
          if (selectList.length <= min) {
            var have = selectList.find(function (val) {return val[_this4.map.value] === item[_this4.map.value];});
            if (have !== undefined) {
              item.disabled = true;
            }
          }

          if (selectList.length >= max && max !== '') {
            var _have = selectList.find(function (val) {return val[_this4.map.value] === item[_this4.map.value];});
            if (_have === undefined) {
              item.disabled = true;
            }
          }
        }
        _this4.setStyles(item, index);
        list[index] = item;
      });
      return list;
    },
    /**
        * 设置 class
        * @param {Object} item
        * @param {Object} index
        */
    setStyles: function setStyles(item, index) {
      //  设置自定义样式
      item.styleBackgroud = this.setStyleBackgroud(item);
      item.styleIcon = this.setStyleIcon(item);
      item.styleIconText = this.setStyleIconText(item);
      item.styleRightIcon = this.setStyleRightIcon(item);
    },

    /**
        * 获取选中值
        * @param {Object} range
        */
    getSelectedValue: function getSelectedValue(range) {var _this5 = this;
      if (!this.multiple) return this.dataValue;
      var selectedArr = [];
      range.forEach(function (item) {
        if (item.selected) {
          selectedArr.push(item[_this5.map.value]);
        }
      });
      return this.dataValue.length > 0 ? this.dataValue : selectedArr;
    },

    /**
        * 设置背景样式
        */
    setStyleBackgroud: function setStyleBackgroud(item) {
      var styles = {};
      var selectedColor = this.selectedColor ? this.selectedColor : '#007aff';
      if (this.mode !== 'list') {
        styles['border-color'] = item.selected ? selectedColor : '#DCDFE6';
      }
      if (this.mode === 'tag') {
        styles['background-color'] = item.selected ? selectedColor : '#f5f5f5';
      }
      var classles = '';
      for (var i in styles) {
        classles += "".concat(i, ":").concat(styles[i], ";");
      }
      return classles;
    },
    setStyleIcon: function setStyleIcon(item) {
      var styles = {};
      var classles = '';
      var selectedColor = this.selectedColor ? this.selectedColor : '#007aff';
      styles['background-color'] = item.selected ? selectedColor : '#fff';
      styles['border-color'] = item.selected ? selectedColor : '#DCDFE6';

      if (!item.selected && item.disabled) {
        styles['background-color'] = '#F2F6FC';
        styles['border-color'] = item.selected ? selectedColor : '#DCDFE6';
      }

      for (var i in styles) {
        classles += "".concat(i, ":").concat(styles[i], ";");
      }
      return classles;
    },
    setStyleIconText: function setStyleIconText(item) {
      var styles = {};
      var classles = '';
      var selectedColor = this.selectedColor ? this.selectedColor : '#007aff';
      if (this.mode === 'tag') {
        styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : '#fff' : '#333';
      } else {
        styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : selectedColor : '#333';
      }
      if (!item.selected && item.disabled) {
        styles.color = '#999';
      }

      for (var i in styles) {
        classles += "".concat(i, ":").concat(styles[i], ";");
      }
      return classles;
    },
    setStyleRightIcon: function setStyleRightIcon(item) {
      var styles = {};
      var classles = '';
      if (this.mode === 'list') {
        styles['border-color'] = item.selected ? this.styles.selectedColor : '#DCDFE6';
      }
      for (var i in styles) {
        classles += "".concat(i, ":").concat(styles[i], ";");
      }

      return classles;
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 1172)["default"]))

/***/ }),

/***/ 1174:
/*!********************************************************************************************************************************************!*\
  !*** E:/demo/uniapp/hello_uni/components/uni-data-checkbox/uni-data-checkbox.vue?vue&type=style&index=0&id=250d7450&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_style_index_0_id_250d7450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-data-checkbox.vue?vue&type=style&index=0&id=250d7450&scoped=true&lang=css& */ 1175);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_style_index_0_id_250d7450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_style_index_0_id_250d7450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_style_index_0_id_250d7450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_style_index_0_id_250d7450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_data_checkbox_vue_vue_type_style_index_0_id_250d7450_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 1175:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/demo/uniapp/hello_uni/components/uni-data-checkbox/uni-data-checkbox.vue?vue&type=style&index=0&id=250d7450&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-data-checkbox/uni-data-checkbox.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-data-checkbox/uni-data-checkbox-create-component',
    {
        'components/uni-data-checkbox/uni-data-checkbox-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(1167))
        })
    },
    [['components/uni-data-checkbox/uni-data-checkbox-create-component']]
]);
