/**
 * @description 导出默认通用配置
 */
const setting = {
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: '能源管理平台',
  //标题分隔符
  titleSeparator: ' - ',
  //标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
  titleReverse: false,
  //开发环境端口号
  devPort: '9527',

  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  //不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/callback', '/404', '/403'],
  //加载时显示文字
  loadingText: '正在加载中...',
  //token名称
  tokenName: 'accessToken',
  //token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'accessToken',
  //token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  errorLog: ['development', 'production'],
  //是否开启登录拦截
  loginInterception: true,
  //是否开启登录RSA加密
  loginRSA: false,
  //intelligence（前端导出路由）和all（后端导出路由）两种方式
  authentication: 'intelligence',
  //是否开启roles字段进行角色权限控制（如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段）
  rolesControl: true,
  //vertical gallery comprehensive common布局时是否只保持一个子菜单的展开
  uniqueOpened: false,
  //vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOpeneds: ['/vab'],
  //需要加loading层的请求，防止重复提交
  debounce: ['doEdit'],
  //需要自动注入并加载的模块
  providePlugin: {},
  //npm run build时是否自动生成7z压缩包
  build7z: false,
  //代码生成机生成在view下的文件夹名称
  templateFolder: 'project',
  //是否显示终端donation打印
  donation: false,
  //画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
  openFirstMenu: true
}

export default setting
