/**
 * @description 登录验证的中间件
 * @author SeekingLight
 */

const { ErrorModel } = require("../model/ResModel")
const { loginCheckFailInfo } = require("../model/ErrorInfo")
/**
 * 登录api的验证
 * @param {Object} ctx
 * @param {function} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next()
    return
  }
  //未登录
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面登录状态的验证
 * @param {Object} ctx
 * @param {function} next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    //已登录
    await next()
    return
  }
  //未登录之前要把用户要访问的url先取出来
  const curUrl = ctx.url
  ctx.redirect("/login?url=" + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect,
}
