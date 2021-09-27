<template>
    <section class="main_cont">
        <div class="filter_wrap">
            <el-button type="primary" @click="resetMap">初始化</el-button>
            <el-select v-model="selCityName" placeholder="请选择城市" @change="selectName">
                <el-option v-for="item in cityArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>

        <GeojsonMap ref="geojsonmap"
            @getcityArray="getcityArray" 
            @getGeoJsonData="getGeoJsonData"
        />

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>这是一段信息</span>
            <p>城市名称：{{ cityName }}</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false, resetForm()">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false, saveForm()">确 定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
import GeojsonMap from '@/components/tools/GeojsonMap'

export default {
    name: "testmap8",

    components: {
        GeojsonMap,
    },

    data () {
        return {
            /**
             * 业务
             */
            dialogVisible: false,
            cityName: "",  // 存储当前城市名称
            cityArr: [],  // 下拉框
            selCityName: "",  // 点击按钮选择城市
        }
    },

    computed: {
    },

    methods: {
        /**
         * 地图
         */
        // 初始化地图
        resetMap() {
            this.$refs.geojsonmap.resetMap()

            this.resetForm()
        },

        // 初始化表单
        resetForm() {
            this.selCityName = ""
        },

        /**
         * 业务流程
         */
        // 获取城市列表
        getcityArray(geoJsonData) {
            // console.log("获取城市列表", geoJsonData)

            geoJsonData.features.forEach(item=> {
                // console.log(item.properties.name)
                this.cityArr.push({
                    label: item.properties.name,
                    value: item.properties.name
                })
            })
        },

        // 获取geojson数据 - 处理geojson业务流程
        getGeoJsonData(cityName) {
            console.log("获取geojson数据 - 处理geojson业务流程", cityName)

            this.cityName = cityName

            this.dialogVisible = true  // 显示弹窗
        },

        // 根据按钮选择地图
        selectName(val) {
            console.log(val)
            this.$refs.geojsonmap.selectName(val)
        },

        // 保存
        saveForm() {
            this.selCityName = this.cityName
        }
    },

    created() {
    },

    mounted() {
    }
}
</script>

<style lang="less" scoped>
.main_cont {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;

    .filter_wrap {
        position: absolute;
        z-index: 1;
        top: 10px;
        left: 10px;

        .el-button, .el-select {
            margin-right: 15px;
        }
    }
}
</style>