const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports是nodejs中CommonJs的语法规范
module.exports = {
    // 模式
    mode: 'development',  // 开发模式
    // mode: 'production',  // 线上模式

    // 这个js实际上是node，所以可以使用node中的path模块
    // 入口
    // __dirname表示当前目录
    // 表示能找到当前项目目录下src下的index.js
    // 通过join拼接
    // 最终找到的这个index.js就是项目的入口
    entry: path.join(__dirname, 'src', 'index.js'),

    // 输出
    output: {
        filename: 'bundle.js',  // 一般叫这个名字
        // 目录
        // 如果没有dist文件夹，webpack会自动帮我们创建
        path: path.join(__dirname, 'dist')
    },

    // 配置插件 - 是一个数组，可以配置多个插件
    plugins: [
        new HtmlWebpackPlugin({
            // 直接找到html文件
            template: path.join(__dirname, 'src', 'index.html'),
            // 根据当前模板，输出的文件名(在dist目录下)
            filename: 'index.html'
        })
    ],

    // 启动本地服务
    devServer: {
        port: 3000,
        // 启动目录
        contentBase: path.join(__dirname, 'dist')
    }
}