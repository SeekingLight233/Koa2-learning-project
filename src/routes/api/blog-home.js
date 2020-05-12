/**
 * @description 首页api
 * @author SeekingLight
 */

const router = require("koa-router")()
const { loginCheck } = require("../../middlewares/loginChecks")
const { genValidator } = require("../../middlewares/validator")
const { create } = require("../../controller/blog-home")
const blogValidate = require("../../validator/blog")
router.prefix("/api/blog")

//创建微博
router.post(
  "/create",
  loginCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body
    //这个地方意思是给id取了个别名
    const { id: userId } = ctx.session.userInfo
    //controller
    ctx.body = await create({ userId, content, image })
  }
)

module.exports = router
