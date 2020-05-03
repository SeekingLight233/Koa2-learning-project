const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
  });
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});
//获取动态用户参数
router.get("/profile/:userName", async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: "用户的profile页面",
    userName,
  };
});

router.get("/loadMore/:userName/:pageIndex", async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: "用户的加载更多页面",
    userName,
    pageIndex,
  };
});
module.exports = router;
