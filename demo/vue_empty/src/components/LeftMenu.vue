<template>
    <section class="menu_page">
        <el-row>
             <el-col>
                 <el-menu :default-active="activeIndex" unique-opened mode="vertical" background-color="#324057" text-color="#fff" active-text-color="#409eff" class="menu">
                    <!-- 首页 -->
                    <router-link to="/home">
                        <el-menu-item index="0">
                            <i class="fa fa-server"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>

                    <!-- 账号管理 -->
                    <!--<router-link to="/account_manager">
                        <el-menu-item index="1">
                            <i class="fa fa-user"></i>
                            <span slot="title">账号管理</span>
                        </el-menu-item>
                    </router-link>-->

                    <!-- 二级菜单 -->
                    <template  v-for="item in items" >
                        <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                            <template slot="title">
                                <i :class="'fa fa-margin '+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </template>
                            <router-link v-for="(citem,cindex) in item.children"
                                :to="citem.path" :key="cindex" class="menu_child">
                                <el-menu-item
                                    :index='citem.path'>
                                    <span slot="title">{{citem.name}}</span>
                                </el-menu-item>
                            </router-link>
                        </el-submenu>
                    </template>
                 </el-menu>
             </el-col>
        </el-row>
    </section>
</template>

<script>
export default {
    name: "leftmenu",

    data() {
        return {
            items: [
                {
                    icon: "fa fa-bullseye",
                    name: "test",
                    path: "test",
                    children: [
                        /* { path: "/test", name: "test" },
                        { path: "/test1", name: "test1" },
                        { path: "/test_map", name: "test_map" },
                        { path: "/test_map1", name: "test_map1" },
                        { path: "/test_map2", name: "test_map2" },
                        { path: "/test_map3", name: "test_map3" },
                        { path: "/test_map4", name: "test_map4" },
                        { path: "/test_map5", name: "test_map5" }, */
                        { path: "/test_map6", name: "test_map6" },
                        // { path: "/test_map7", name: "test_map7" },
                        { path: "/test_map8", name: "test_map8" },
                    ]
                },
                {
                    icon: "fa fa-bullseye",
                    name: "超市管理",
                    path: "超市管理",
                    children: [
                        { path: "/merchandise_order", name: "商品订单" },
                        { path: "/commodity", name: "商品管理" },
                        { path: "/commodity_classification", name: "商品分类" },
                    ]
                },
                {
                    icon: "fa fa-university",
                    name: "食堂管理",
                    path: "食堂管理",
                    children: [
                        { path: "/food_products", name: "餐品管理" },
                        { path: "/food_products_order", name: "餐品订单" },
                    ]
                },
            ]
        };
    },

    // 解决路由跳转导航不高亮问题
    computed:{
        activeIndex(){
            let pathName = this.$route.path.replace('/','');
            console.log(pathName)

            switch (pathName) {
                case "home":
                    return "0";
                    break;
                case "test_map6":
                    return "1";
                    break;
            }
        },
    },
};
</script>

<style  lang="less" scoped>
.menu_page {
    width: 100%;
    height: 100%;

    .menu {
        border: none;

        span {
            margin-left: 8px;
            color: @sideFontColor;
        }

        li.is-opened {
            .el-submenu__title {
                i {
                    color: @sideIconColor;
                }
            }

            ul.el-menu {
                a.router-link-active {
                    li {
                        background-color: @sideHighColor !important;
                    }   
                }
            }
        }
    }
}
</style>
