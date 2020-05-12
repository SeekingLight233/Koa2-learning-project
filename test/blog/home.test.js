/**
 * @description home api test
 * @author SeekingLight
 */

const server = require("../server")
let BLOG_ID
test("创建一条微博，应该成功", async () => {
  const content = "单元测试微博内容" + Date.now()
  const image = "/xxx.png"

  const res = await server
    .post("/api/blog/create")
    .send({
      content,
      image,
    })
    .set(
      "cookie",
      "weibo.sid=LASc1ZW8zF-lhmUxqD8LVw5D90qZqDEN; weibo.sid.sig=m-K55gSSWzFNilJLooHIOXO96lI"
    )
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  //记录一下微博id
  BLOG_ID = res.body.data.id
})
