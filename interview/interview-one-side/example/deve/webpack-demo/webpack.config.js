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

    // 配置babel
    // module是模块的意思
    // 针对不同的模块做不同的解析
    module: {
        // 规则
        rules: [
            // 它的整体意思是
            // 只要测试到时以.js结尾的，我们都去走babel-loader插件
            // babel-loader只是babel提供给webpack的一个插件
            // 真正做es6到es5转译的是babel/core这个核心去做的
            // 所以我们需要做一个.babelrc的配置才行
            {
                // 对js定制规则 => 正则
                // 只要是以js结尾的
                // test表示用正则表达式验证一下
                test: /\.js$/,
                // 之前安装的babel-loader插件，主要给webpack用
                loader: ['babel-loader'],
                // 我们有哪些目录需要进行loader
                // 我们手写的代码(src里面)都需要经过babel-loader进行转译
                include: path.join(__dirname, "src"),
                // 正则
                // 但是node_modules都是第三方的插件，这个就没必要转译，因为安装的时候已经被转译了
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

    // 启动本地服务
    devServer: {
        port: 3000,
        // 启动目录
        contentBase: path.join(__dirname, 'dist'),
        open: true,  // 自动打开浏览器
    }
}