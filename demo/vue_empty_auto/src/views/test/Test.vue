<template>
    <section class="main_cont">
        <h2 style="margin-bottom: 50px">test</h2>

        <el-select v-model="selectValue" @change="langChange" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <input type="text" :placeholder="$t('message.hello')">
        {{$t('message.hello')}}

        {{$t('message.hello')}}

        <p v-html="$t('message.hello')"></p>
    </section>
</template>

<script>
export default {
    name: "Test",

    data () {
        return {
            selectValue: '',
            options: [
                {
                    value: 'cn',
                    label: '中文'
                }, {
                    value: 'en',
                    label: 'English'
                }
            ]
        }
    },

    methods: {
        // 语言切换
        langChange(e){
            this.$confirm(this.$t('btn.down'))
                .then(() => {
                    // console.log(e)
                    localStorage.setItem('lang',e);
                    this.$i18n.locale = e;
                }).catch(() => {});

        }
    },
    created : function(){
        console.log(this.$i18n.locale)

        let that = this;
        console.log(localStorage.lang)
        that.selectValue = localStorage.lang == undefined?'cn':localStorage.lang
    }
}
</script>

<style lang="less" scoped>

</style>