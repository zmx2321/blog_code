<template>
    <section class="main_cont">
        <div class="box" style="font-size:15px"></div>
        <h2>111</h2>
        <el-button @click="aa">aa</el-button>
    </section>
</template>

<script>
export default {
    name: "Commodity",

    methods: {
        aa() {
            this.$message.success("123")
        }
    }
}
</script>

<style lang="less" scoped>
h2 {

}

.box {
    width: 100px /*no*/;
    height: 100px;
    background: #f00;
}
</style>