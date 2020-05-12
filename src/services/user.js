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
/**
 *
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender,
  })
  console.log(`48:  ${JSON.stringify(result.dataValues)}`)
  return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName
 */
async function deleteUser(userName) {
  //result 删除的行数
  const result = await User.destroy({
    where: { userName },
  })
  return result > 0
}

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容
 * @param {Object} param1 查询条件
 */
async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
  //拼接修改内容
  const updateData = {}
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newPicture) {
    updateData.picture = newPicture
  }
  if (newCity) {
    updateData.city = newCity
  }
  //拼接查询条件
  const whereData = {
    userName,
  }
  if (password) {
    whereData.password = password
  }
  //执行修改
  const result = await User.update(updateData, { where: whereData })
  return result[0] > 0 //修改的行数
}
module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
}
