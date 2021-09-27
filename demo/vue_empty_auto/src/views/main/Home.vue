<template>
    <section class="home">
        <div class="container">
            <p class="lead">{{ title }}</p>
        </div>

        <ul class="bottom">
            <li>powered by</li>
            <li>
                <a href="http://xxx.com">xxx.com</a>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: "home",

    data () {
        return {
            // title: title
            title: this.$store.state.common.title
        }
    },

    methods: {
        // 获取vuex
        getData() {
            // this.$store.dispatch('SetUserInfo',{name:'张三'}) // 异步调用
            this.$store.commit('SET_USER_INFO',{name:'李四'}) // 同步调用

            // 在getter里面配置
            console.log("在getter里面配置-userInfo", this.$store.getters.userInfo.name);
            console.log("在getter里面配置-title", this.$store.getters.title);

            // 不走getter
            console.log("不走getter-userInfo", this.$store.state.user.userInfo.name)
            console.log("不走getter-title", this.$store.state.common.title)
        }
    },

    created (){
        // console.log(aa);
        this.getData()
    }
};
</script>

<style lang="less" scoped>
.home {
    padding: 0;
    width: 100%;
    height: 100%;
    background: url(../../assets/images/showcase.png) top no-repeat;
    background-size: 100% 100%;

    .container {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 100px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        color: white;

        .lead {
            margin-top: 50px;
            font-size: 22px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    .bottom{
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);

        li {
            display: inline-block;
            color: #757575;

            a {
                color: #757575;
                transition: 0.2s linear;

                &:hover {
                    color: #bdbdbd;
                    transition: 0.3s linear;
                }
            }
        }

        li:not(:last-child){
            margin-right: 8px;
        }
    }
}
</style>