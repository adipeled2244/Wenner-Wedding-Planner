const userService = require("../services/userService");
const path = require("path");
const logger = require("../helpers/winston");

exports.userController = {
  async getUsers(req, res) {
    logger.info(`[getUsers] - ${path.basename(__filename)}`);
    let users;
    try {
      users = await userService.getUsers();
      if (users) {
        return res.status(200).json({ users });
      } else {
        return res.status(404).json({ error: "Error get users" });
      }
    } catch (err) {
      res.status(500).send({ error: `Error get users : ${err}` });
      return;
    }
  },

  async getUser(req, res) {
    logger.info(`[getUser] - ${path.basename(__filename)}`);
    let user;
    const userIdParam = req.params.userId;
    try {
      user = await userService.getUser(userIdParam);
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      res
        .status(500)
        .send({ error: `Error get user: ${userIdParam} : ${err}` });
      return;
    }
  },
  async addUser(req, res) {
    logger.info(`[addUser] - ${path.basename(__filename)}`);
    const userParams = req.body;
    if (!userParams) {
      res.status(400).send({ error: "invalid params" });
    }

    try {
      const newUser = await userService.addUser(userParams);
      res.status(200).json({ user: newUser });
    } catch (err) {
      res.status(400).json({ error: ` ${err}` });
      return;
    }
  },

  async updateUser(req, res) {
    logger.info(`[updateUserGuest] - ${path.basename(__filename)}`);
    const userIdParam = req.params.userId;
    const userParams = req.body;
    let updateResult;

    try {
      updateResult = await userService.updateUser(userIdParam, userParams);
      return res.status(200).json({ message: "User updated" });
    } catch (err) {
      res
        .status(500)
        .json({ error: `Error update user ${userIdParam} : ${err}` });
      return;
    }
  },

  async addGuestToUser(req, res) {
    logger.info(`[addGuestToUser] - ${path.basename(__filename)}`);
    console.log("addGuestToUser");
    const userIdParam = req.params.userId;
    const userParams = req.body;
    try {
      const user = await userService.getUser(userIdParam);
      const existingGuest = user.guests.find(
        (guest) => guest.email === userParams.guest.email
      );
      if (existingGuest) {
        return res.status(200).json({ message: "Guest already exist" });
      }
      const updatedUser = await userService.addGuestToUser(
        userIdParam,
        userParams
      );
      const newGuest = updatedUser.guests[updatedUser.guests.length - 1];
      return res.status(200).json({ message: "Guest added", guest: newGuest });
    } catch (err) {
      res
        .status(500)
        .json({ error: `Error add guest to ${userIdParam} : ${err}` });
      return;
    }
  },

  async addTableToUser(req, res) {
    logger.info(`[addTableToUser] - ${path.basename(__filename)}`);
    const userIdParam = req.params.userId;
    const userParams = req.body;
    console.log(userParams)
    try {
      const updatedUser = await userService.addTableToUser(
        userIdParam,
        userParams
      );
      const newTable = updatedUser.tables[updatedUser.tables.length - 1];
      return res.status(200).json({ message: "Table added", table: newTable });
    } catch (err) {
      res
        .status(500)
        .json({ error: `Error add table to ${userIdParam} : ${err}` });
      return;
    }
  },

  //update invitation status of guest to true
  async updateUserGuest(req, res) {
    const { userId, guestId } = req.params;

    let user;
    try {
      user = await userService.getUser(userId);
      if (user) {
        const guest = user.guests.id(guestId);

        if (!guest) {
          return res.status(404).json({ message: "Guest not found" });
        }

        guest.invitation = true;
        await user.save();

        res.status(200).json({ message: "Guest updated successfully" });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },


  async assignUserGuestsToTables(req, res) {
    const userIdParam = req.params.userId;
     try {
      const updatedGuests = await userService.assignUserGuestsToTables(
        userIdParam,
       );
       console.log("adika this is the new user with guests",updatedGuests);

      return res.status(200).json({ message: "Guests assigned to tables", updatedGuests });
    } catch (err) {
      res
        .status(500)
        .json({ error: `Error assign guests to tables : ${err}` });
      return;
    }

  }
};
