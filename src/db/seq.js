/**
 * @description sequlize实例
 * @author SeekingLight
 */
const Sequelize = require("sequelize")
const { MYSQL_CONF } = require("../conf/db")
const { isProd, isTest } = require("../utils/env")
const { host, user, password, database } = MYSQL_CONF

const conf = {
  host: host,
  dialect: "mysql",
}
//线上环境使用连接池
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000, //如果一个连接池10s没被用，就将其释放
  }
}
//不想打印过多信息的话可以将其设置为空函数
if (isTest) {
  conf.logging = () => {}
}
const seq = new Sequelize(database, user, password, conf)

module.exports = seq

//Test connection
// seq
//   .authenticate()
//   .then(() => {
//     console.log("ok");
//   })
//   .catch(() => {
//     console.log("error");
//   });
