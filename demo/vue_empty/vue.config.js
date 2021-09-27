const bodyParser = require('body-parser');
const jsmd5 = require('js-md5')

// const serverPath = process.env.VUE_APP_BASE_API;  // 配置文件也可以获取.env变量
// console.log("env", serverPath)

module.exports = {
  // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  publicPath: './',

  // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  outputDir: 'vue_empty',

  //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  assetsDir: 'assets',

  //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  indexPath: 'index.html',

  pages: {
      //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
      index: {
          //除了 entry 之外都是可选的
          entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
          template: 'public/index.html', // 模板来源
          filename: 'index.html', // 在 dist/index.html 的输出
          title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
          chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
      }
  },

  devServer: {
    // open: true,
    host: 'localhost',
    port: 8088,
    https: false,
    hotOnly: false,
    /* proxy: { // 配置跨域
        '/api': {
            // 用.env变量配置跨越
            target: serverPath,
            ws: true,  // 是否启用websockets
            changOrigin: true,  // 开启代理，在本地创建一个虚拟服务端
            pathRewrite: {
                '^/api': ''
            }
        }
    }, */
    before: app => {
      // post请求必须使用中间件才能接收参数
      // 需要载入body-parser中间件才可以使用req.body
      // 2021年body-parser已经被弃用，原因是express框架已经内置
      // 但原生node还是需要中间件来做请求
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));

      app.post('/api/admin/login', (req, res)=> {
        // console.log(req.body)

        let username = req.body.username;
        let password = req.body.password;

        // console.log(jsmd5("admin"))

        if(username == "admin" && password == jsmd5("admin")) {
          res.send({
            msg: '恭喜你登录成功',
            info: { id:1, name: "zhangsan", username: "admin", password: "admin" },
            isOk: true
          })
        } else {
          res.send({
            msg: '登录失败，请检查账号密码',
            isOk: false
          })
        }
      }).get('/api/user/get', res=> {
        res.json([
          { username: "zhangsan" },
          { username: "王五" },
        ])
      })
    }
  },

  // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  productionSourceMap: false,
  
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['src/assets/less/tools.less', 'src/assets/less/global.less']
    }
  }
}


