/**
 * @description 微博主页的业务逻辑
 * @author SeekingLight
 */

const { createBlog } = require("../services/blog")
const { SuccessModel, ErrorModel } = require("../model/ResModel")
const { createBlogFailInfo } = require("../model/Errorinfo")
/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据 { userId, content, image }
 */
async function create({ userId, content, image }) {
  //service
  try {
    //创建微博
    const blog = await createBlog({ userId, content, image })
    return new SuccessModel(blog)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = { create }
