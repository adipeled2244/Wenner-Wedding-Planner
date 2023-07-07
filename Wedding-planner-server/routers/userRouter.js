const { Router } = require('express');
const { userController } = require('../controllers/userController');
const userRouter = new Router();

//user
userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.post('/', userController.addUser);

//guests
userRouter.patch('/:userId/guests/tables', userController.assignUserGuestsToTables);
userRouter.post('/:userId/guests', userController.addGuestToUser);
userRouter.patch('/:userId/guests/:guestId', userController.updateUserGuest);

//tables
userRouter.post('/:userId/tables', userController.addTableToUser);
userRouter.patch('/:userId', userController.updateUser);

module.exports = { userRouter };