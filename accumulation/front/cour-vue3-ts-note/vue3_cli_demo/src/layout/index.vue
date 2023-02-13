<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Main from './main/index.vue'
import Aside from './aside/index.vue'
import Header from './header/index.vue'
import { ref, toRefs, reactive } from 'vue'
</script>
<style lang="scss" scoped></style>
