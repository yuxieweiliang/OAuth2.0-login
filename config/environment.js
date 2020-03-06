// export const DEVELOPMENT = Symbol('development');

/**
 * 环境变量
 * @type {string}
 */
const DEVELOPMENT = 'development'
const PRODUCTION = 'production'

const NODE_ENV = String(process.env.NODE_ENV || DEVELOPMENT).trim()

/**
 * 当前环境
 * isDev 开发环境？
 * isPro 生产环境？
 */
export const isDev = NODE_ENV === DEVELOPMENT
export const isPro = NODE_ENV === PRODUCTION
