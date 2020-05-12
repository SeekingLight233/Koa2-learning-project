/**
 * @description blog model test
 * @author SeekingLight
 */

const { Blog } = require("../../src/db/model/index")

test("微博模型的各个属性，符合预期", () => {
  //build会构建一个实例，但不会提交到数据库中
  const blog = Blog.build({
    userId: 1,
    content: "微博内容",
    image: "/test.png",
  })
  //验证属性
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe("微博内容")
  expect(blog.image).toBe("/test.png")
})
