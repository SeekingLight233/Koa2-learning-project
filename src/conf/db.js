/**
 * @description 存储配置
 * @author SeekingLight
 */

const { isProd } = require("../utils/env")
let REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
}
let MYSQL_CONF = {
  host: "39.107.97.170",
  user: "root",
  password: "PUK411381199",
  port: "3306",
  database: "koa2_weibo",
}
if (isProd) {
  //线上的redis配置
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  }
  //线上的MariaDB配置
  MYSQL_CONF = {
    host: "39.107.97.170",
    user: "root",
    password: "PUK411381199",
    port: "3306",
    database: "koa2_weibo",
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
}
