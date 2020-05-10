/**
 * @description 加密方法
 * @author SeekingLight
 */
//nodejs中自带的加密模块
const crypto = require("crypto")
const { CRYPTO_SECRET_KEY } = require("../conf/constant")
/**
 * md5加密
 * @param {string} content 明文
 */
function _md5(content) {
  //创建一个md5的哈希函数
  const md5 = crypto.createHash("md5")
  return md5.update(content).digest("hex")
}
/**
 *
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}$key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto
