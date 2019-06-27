import mysql from 'mysql2'

const EXISTS_DATABASE = new Map();

export default function autoCreateDatabaseMysql(config) {
  const { database, host, username, password } = config;
  const opts = {
    host,
    user: username,
    password
  };

  /**
   * 数据库已存在，直接返回
   */
  if (EXISTS_DATABASE.has(database)) {
    return true;
  }

  /**
   * 否则，重新创建
   */
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection(opts);

    con.connect(function (err) {
      if (err) {
        return reject(err)
      }

      con.query(`CREATE DATABASE IF NOT EXISTS ${database};`, function (err, result) {
        if (err) {
          return reject(err)
        }
        con.close();
        EXISTS_DATABASE.set(database, 1);
        resolve(true)
      })
    })
  })
}
