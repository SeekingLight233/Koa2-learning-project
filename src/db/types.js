/**
 * @description 统一封装下sequelize数据类型
 * @author SeekingLight
 */

const Sequelize = require("sequelize")

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
}
