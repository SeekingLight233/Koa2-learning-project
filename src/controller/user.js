/**
 * @description user controller
 * @author SeekingLight
 */

const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
} = require("../services/user")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const {
  registerUsernotExist,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
} = require("../model/Errorinfo")
const doCrypto = require("../utils/cryp")
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
/**
 * 注册 业务逻辑 这样传递参数可以更灵活
 * @param {string} userName
 * @param {string} password
 * @param {number} gendar (1:男，2:女，3：保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    //用户名已存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  //注册 service
  try {
    await createUser({ userName, password: doCrypto(password), gender })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)

    return new ErrorModel(registerFailInfo)
  }
}

/**
 *
 * @param {Object} ctx koa2 ctx
 * @param {string} userName
 * @param {string} password
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    //登录失败
    return new ErrorModel(loginFailInfo)
  }
  //登录成功后存一下session
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}
/**
 * 删除当前用户
 * @param {string} userName
 */
async function deleteCurUser(userName) {
  //service
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  //失败
  return new ErrorModel(deleteUserFailInfo)
}
/**
 * 修改个人信息
 * @param {Object} ctx
 * @param {string} nickName
 * @param {string} city
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }
  //service
  const result = await updateUser(
    { newNickName: nickName, newPicture: picture, newCity: city },
    { userName }
  )
  //如果成功更新session,并返回成功回调
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture,
    })
    return new SuccessModel()
  }
  //失败
  return new ErrorModel(changeInfoFailInfo)
}
module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
}
