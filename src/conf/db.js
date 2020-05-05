/**
 * @description 存储配置
 * @author SeekingLight
 */

const { isProd } = require("../utils/env");
let REDIS_CONF = {
  port: 6379,
  host: "39.107.97.170",
};
if (isProd) {
  //线上的redis配置
  REDIS_CONF = {
    port: 6379,
    host: "39.107.97.170",
  };
}

module.exports = {
  REDIS_CONF,
};
