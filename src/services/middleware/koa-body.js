import koaBody from 'koa-body';


/**
 * formidable: {
 *    uploadDir: pa.join(__dirname, '../../asset'), // 设置文件上传目录
 *    keepExtensions: true,    // 保持文件的后缀
 *    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
 *    onFileBegin: (name, file) => { // 文件上传前的设置
 *      console.log(`name: ${name}`);
 *      // console.log(file);
 *    }
 *  }
 * @param app
 * @returns {Koa.Middleware<{}, {}> | never | *}
 */
export default function bodyParser(app) {

  app.use(koaBody({
    multipart:true, // 支持文件上传
    /*formidable:{ …… }*/
  }));

}

