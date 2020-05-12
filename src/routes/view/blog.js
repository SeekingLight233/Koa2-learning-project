/**
 * @description 用户界面的路由
 * @author SeekingLight
 */

const router = require("koa-router")()

const { loginRedirect } = require("../../middlewares/loginChecks")

router.get("/", loginRedirect, async (ctx, next) => {
  await ctx.render("index", {})
})

module.exports = router
