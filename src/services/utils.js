import orm from "./database";

const NODE_ENV = String(process.env.NODE_ENV || 'development').trim();

// to Array
export function toArray(arr) {
  return Array.isArray(arr) ? arr : [arr]
}

// path normalize
export function getAbsPath(path) {
  if (typeof path === 'object') {
    return path
  } else {
    return path.startsWith('/') ? path : `/${path}`
  }
}

export const env = NODE_ENV;
export const isProd = env === 'production';

// obj is isInteger
export function isInteger(n) {
  return Number.isInteger(n * 1)
}

// o is an Object
export function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function isString(s) {
  return s !== '' && typeof s === 'string'
}

export function getPagerOptions(queries) {
  let pageNo = 1, pageSize = 10;
  const pager = {};
  if (isInteger(queries.pageNo)) {
    pageNo = queries.pageNo * 1
  }

  if (isInteger(queries.pageSize)) {
    pageSize = queries.pageSize * 1
  }

  pager.offset = pageSize * (pageNo - 1);
  pager.limit = pageSize; // * pageNo

  // console.log(queries, pager)
  return pager
}

// get Positive integer
export function getPositiveInteger(n) {
  return isInteger(n) ? Math.abs(n * 1) : null
}

// to Integer
export function toInteger(n) {
  return n * 1
}

// get Find the intersection of objects
export function getObjectIntersection(target, refere, ignore) {
  const temp = {};
  const keys = Object.keys(refere);

  Object.keys(target).forEach(key => {
    if (keys.includes(key) && !ignore.includes(key)) {
      temp[key] = target[key]
    }
  });
  return temp
}

/**
 * 获取数据库
 * @param school_Id
 * @returns {Promise<*>}
 */
export async function createDatabase(school_Id = null) {
  const database = orm.configures.default;
  const name = school_Id ? `${database}_${school_Id}` : database;
  console.log(`:::::::::::::::::  used database: ${name}  :::::::::::::::::::`);
  return await orm.use(name);
}
