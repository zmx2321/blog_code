const path = require('path')
// CleanWbpackPlugin是一个类
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 在index.html模板中，可能会有 <%变量 %>，这个是EJS模块填充数据的方式
const { DefinePlugin } = require('webpack')
// 拷贝文件
const { CopyWebpackPlugin } = require('copy-webpack-plugin')

module.exports = {
    entry: "./src/main.js",  // 入口
    // 出口
    output: {
        // path: './build',  // 需要写绝对路径，这么写会报错
        // __dirname获取当前文件所在路径
        path: path.resolve(__dirname, './dist'),
        filename: 'js/bundle.js'  // 出口文件名称,默认是main.js
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
            // 匹配less
            {
                test: /\.less$/,
                // 先将less编译成css、再解析css，最后插入css
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ]
            },
            // 匹配图片
            /* {
                test: /\.(jpe?g|png|gif|svg)$/,
                // 会生成两张图片，css-loader 6.0.0以上版本。对引入背景图片的url解析方式不一样，导致生成了两个图片（一个正常由file-loader解析生成，一个仅由css-loader解析引入）
                // 将css-loader版本由6降到5就行了
                // 官方推荐使用asset module 资源模块替换loader
                use: 'file-loader', 
            }, */
            // url-loader作用和file-loader作用相似，但可以将较小的文件转换成base64的uri
            /* {
              test: /\.(jpe?g|png|gif|svg)$/,
              use: {
                loader: "url-loader",
                options: {
                  // outputPath: "img",
                  name: "img/[name]_[hash:6].[ext]",
                  limit: 100 * 1024
                }
              }
            }, */
            // 直接使用资源模块类型（asset module type）
            // asset => url-loader+配置资源体积限制实现 => 在导出一个data uri和发送一个单独文件直接自动选择
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: "asset",
                generator: {
                    // [name]获取文件名称，[ext]表示扩展名
                    filename: "img/[name]_[hash:6][ext]"
                },
                // asset类型需要做以下配置
                parser: {
                    dataUrlCondition: {
                        // 100kb*1024
                        maxSize: 100 * 1024
                    }
                }
            },
            // 字体 - 一般不转base64
            // 直接使用资源模块类型（asset module type）
            // asset/resource => file-loader => 发送一个单独的文件并导出url
            {
                test: /\.(eot|ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "font/[name]_[hash:6][ext]"
                }
            },
            // {
            //     // 执行js代码的时候，使用babel-loader
            //     test: /\.js$/,
            //     // 这么写直接build还不能转换代码，因为没有使用插件
            //     // loader: "babel-loader"
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             // 使用插件
            //             /* plugins: [
            //                 "@babel/plugin-transform-arrow-functions",
            //                 "@babel/plugin-transform-block-scoping"
            //             ] */
            //             // 或者直接使用预设
            //             presets: [
            //                 "@babel/preset-env"
            //                 // 如果有参数可能要写成
            //                 // ["@babel/preset-env", {.....}]
            //             ]
            //         }
            //     }
            // }
            // 在外部对babel做配置
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    // 插件
    plugins: [
        // 删除dist
        new CleanWebpackPlugin(),
        // 打包index.html
        // new HtmlWebpackPlugin()  // 默认
        new HtmlWebpackPlugin({
            title: 'vueTemplate',
            //  如果模板里面有baseurl，需要定义
            template: './public/index.html'  // 传入自定义模板
        }),
        // 创建全局常量
        new DefinePlugin({
            // 当前文件夹
            BASE_URL: "'./'",  // 这里的BASE_URL可用在传入的自定义模板中，类似于vuecli中的public
        }),
        // 拷贝文件
        // new CopyWebpackPlugin({
        //     // 匹配规则
        //     patterns: [
        //         {
        //             // 从哪里开始复制
        //             from: 'public',
        //             // 复制到哪个文件夹
        //             // to: './',  // 可以不写，当前目录
        //             globOptions: {
        //                 // 忽略当前文件夹下所有index.html
        //                 ignore: [
        //                     '**/index.html'
        //                 ]
        //             }
        //         }
        //     ]
        // })
    ],
    mode: 'development',
    devtool: 'source-map'  // 生成代码的时候，也会生成对应的map文件，浏览器控制台能显示报错的位置
    // mode: 'production'
}