const path = require('path')

module.exports = {
    entry: "./src/main.js",  // 入口
    // 出口
    output: {
        // path: './build',  // 需要写绝对路径，这么写会报错
        // __dirname获取当前文件所在路径
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js'  // 出口文件名称,默认是main.js
    },
    // 模块
    module: {
        // 规则
        rules: [
            // 配置规则之后打包没问题，但还没有生效
            {
                // 匹配到以css结尾的文件，都使用css-loader
                test: /\.css$/, // 正则表达式
                // 1.loader的写法(语法糖)
                // loader: "css-loader"
        
                // 2.完整的写法
                use: [
                    //   {loader: "css-loader"}
                    // 最常用的方式
                    /// loader加载是有顺序的，他的加载顺序是从后往前的
                    "style-loader",
                    "css-loader",
                ]
            },
            // 测试less
            {
                test: /\.less$/,
                // 先将less编译成css、再解析css，最后插入css
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            }
        ]
    }
}