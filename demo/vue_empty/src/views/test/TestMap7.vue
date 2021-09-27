<template>
    <section class="main_cont amap-wrapper">
        <div class="filter_wrap">
            <el-button type="primary" @click="resetMap">初始化</el-button>
            <el-select v-model="selCityName" placeholder="请选择城市" @change="selectName">
                <el-option v-for="item in cityArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <el-amap ref="map" class="amap-box" :vid="'amap-vue'" :center='center' :zoom='zoom' :events="events"></el-amap>

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
export default {
    name: "testmap5",

    data () {
        return {
            /**
             * 地图基础属性
             */
            center: [107.943579, 30.131735],
            zoom: 7,
            events: {
                init: o=> {
                    // 供出地图的实例
                    window.amapview = o

                    // 获取地图信息
                    this.getMapInfo()

                    // 获取重庆
                    this.getGeoJson()
                }
            },
            // polygon相关
            polygonInitColor: "#f00",  // polygon初始化颜色
            polygonMarkerColor: "#00f",  // polygon遮罩颜色
            // geojson
            chongqingGeojson: {},

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
         * 地图基本信息
         */
        // 获取地图信息
        getMapInfo() {
            console.log("AMap", AMap)

            // 必须是异步
            setTimeout(() => {
                console.log("amapview", window.amapview)

                window.amapview.on('click', e=> {
                    // console.log("地图点击事件", e)

                    // 地图坐标
                    this.getPosition(e)
                })

                /* window.amapview.on('zoomend', ()=> {
                    this.logMapinfo()
                }) */

                window.amapview.on('moveend', ()=> {
                    this.logMapinfo()
                })
            }, 0);
        },

        // 获取地图信息
        logMapinfo() {
            console.log("当前级别", window.amapview.getZoom())
            console.log("当前中心点", window.amapview.getCenter())
        },

        // 地图坐标
        getPosition(e) {
            console.log('您在 ['+e.lnglat.getLng()+','+e.lnglat.getLat()+'] 的位置点击了地图');
        },

        /**
         * 跳转到geojson
         */
        // 初始化geojson
        initGeojsonPolygon() {
            let polygonArr = window.amapview.getAllOverlays('polygon')

            window.amapview.remove(polygonArr)
        },

        // 跳转到重庆
        resetMap() {
            window.amapview.setZoom("7"); //设置地图层级
            window.amapview.setCenter([107.943579, 30.131735]); //设置地图层级

            this.initGeojsonPolygon()
            this.setChongqinMap(this.chongqingGeojson)
        },

        /**
         * geojson相关
         */
        // 初始化geojson配置，返回面
        initGeojsonLayer(data, fillColor) {
            return new AMap.GeoJSON({
                // 要加载的标准GeoJSON对象
                geoJSON: data,

                // 指定面要素的绘制方式，缺省时为Polygon的默认样式。
                // geojson为当前要素对应的GeoJSON对象，lnglats为对应的面的路径
                getPolygon(geojson, lnglats) {
                    // console.log(geojson)

                    let area = AMap.GeometryUtil.ringArea(lnglats[0])

                    return new AMap.Polygon({
                        // 路径
                        path: lnglats,
                        // 面
                        fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
                        // fillOpacity: 0.5,
                        fillColor: fillColor,
                        // 线
                        strokeColor: '#fff',
                        strokeWeight: 0.6,    //线宽
                        strokeStyle: "solid",
                        strokeOpacity: 1, //线透明度
                    });
                }
            })
        },

        // 初始化geojson并绑定事件
        setGeoJsonLayer(geoJSONData, color, event, next) {
            // 获取第一层geojson地图对象
            let geojsonLayer = this.initGeojsonLayer(geoJSONData, color)

            // 第一层地图对象触发事件 - 初始化geojson并在地图上渲染
            geojsonLayer.setMap(window.amapview);

            // 遍历第一层地图对象遮罩层
            geojsonLayer.eachOverlay(iterator => {
                iterator.on(event, e=> {
                    // geojson地图对象事件内容 - 高亮
                    next(e, iterator)
                })
            })
        },

        // 加载重庆地图
        setChongqinMap(geoJSONData) {
            // 初始化geojson，获取geojson地图对象
            this.setGeoJsonLayer(geoJSONData, this.polygonInitColor, 'click', (e, iterator)=> {
                this.resetMap()

                // 给当前面添加事件
                this.getGeoEvent(e, iterator, geojsonItem=> {
                    // 处理业务流程
                    // console.log("处理geojson业务流程")

                    // 使用重庆geojson示例
                    this.getChonQingData(geojsonItem)
                })
            })
        },

        // 第二层地图对象触发事件
        geojsonEvent(geojsonLayerItem, next) {
            // console.log(geojsonLayerItem)

            // 第二层地图对象触发事件 - 鼠标移除
            geojsonLayerItem.on('mouseout', e=> {
                console.log("鼠标移除事件")

                // 鼠标移出，移除面
                geojsonLayerItem.hide()
            })

            // 第二层地图对象触发事件 - 鼠标点击
            geojsonLayerItem.on('click', ()=> {
                console.log("鼠标点击事件")

                // 鼠标点击，移除面
                geojsonLayerItem.hide()
                next()
                // this.getChonQingData(geojsonItem)
            })
        },

        // 配置geojson事件
        getGeoEvent(e, geoitem, next) {
            // 将当前地图对象转换成geojson格式以便获取数据
            let geojsonItem = geoitem.toGeoJSON()

            // 处理业务流程
            next(geojsonItem)

            // 获取第二层geojson地图对象
            let geojsonLayerItem = this.initGeojsonLayer(geojsonItem, this.polygonMarkerColor)

            // 第二层地图对象触发事件 - 设置地图
            geojsonLayerItem.setMap(window.amapview);

            // console.log(geojsonItem)

            // 第二层地图对象触发事件
            this.geojsonEvent(geojsonLayerItem, ()=>{
                // this.selCityName = 
            })

            // // 第二层地图对象触发事件 - 鼠标移除
            // geojsonLayerItem.on('mouseout', e=> {
            //     console.log("鼠标移除事件")

            //     // 鼠标移出，移除面
            //     geojsonLayerItem.hide()
            // })

            // // 第二层地图对象触发事件 - 鼠标点击
            // geojsonLayerItem.on('click', ()=> {
            //     console.log("鼠标点击事件")

            //     // 鼠标点击，移除面
            //     geojsonLayerItem.hide()
            // })
        },

        /**
         * 重庆geojson
         */
        // 获取重庆geojson示例
        getGeoJson() {
            this.axios.get("https://a.amap.com/jsapi_demos/static/geojson/chongqing.json").then(res=> {
                // console.log(res.data)

                // 获取geojson数据
                let geoJSONData = res.data

                // 使geojson对象变成全局
                this.chongqingGeojson = geoJSONData

                // 获取城市列表
                this.getcityArray(geoJSONData)

                // 加载重庆地图
                this.setChongqinMap(geoJSONData)

                this.$message.success("geojson加载成功")
            }).catch({})
        },

        /**
         * 使用
         * 业务流程
         */
        // 获取城市列表
        getcityArray(geoJSONData) {
            // console.log(geoJSONData)

            geoJSONData.features.forEach(item=> {
                // console.log(item.properties.name)
                this.cityArr.push({
                    label: item.properties.name,
                    value: item.properties.name
                })
            })
        },
        
        // 使用重庆geojson示例
        getChonQingData(geojsonItem) {
            console.log("处理geojson业务流程")

            this.dialogVisible = true  // 显示弹窗

            if(typeof geojsonItem === "string") {
                this.cityName = geojsonItem
                return
            }

            if(geojsonItem.properties.name) {
                this.cityName = geojsonItem.properties.name
                console.log("区县名称", geojsonItem.properties.name)
            } else {
                console.log("区县名称", geojsonItem.properties.Name)
            }
        },

        // 根据按钮选择地图
        selectName(val) {
            this.resetMap()

            // this.initGeojsonPolygon()  // 初始化初始化geojson

            let pointPolygon = {}  // 选中面

            this.chongqingGeojson.features.forEach(item=> {
                let geojsonLayerItem = this.initGeojsonLayer(item, this.polygonMarkerColor)
                // console.log(geojsonLayerItem)

                if(item.properties.name === val) {
                    // 拷贝对象
                    pointPolygon = geojsonLayerItem
                    // console.log(pointPolygon)

                    // 第二层地图对象触发事件
                    // this.geojsonEvent(geojsonLayerItem)
                    this.geojsonEvent(geojsonLayerItem, ()=>{
                        console.log(item)
                        this.getChonQingData(val)
                    })
                }
            })

            window.amapview.add(pointPolygon)
            // pointPolygon.setMap(window.amapview);
        },

        resetForm() {
            console.log("reset")
            this.selCityName = ""
        },

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
.amap-wrapper {
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;

    .filter_wrap, .amap-box {
        position: absolute;
    }

    .filter_wrap {
        z-index: 1;
        top: 10px;
        left: 10px;

        .el-button, .el-select {
            margin-right: 15px;
        }
    }

    .amap-box {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
    }
}
</style>