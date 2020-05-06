/**
 * @description jest server
 * @author SeekingLight
 */
const request = require("supertest");
const server = require("../src/app").callback();

module.exports = request(server);
