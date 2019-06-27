// export const DEVELOPMENT = Symbol('development');

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';

export const ENV = String(process.env.NODE_ENV || DEVELOPMENT).trim();

/**
 * 当前环境
 * isDev 开发环境？
 * isPro 生产环境？
 */
export const isDev = ENV === DEVELOPMENT;
export const isPro = ENV === PRODUCTION;
