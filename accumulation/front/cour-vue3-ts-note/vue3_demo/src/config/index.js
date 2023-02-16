/**
 * @description 3个子配置，通用配置|主题配置|网络配置，建议在当前目录下修改config.js修改配置，会覆盖默认配置，也可以直接修改默认配置
 */
import defaultSetting from './default/setting.config.js'
import defaultTheme from './default/theme.config.js'
import defaultNetwork from './default/network.config.js'

export const setting = defaultSetting
export const theme = defaultTheme
export const network = defaultNetwork
