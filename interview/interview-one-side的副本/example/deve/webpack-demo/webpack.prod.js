const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// module.exports是nodejs中CommonJs的语法规范
module.exports = {
    mode: 'production',  // 线上模式

    entry: path.join(__dirname, 'src', 'index.js'),

    // 输出
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.join(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: path.join(__dirname, "src"),
                exclude: /node_modules/
            }
        ]
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
}