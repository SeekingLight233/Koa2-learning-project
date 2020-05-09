/**
 * @description 用户后台api
 */

const router = require("koa-router")()
const { isExist } = require("../../controller/user")
router.prefix("/api/user")

//注册
router.post("/register", async (ctx, next) => {})
//用户名已存在验证
router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body
  //controller
  ctx.body = await isExist(userName)
})

module.exports = router
