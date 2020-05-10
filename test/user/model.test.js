/**
 * @description user model test
 * @author SeekingLight
 */

const { User } = require("../../src/db/model/index")

test("User 模型的各个属性，符合预期", () => {
  //build会构建一个实例，但不会提交到数据库中
  const user = User.build({
    userName: "zhangsan",
    password: "p123456",
    nickName: "法外狂徒",
    picture: "//url",
    city: "北京",
  })
  //验证属性
  expect(user.userName).toBe("zhangsan")
  expect(user.password).toBe("p123456")
  expect(user.nickName).toBe("法外狂徒")
  expect(user.picture).toBe("//url")
  expect(user.city).toBe("北京")
  expect(user.gender).toBe(3)
})
