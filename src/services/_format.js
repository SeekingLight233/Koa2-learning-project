/**
 * @description 数据格式化
 * @author SeekingLight
 */
const { DEFAULT_PIC } = require("../conf/constant")
/**
 * 用户默认头像
 * @param {Object} obj
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PIC
  }
  return obj
}
/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
  if (list == null) {
    return list
  }
  if (list instanceof Array) {
    //对list中的每一个用户都进行格式化操作
    return list.map(_formatUserPicture)
  }
  //单个对象
  return _formatUserPicture(list)
}

module.exports = {
  formatUser,
}
