<template>
    <section class="main_cont amap-wrapper">
        <el-amap ref="map" class="amap-box" :vid="'amap-vue'" :center='center' :zoom='zoom' :events="events"></el-amap>
    </section>
</template>

<script>
export default {
    name: "testmap",

    data () {
        return {
            center: [107.943579, 30.131735],
            zoom: 7,
            events: {
                init: o=> {
                    // 供出地图的实例
                    window.amapview = o

                    // 获取地图信息
                    this.getMapInfo()

                    // 获取geojson
                    this.getGeoJson()

                    // o.setMapStyle('amap://styles/macaron');//自定义的高德地图的样式，我选的是马卡龙
                }
            }
        }
    },

    computed: {
    },

    methods: {
        // geojson api示例
        getGeoJsonExample() {
            this.axios.get("https://a.amap.com/jsapi_demos/static/geojson/chongqing.json").then(res=> {
                // console.log(res.data)

                let geoJSONData = res.data;

                let geojsonLayer = new AMap.GeoJSON({
                    // 要加载的标准GeoJSON对象
                    geoJSON: geoJSONData,

                    /* // 指定点要素的绘制方式，缺省时为Marker的默认样式。
                    // geojson为当前要素对应的GeoJSON对象，lnglat为对应的点的位置
                    getMarker(geojson, lnglats) {
                        console.log("点")
                    },

                    // 指定线要素的绘制方式，缺省时为Polyline的默认样式。
                    // geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
                    getPolyline(geojson, lnglats) {
                        console.log("线")
                    }, */

                    // 指定面要素的绘制方式，缺省时为Polygon的默认样式。
                    // geojson为当前要素对应的GeoJSON对象，lnglats为对应的面的路径
                    getPolygon(geojson, lnglats) {
                        // console.log("面")
                        // console.log(geojson)

                        // 计算面积
                        let area = AMap.GeometryUtil.ringArea(lnglats[0])

                        return new AMap.Polygon({
                            path: lnglats,
                            fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
                            strokeColor: 'white',
                            fillColor: 'red'
                        });
                    }
                })

                console.log(geojsonLayer)
                this.$message.success("geojson加载成功")

                // https://developer.amap.com/api/javascript-api/reference/overlay#geojson

                // 加载新的GeoJSON对象，转化为覆盖物，旧的覆盖物将移除
                // geojsonLayer.importData(geoJSONData)

                // 将当前对象包含的覆盖物转换为GeoJSON对象
                // console.log("将当前对象包含的覆盖物转换为GeoJSON对象", geojsonLayer.toGeoJSON())

                // 添加一个覆盖物，如需要在转成GeoJSON的时候将某些信息带给对应GeoJSON对象的properties属性中，
                // 可以将信息添加到覆盖物的extData的_geoJsonProperties字段中
                /* let marker = new AMap.Marker({
                    position:[107.943579, 30.131735],
                    extData:{_geoJsonProperties:{
                        name:'marker1',
                        icon:'xx.png',
                        }
                    }
                });
                geojsonLayer.addOverlay(marker); */

                // 添加多个覆盖物，说明同addOverlay
                // addOverlays(overlays: Array)

                // 获取所有覆盖物
                // console.log(geojsonLayer.getOverlays())

                // 隐藏所有覆盖物
                // geojsonLayer.hide()

                // 显示所有覆盖物
                // geojsonLayer.show()

                // 遍历覆盖物
                geojsonLayer.eachOverlay(iterator => {
                    console.log(iterator)
                })

                // 必须是异步才能获取地图对象
                console.log(window.amapview)

                // 设置地图
                geojsonLayer.setMap(window.amapview);
            }).catch({})
        },

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
         * geojson相关
         */
        // 初始化geojson
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

        // 获取geojson
        getGeoJson() {
            this.axios.get("https://a.amap.com/jsapi_demos/static/geojson/chongqing.json").then(res=> {
                // console.log(res.data)

                // 获取geojson数据
                let geoJSONData = res.data;

                // 初始化geojson，获取geojson地图对象
                let geojsonLayer = this.initGeojsonLayer(geoJSONData, "#f00")

                // 隐藏所有覆盖物
                // geojsonLayer.hide()

                // 遍历geojson地图对象，绑定事件
                geojsonLayer.eachOverlay(iterator => {
                    // console.log(iterator)

                    iterator.on('click', e=> {
                        // console.log("地图点击事件", e)
                        // console.log("geojson单个对象", iterator)

                        // 获取geojson事件
                        this.getGeoEvent(e, iterator)
                    })
                })

                this.$message.success("geojson加载成功")

                // console.log("amapview", window.amapview)
                // console.log(geojsonLayer)

                // 设置地图
                geojsonLayer.setMap(window.amapview);
            }).catch({})
        },

        // 获取geojson事件
        getGeoEvent(e, geoitem) {
            // console.log('点击geojson ['+e.lnglat.getLng()+','+e.lnglat.getLat()+']');
            // console.log("geojson单个对象", geoitem)

            let geojsonItem = geoitem.toGeoJSON()
            // console.log("地图对象转geojson", geojsonItem)

            console.log("区县名称", geojsonItem.properties.name)

            // 获取第一层geojson
            let geojsonLayerItem = this.initGeojsonLayer(geojsonItem, "#00f")

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
  width: 100%;
  height: 100%;
}

.main_cont {
    padding: 0
}
</style>