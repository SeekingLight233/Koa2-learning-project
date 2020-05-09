/**
 * @description user controller
 * @author SeekingLight
 */

const { getUserInfo } = require("../services/user")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { registerUsernotExist } = require("../model/Errorinfo")
/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  //从服务层中获取数据
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new SuccessModel(userInfo)
    //{errno:0,data:{...}}
  } else {
    //{errno:10003,message:"用户名不存在"}
    return new ErrorModel(registerUsernotExist)
  }
}

module.exports = {
  isExist,
}
