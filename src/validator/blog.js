/**
 * @description 微博数据格式校验
 * @author SeekingLight
 */

const validate = require("./_validate")
// 校验规则
const SCHEMA = {
  type: "object",
  properties: {
    content: {
      type: "string",
    },
    image: {
      type: "string",
      maxLength: 255,
    },
  },
}

//执行校验
/**
 * 校验微博数据格式
 * @param {*} data 微博数据
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate
