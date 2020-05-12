/**
 * @description blog service
 * @author SeekingLight
 */

const { Blog } = require("../db/model/index")

/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据 { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image,
  })
  //这里的dataValues是创建的值
  return result.dataValues
}

module.exports = {
  createBlog,
}
