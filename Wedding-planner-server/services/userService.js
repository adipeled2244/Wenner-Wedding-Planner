const User = require("../models/user");
const logger = require("../helpers/winston");
const path = require("path");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  addUser,
  updateUser,
  getUser,
  getUsers
};


async function getUsers(id, params) {
    logger.info(`[getUser] - ${path.basename(__filename)}`);
    return await User.find({});
  }

async function addUser(params) {
    logger.info(`[addUser] - ${path.basename(__filename)}`);
    const newUser = new User(params);
    await newUser.save();
    return newUser;
  }

  async function updateUser(id, params) {
    logger.info(`[updateUser] - ${path.basename(__filename)}`);
    return await User.findByIdAndUpdate(id, params);
  }

  async function getUser(id) {
    logger.info(`[getUser] - ${path.basename(__filename)}`);
  
    return await User.findOne({ _id: id });
  }