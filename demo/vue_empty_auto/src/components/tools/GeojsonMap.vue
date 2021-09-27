<template>
    <section class="main_cont amap-wrapper">
        <el-amap ref="map" class="amap-box" :vid="'amap-vue'" :center='center' :zoom='zoom' :events="events"></el-amap>
    </section>
</template>

<script>
export default {
    name: "geojsonmap",

    props: {
        /* selCityName: {
            type: String,
            default: ""
        }, */
    },

    components: {

    },

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

                    // 获取geojson
                    this.getGeoJson()
                }
            },
            // polygon相关
            polygonInitColor: "#f00",  // polygon初始化颜色
            polygonMarkerColor: "#00f",  // polygon遮罩颜色
            // geojson
            globalGeoJsonData: {},  // 全局geojson
        }
    },

    computed: {
    },

    methods: {
        /**
         * geojsoon初始配置
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
        // 跳转到geojson
        jumpToGeojson() {
            window.amapview.setZoom(this.zoom); //设置地图层级
            window.amapview.setCenter(this.center); //设置地图层级
        },
        // 初始化geojson
        initGeojsonPolygon() {
            let polygonArr = window.amapview.getAllOverlays('polygon')

            window.amapview.remove(polygonArr)
        },
        // 重置geojson
        resetMap() {
            this.jumpToGeojson()  // 跳转到geojson

            this.initGeojsonPolygon()  // 初始化geojson
            this.setGeojsonMap(this.globalGeoJsonData)  // 加载geojson地图
        },

        /**
         * 获取并配置geojson
         */
        // 获取geojson - 并执行一系列方法
        getGeoJson() {
            this.axios.get("https://a.amap.com/jsapi_demos/static/geojson/chongqing.json").then(res=> {
                // console.log(res.data)

                // 获取geojson数据
                let geoJsonData = res.data

                // 使geojson对象变成全局
                this.globalGeoJsonData = geoJsonData

                // 获取城市列表
                this.$emit("getcityArray", geoJsonData)

                // 加载geojson地图
                this.setGeojsonMap(geoJsonData)

                this.$message.success("geojson加载成功")
            }).catch({})
        },

        // 初始化geojson并绑定事件
        setGeoJsonLayer(geoJsonData, color, event, next) {
            // 获取第一层geojson地图对象
            let geojsonLayer = this.initGeojsonLayer(geoJsonData, color)

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

        // 加载geojson地图
        setGeojsonMap(geoJsonData) {
            // 初始化geojson，获取geojson地图对象
            this.setGeoJsonLayer(geoJsonData, this.polygonInitColor, 'click', (e, iterator)=> {
                this.resetMap()

                // 给当前面添加事件
                this.getGeoEvent(e, iterator, geojsonItem=> {
                    // 处理业务流程
                    // console.log("处理geojson业务流程")

                    // 使用geojson示例
                    this.getGeoJsonData(geojsonItem)
                })
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
            this.geojsonEvent(geojsonLayerItem, ()=>{})
        },

        // 第二层地图对象触发事件
        geojsonEvent(geojsonLayerItem, next) {
            // console.log(geojsonLayerItem)

            // 第二层地图对象触发事件 - 鼠标移除
            geojsonLayerItem.on('mouseout', e=> {
                // console.log("鼠标移除事件")

                // 鼠标移出，移除面
                geojsonLayerItem.hide()
            })

            // 第二层地图对象触发事件 - 鼠标点击
            geojsonLayerItem.on('click', ()=> {
                console.log("鼠标点击事件")

                // 鼠标点击，移除面
                geojsonLayerItem.hide()
                next()
            })
        },

        /**
         * 供出地图数据，以方便业务使用
         * 业务流程
         */
        // 使用geojson示例
        getGeoJsonData(geojsonItem) {
            // console.log("处理geojson业务流程")

            let cityName = ""

            if(typeof geojsonItem === "string") {
                cityName = geojsonItem
            } else {
                cityName = geojsonItem.properties.name
            }

            this.$emit("getGeoJsonData", cityName)
        },

        // 根据按钮选择地图
        selectName(val) {
            this.resetMap()

            let pointPolygon = {}  // 选中面

            this.globalGeoJsonData.features.forEach(item=> {
                let geojsonLayerItem = this.initGeojsonLayer(item, this.polygonMarkerColor)
                // console.log(geojsonLayerItem)

                if(item.properties.name === val) {
                    // 拷贝对象
                    pointPolygon = geojsonLayerItem
                    // console.log(pointPolygon)

                    // 第二层地图对象触发事件
                    this.geojsonEvent(geojsonLayerItem, ()=>{
                        // console.log("第二层地图对象", item)

                        // 执行业务流
                        this.getGeoJsonData(val)
                    })
                }
            })

            window.amapview.add(pointPolygon)
            // pointPolygon.setMap(window.amapview);
        },
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

    .amap-box {
        position: absolute;
    }

    .amap-box {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
    }
}
</style>