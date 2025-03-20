// 引入模块
var TileLnglatTransform = require('tile-lnglat-transform');


// // 根据地图平台使用转换类
// var TileLnglatTransformGaode = TileLnglatTransform.TileLnglatTransformGaode;
// var TileLnglatTransformGoogle = TileLnglatTransform.TileLnglatTransformGoogle;
var TileLnglatTransformBaidu = TileLnglatTransform.TileLnglatTransformBaidu;

/**
经纬度坐标转瓦片坐标 lnglatToTile
@input: (longitude, latitude, level)
@output:{tileX, tileY}

经纬度坐标转像素坐标 lnglatToPixel
@input: (longitude, latitude, level)
@output:{pixelX, pixelY}

瓦片的某一像素点坐标转经纬度坐标 pixelToLnglat
@input: (pixelX, pixelY, tileX, tileY, level)
@output:{lng, lat}
 */

// 经纬度坐标
const lonlat = [120.3251404, 30.8894744]
// 瓦片级别
const zoom = 16

console.log("经纬度坐标:", lonlat)
console.log("瓦片级别:", zoom)

// 经纬度坐标转瓦片坐标 - {tileX, tileY}
let lnglatToTile = TileLnglatTransformBaidu.lnglatToTile(lonlat[0], lonlat[1], zoom);
console.log("经纬度坐标转瓦片坐标", lnglatToTile);
// 经纬度坐标转像素坐标 - {pixelX, pixelY}
let lnglatToPixel = TileLnglatTransformBaidu.lnglatToPixel(lonlat[0], lonlat[1], zoom);
console.log("经纬度坐标转像素坐标", lnglatToPixel);
// 瓦片的某一像素点坐标转经纬度坐标 - @input: (pixelX, pixelY, tileX, tileY, level)
let pixelToLnglat = TileLnglatTransformBaidu.pixelToLnglat(lnglatToPixel.pixelX, lnglatToPixel.pixelY, lnglatToTile.tileX, lnglatToTile.tileY, zoom);
console.log("瓦片的某一像素点坐标转经纬度坐标", pixelToLnglat);


// console.log("222", res1, res2, res3);