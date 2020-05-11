/**
 * @description utils controller
 * @author SeekingLight
 */
const path = require("path")
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { uploadFileSizeFailInfo } = require("../model/Errorinfo")
const fse = require("fs-extra")

//文件最大体积1M
const MIX_SIZE = 1024 * 1024 * 1024
//存储目录
const DIST_FOLDER_PATH = path.join(__dirname, "..", "..", "uploadFiles")
//判断目录是否存在
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {string} name
 * @param {string} type
 * @param {number} size
 * @param {string} filePath
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MIX_SIZE) {
    //文件过大的话要先删掉
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  //移动文件
  const fileName = Date.now() + "." + name //防止重名
  const targetFilePath = path.join(DIST_FOLDER_PATH, fileName) //目的地
  //如果是线上的话，这个地方等于说是将本地缓存中的文件上传到远程的服务器中
  await fse.move(filePath, targetFilePath)

  //返回信息
  return new SuccessModel({ url: "/" + fileName })
}

module.exports = { saveFile }
