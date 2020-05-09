/**
 * @description user service
 * @author SeekingLight
 */

const { User } = require("../db/model/index")
const { formatUser } = require("./_format")
/**
 * 获取用户信息,主要为控制层的业务逻辑做服务
 * @param {string} userName
 * @param {string} password
 */
async function getUserInfo(userName, password) {
  //查询条件
  const whereOpt = {
    userName,
  }
  if (password) {
    //如果参数传了password就把password加到查询条件中
    Object.assign(whereOpt, { password })
  }
  //查询逻辑
  const result = await User.findOne({
    attributes: ["id", "userName", "nickName", "picture", "city"],
    where: whereOpt,
  })
  if (result == null) {
    return result
  }
  //格式化处理
  const formatRes = formatUser(result.dataValues)
  return formatRes
}

module.exports = {
  getUserInfo,
}
