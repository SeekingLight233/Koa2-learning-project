const router = require("koa-router")()

router.get("/", async (ctx, next) => {
  //将变量传递到模板中
  await ctx.render("index", {
    title: "Hello Koa 2!",
    isMe: true,
    blogList: [
      {
        id: 1,
        title: "title1",
      },
      {
        id: 2,
        title: "title2",
      },
      {
        id: 3,
        title: "title3",
      },
      {
        id: 4,
        title: "title4",
      },
    ],
  })
})

router.get("/json", async (ctx, next) => {
  // const session = ctx.session;
  // console.log("session: " + session);
  // if (session.viewNum == null) {
  //   session.viewNum = 0;
  // }
  // session.viewNum++;
  ctx.body = {
    title: "koa2 json",
    // viewNum: session.viewNum,
  }
})
//获取动态用户参数
router.get("/profile/:userName", async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: "用户的profile页面",
    userName,
  }
})

router.get("/loadMore/:userName/:pageIndex", async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: "用户的加载更多页面",
    userName,
    pageIndex,
  }
})
module.exports = router
