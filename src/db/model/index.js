/**
 * @description 数据模型的入口文件
 * @author SeekingLight
 */

const User = require("./User")
const Blog = require("./Blog")
//外键约束
Blog.belongsTo(User, {
  foreignKey: "userId",
})

// User.hasMany(Blog)
module.exports = {
  User,
  Blog,
}
