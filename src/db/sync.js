/**
 * @description sequelize同步数据库
 * @author SeekingLight
 */
const seq = require("./seq")

require("./model/index")

seq
  .authenticate()
  .then(() => {
    console.log("ok")
  })
  .catch(() => {
    console.log("error")
  })
//force设置为true会清空之前的数据
seq.sync({ force: false }).then(() => {
  console.log("sync ok")
  process.exit()
})
