/**
 * @description json test
 * @author SeekingLight
 */

const server = require("./server");

test("json接口返回格式正确", async () => {
  const res = await server.get("/json");
  //判断对象相等用Equal
  expect(res.body).toEqual({
    title: "koa2 json",
  });
  expect(res.body.title).toBe("koa2 json");
});
