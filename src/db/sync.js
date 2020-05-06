/**
 * @description sequelize同步数据库
 * @author SeekingLight
 */
const seq = require("./seq")

// require("./model");
seq
  .authenticate()
  .then(() => {
    console.log("ok")
  })
  .catch(() => {
    console.log("error")
  })
//force设置为true会清空之前的数据
seq.sync({ force: true }).then(() => {
  console.log("sync ok")
  process.exit()
})
