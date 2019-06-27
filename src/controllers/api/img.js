import fs from 'fs'
import path from 'path'
import _ from 'lodash';
import queryString from 'query-string'
const os = require('os');
import formidable from 'formidable'
var util = require('util');

async function saveImg(dataBuffer) {
  return new Promise(function(resolve, reject) {
    fs.writeFile("out.png", dataBuffer, function(err) {
      if(err){
        reject(err);
      }
      resolve();
    });
  });

}
/**
 * 登录
 */
var updateImg = async (ctx) => {
  var imgData = ctx.request.body.data;
  if ('POST' != ctx.method) return await next();

  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, 'base64');
  var save = await saveImg(dataBuffer);

  // console.log(save);
  ctx.body = JSON.stringify({
    data:  '保存失败！'
  });

  /*const file = ctx.request.body.files.file;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);*/
  // console.log('uploading %s -> %s', file.name, stream.path);

  // ctx.redirect('/');

};

var updateImg2 = async (ctx) => {
  var imgData = ctx.request.body;
  if ('POST' != ctx.method) return await next();


  var form = new formidable.IncomingForm();

  form.parse(ctx.req, function(err, fields, files) {
    var file = files.file;
    const reader = fs.createReadStream(file.path);

    // console.log(os.tmpdir(), file.path);

    const stream = fs.createWriteStream('fdsafdsa.jpeg');
    reader.pipe(stream);


  }); //解析request对象


  ctx.body = JSON.stringify({
    data:  '保存失败！'
  });

  /*const file = ctx.request.body.files.file;
  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
  reader.pipe(stream);*/
  // console.log('uploading %s -> %s', file.name, stream.path);

  // ctx.redirect('/');

};



module.exports = {
  'POST /api/common/update-img': updateImg,
  'POST /api/common/update-img2': updateImg2,
};