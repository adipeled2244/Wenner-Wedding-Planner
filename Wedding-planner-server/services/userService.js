const User = require("../models/user");
const logger = require("../helpers/winston");
const path = require("path");
const ObjectId = require("mongoose").Types.ObjectId;
const {assignSeatsToTablesForAll,createMapGuestandTable} = require ("../modules/tables");

module.exports = {
  addUser,
  updateUser,
  getUser,
  getUsers,
  addGuestToUser,
  addTableToUser,
  getUserByName,
  assignUserGuestsToTables
};

async function getUser(id) {
  logger.info(`[getUser] - ${path.basename(__filename)}`);
  return await User.findOne({ _id: id });
}

async function getUserByName(name) {
  logger.info(`[getUserByName] - ${path.basename(__filename)}`);
  return await User.findOne({ name: name });
}


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

  async function addGuestToUser(id, params) {
    logger.info(`[addGuestToUser] - ${path.basename(__filename)}`);
    const user = await User.findById(id);
    user.guests.push(params.guest);
    return await user.save();
  }

  async function addTableToUser(id, params) {
    logger.info(`[addGuestToUser] - ${path.basename(__filename)}`);
    const user = await User.findById(id);
    user.tables.push(params.table);
    return await user.save();
  }

  async function assignUserGuestsToTables(id) {
    const user = await User.findById(id);
    const guests = user.guests;
    const tables = user.tables;
    
    const assigns = JSON.stringify(assignSeatsToTablesForAll(guests, tables), null, 2)
    const mapGuestAndTable = createMapGuestandTable(assigns);
    console.log("mapGuestAndTable",mapGuestAndTable)
    for (const guest of guests) {
       const guestId = guest._id.toString();
      const tableNumber = mapGuestAndTable.get(guestId);

      guest.table=tableNumber;
     }
     
     await User.findByIdAndUpdate(id, {...user, guests})

     return guests ;
     // return await User.updateOne(
    //   { _id: id },
    //   { guests }
    // );

   }

