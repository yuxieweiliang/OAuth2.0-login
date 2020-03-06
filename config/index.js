// config 主入口

/**
 * 环境
 */
export { isDev, isPro } from './environment'

/**
 * 数据库配置
 */
export { default as database } from './database'

/**
 * 服务器配置
 */
export { default as server } from './server'

/**
 * 本地环境配置
 */
export { default as location } from './location'

/**
 * 线上环境配置
 */
export { default as production }  from './production'

/**
 * 打印喷织
 * @type {{level: string, name: string}}
 */
export const logger = {
  name: 'program-api',
  level: 'error'
}

