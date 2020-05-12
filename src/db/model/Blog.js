/**
 * @description 微博数据模型
 * @author SeekingLight
 */

const seq = require("../seq")
const { STRING, TEXT, INTEGER } = require("../types")

const Blog = seq.define("blog", {
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  content: {
    type: TEXT,
    allowNull: false,
    commit: "微博内容",
  },
  image: {
    type: STRING,
    allowNull: true,
  },
})

module.exports = Blog
