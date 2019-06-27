const fs = require('fs');
const path = require('path');

/**
 * 读取文件内容
 * @param fileName
 * @param format
 * @returns {Promise}
 */
let readFile = function (fileName, format) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, format, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

/**
 * 一次获取一个文件夹
 * @param pathName
 * @returns {Promise}
 */
let readDir = function (pathName) {
  return new Promise(function(resolve, reject) {
    fs.readdir(pathName, function (err, files) {
      if (err) return reject(err);
      resolve(files);
    });
  })
};

let assemblyPath = function(root, child) {
  return path.resolve(path.normalize(`${root}/${child}`))
};

/**
 * 一次获取多个文件夹
 * @param pathName
 * @returns {Promise.<*>}
 */
let getFilesPath = function(pathName) {
  const read = pathName.map(item => readDir(item));
  return Promise.all(read)
};


module.exports = {
  assemblyPath,
  readFile,
  readDir,
  getFilesPath,
};