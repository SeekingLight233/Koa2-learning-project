/**
 * @description 用户后台api
 */

const router = require("koa-router")()
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout,
} = require("../../controller/user")
const userValidate = require("../../validator/user")
const { genValidator } = require("../../middlewares/validator")
const { isTest } = require("../../utils/env")
const { loginCheck } = require("../../middlewares/loginChecks")

router.prefix("/api/user")

//注册
router.post("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  //controller
  ctx.body = await register({ userName, password, gender })
})

//用户名已存在验证
router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body
  //controller
  ctx.body = await isExist(userName)
})

//登录
router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body
  //controller
  ctx.body = await login(ctx, userName, password)
})

//删除用户
router.post("/delete", loginCheck, async (ctx, next) => {
  if (isTest) {
    //测试环境下，删除session中的登录数据
    const { userName } = ctx.session.userInfo
    //调用controller
    ctx.body = await deleteCurUser(userName)
  }
})

//修改个人信息(也需要验证格式)
router.patch(
  "/changeInfo",
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body
    //controller
    //传一个ctx主要是为了取出当前的信息
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
  }
)

//修改密码
router.patch(
  "/changePassword",
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo
    //controller
    ctx.body = await changePassword(userName, password, newPassword)
  }
)

//退出登录
router.post("/logout", loginCheck, async (ctx, next) => {
  // controller
  ctx.body = await logout(ctx)
})
module.exports = router
