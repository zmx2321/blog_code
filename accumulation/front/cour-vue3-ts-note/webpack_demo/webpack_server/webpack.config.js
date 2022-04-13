const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');

module.exports = {
  target: "web",  // 为什么环境打包的（node或者web），如果不设置模块热替换可能会出问题
  mode: "development",
  devtool: "source-map",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "js/bundle.js",
  },
  devServer: {
    // 在开发环境中不想被复制，只在开发环境中使用的话，就需要在这里添加
    // contentbase代表html页面所在的相对目录，如果我们不配置项，devServer默认html所在的目录就是项目的根目录
    contentBase: "./public",  // 如果有资源没有在webpack中加载到（不在webpack的依赖图中），就会从public中加载
    hot: true,  // 模块热替换（HMR）  并不是浏览器刷新，而是局部改变局部刷新  不开启的时候，保存源代码，会刷新整个页面
    /**
     * 127.0.0.1：回环地址(loop back address)，表达的意思其实是我们主机自己发出去的包，直接被自己接收
     * 正常的数据包的获取会经过 应用层、传输层、网络层、数据链路层、物理层
     * 而回环地址，在网络层就被获取到了，在同一网段下的主机中，通过ip地址是不能访问的
     * 0.0.0.0：监听IPV4上所有的地址，再根据端口找到不同的应用程序
     * 即我们访问0.0.0.0时，在同一网段下的主机中，通过ip地址是可以访问的
     */
    host: "0.0.0.0",
    port: 7777,
    open: true,
    // 浏览器上常用的压缩格式为gzip，浏览器发现文件时gzip时，会自动进行解压并展示的
    // html不进行压缩，因为我们请求的时候，他默认会去找index.html,所以html文件一般不进行压缩
    // compress: true,  // 压缩，表示是否为静态资源开启gzip，默认false 
    // devServer本身是一个服务器，相当于服务器向另外一台服务器发送请求，之后再由我们的服务返回数据到deServer服务，就不会有跨域问题了，即代理
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        pathRewrite: {
          "^/api": ""
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
  resolve: {
    extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "js": path.resolve(__dirname, "./src/js")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:6][ext]",
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "哈哈哈哈"
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
    // 我们一般是打包的时候将public文件复制出来的，但如果不用CopyWebpackPlugin插件的话，我们可以使用devserver中的contentBase
    // 注释掉之后即没有被打包到内存中
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "public",
    //       to: "./",
    //       globOptions: {
    //         ignore: [
    //           "**/index.html"
    //         ]
    //       }
    //     }
    //   ]
    // }),
    new VueLoaderPlugin()
  ],
};
