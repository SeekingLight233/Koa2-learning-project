const path = require("path")
const Koa = require("koa")
const app = new Koa()
const views = require("koa-views")
const json = require("koa-json")
const onerror = require("koa-onerror")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const session = require("koa-generic-session")
const redisStore = require("koa-redis")
const koaStatic = require("koa-static")

const { REDIS_CONF } = require("./conf/db")
const { isProd } = require("./utils/env")
const { SESSON_SECRET_KEY } = require("./conf/constant")

//路由
const errorViewRouter = require("./routes/view/error")
const index = require("./routes/index")
const userViewRouter = require("./routes/view/user")
const userAPIRouter = require("./routes/api/user")
const utilsAPIRouter = require("./routes/api/utils")

// error 页面处理
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: "/error",
  }
}
//problem:这里加上配置后并不会跳转到自定义error页面，而是无限重定向
onerror(app, onerrorConf)

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
)
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + "/public"))
app.use(koaStatic(path.join(__dirname, "..", "uploadFiles")))
//注册views文件夹为主要视图
app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
)

//session配置
app.keys = [SESSON_SECRET_KEY]
app.use(
  session({
    key: "weibo.sid", //cookie name默认是'koa.sid'
    prefix: "weibo.sess:", //redis key 的前缀,默认是 'koa：sess'
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //ms 过期时间1天
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
)

// 路由注册
app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
//注意404路由要注册到最底下
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx)
})

module.exports = app
