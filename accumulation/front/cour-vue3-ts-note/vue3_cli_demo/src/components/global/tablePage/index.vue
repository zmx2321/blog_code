<template>
  <section class="table_wrap">
    <div class="title_wrap mb20" v-if="showTitle">
      <!-- <b class="fl mr8" v-if="showBack" @click="goBack()">&lt;</b>
      <h3>{{ title }}</h3> -->
      <SvgIcon name="icon-back1" v-if="showBack" @click="goBack()" color="#fff" class="ft24 pointer animate menu-icon mr8 fl"></SvgIcon>
      <h3>{{ title }}</h3>
    </div>

    <!-- 查询表单 -->
    <div class="page_search mb8" flex="main:justify" v-if="showForm">
      <div class="page_search_wrap" flex>
        <!-- 表单元素 -->
        <slot name="pageSearch" :formData="formData"></slot>
        <div class="btn_wrap">
          <ul>
            <li class="mr8">
              <el-button type="primary" @click="searchHolder()">查询</el-button>
            </li>
            <li>
              <el-button @click="resetFrom()">重置</el-button>
            </li>
          </ul>
        </div>
      </div>
      <ul class="fr" v-if="showRightBtn">
        <li>
          <el-button type="primary" @click="rightBtnFun1()">{{ rightBtnMsg }}</el-button>
        </li>
        <!-- 如果还有其他的按钮 -->
        <slot name="rightBtnOther"></slot>
      </ul>
    </div>

    <!-- 表格 -->
    <div class="table_content">
      <slot name="tableContent"></slot>
    </div>
  </section>
</template>

<script setup>
// 引入vue3功能模块
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 工具
import { deepClone } from '@/utils/tools'

// 父组件参数
const props = defineProps({
  showBack: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  showForm: {
    type: Boolean,
    default: true
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  showRightBtn: {
    type: Boolean,
    default: false
  },
  rightBtnMsg: {
    type: String,
    default: ''
  }
})

// 初始化工具
const emit = defineEmits(['resetFrom', 'searchHolder', 'rightBtnFun1'])
const router = useRouter()

/**
 * 表单相关
 */
// 返回
const goBack = () => {
  router.go(-1)
}
// 初始化表单数据
let formData = ref({})
// 初始化表单数据
const resetFrom = () => {
  // console.log('初始化表单数据')
  formData.value = {}
  emit('resetFrom')
}
// 查询表单数据
const searchHolder = () => {
  // console.log('查询表单数据', formData.value)

  // 深拷贝
  // let fromDataAsync = deepClone(formData.value)
  let fromDataAsync = JSON.parse(JSON.stringify(formData.value))
  // console.log(fromDataAsync)
  emit('searchHolder', fromDataAsync)
}
// 右边按钮1
const rightBtnFun1 = () => {
  // console.log('右边按钮1')

  emit('rightBtnFun1')
}
</script>

<style lang="scss" scoped>
.page_search_wrap {
  // width: 75%;

  .btn_wrap {
    min-width: 178px;
  }
}

.table_wrap {
  width: 100%;
  overflow: hidden;

  ul {
    li {
      display: inline-block;
      list-style: none;
    }
  }

  .title_wrap {
    b {
      cursor: pointer;
    }
  }
}
</style>
