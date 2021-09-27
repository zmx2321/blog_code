<template>
    <section class="main_cont amap-wrapper">
        <el-button type="primary" @click="toChongqing">重庆</el-button>
        <el-button type="primary" @click="toShangHe">上河镇</el-button>
        <el-amap ref="map" class="amap-box" :vid="'amap-vue'" :center='center' :zoom='zoom' :events="events"></el-amap>
    </section>
</template>

<script>
import shzjson from '@/assets/geojson/shz.json'

export default {
    name: "testmap2",

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

                    // 获取上河
                    this.testJson()
                }
            },

            // polygon相关
            polygonInitColor: "#f00",  // polygon初始化颜色
            polygonMarkerColor: "#00f",  // polygon遮罩颜色
        }
    },

    computed: {
    },

    methods: {
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

        toChongqing() {
            window.amapview.setZoom("7"); //设置地图层级
            window.amapview.setCenter([107.943579, 30.131735]); //设置地图层级
        },

        toShangHe() {
            window.amapview.setZoom("12"); //设置地图层级
            window.amapview.setCenter([120.21272954752699,29.93745044968425]); //设置地图层级
        },

        /**
         * geojson相关
         */
        // 初始化geojson配置
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
            // this.getGeoEvent(e, iterator)

            let geojsonLayer = this.initGeojsonLayer(geoJSONData, color)

            geojsonLayer.eachOverlay(iterator => {
                iterator.on(event, e=> {
                    // console.log("地图点击事件", e)
                    // console.log("geojson单个对象", iterator)

                    // geojson事件内容 - 高亮
                    next(e, iterator)
                })
            })
            geojsonLayer.setMap(window.amapview);
        },

        // 配置geojson事件
        getGeoEvent(e, geoitem, next) {
            // console.log('点击geojson ['+e.lnglat.getLng()+','+e.lnglat.getLat()+']');
            // console.log("geojson单个对象", geoitem)

            // 将当前地图对象转换成geojson格式以便获取数据
            let geojsonItem = geoitem.toGeoJSON()

            // 处理业务流程
            next(geojsonItem)

            // 获取第一层geojson
            let geojsonLayerItem = this.initGeojsonLayer(geojsonItem, this.polygonMarkerColor)

            // 点击第一层触发事件 - 鼠标点击设置地图
            geojsonLayerItem.setMap(window.amapview);

            // 第二层触发事件 - 鼠标移除
            geojsonLayerItem.on('mouseout', ()=> {
                console.log("鼠标移除事件")

                geojsonLayerItem.hide()
            })

            // 第二层触发事件 - 鼠标点击
            geojsonLayerItem.on('click', ()=> {
                console.log("鼠标点击事件")

                geojsonLayerItem.hide()
            })
        },

        /**
         * 使用
         */
        // 获取geojson示例
        getGeoJson() {
            this.axios.get("https://a.amap.com/jsapi_demos/static/geojson/chongqing.json").then(res=> {
                // console.log(res.data)

                // 获取geojson数据
                let geoJSONData = res.data;

                // 初始化geojson，获取geojson地图对象
                this.setGeoJsonLayer(geoJSONData, this.polygonInitColor, 'click', (e, iterator)=> {
                    // 给当前面添加事件
                    this.getGeoEvent(e, iterator, geojsonItem=> {
                        // 处理业务流程
                        console.log("处理geojson业务流程")

                        if(geojsonItem.properties.name) {
                            console.log("区县名称", geojsonItem.properties.name)
                        } else {
                            console.log("区县名称", geojsonItem.properties.Name)
                        }
                    })
                })

                this.$message.success("geojson加载成功")
            }).catch({})
        },

        // 获取geojson测试
        testJson() {
            // 初始化geojson，获取geojson地图对象
            this.setGeoJsonLayer(shzjson, this.polygonInitColor, 'click', (e, iterator)=> {
                // console.log()
                this.getGeoEvent(e, iterator, geojsonItem=> {
                    // 处理业务流程
                    console.log("处理testJson业务流程")

                    if(geojsonItem.properties.name) {
                        console.log("区县名称", geojsonItem.properties.name)
                    } else {
                        console.log("区县名称", geojsonItem.properties.Name)
                    }
                })
            })
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
  width: 100%;
  height: 100%;
}

.main_cont {
    padding: 0
}
</style>