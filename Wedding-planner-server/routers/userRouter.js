const { Router } = require('express');
const { userController } = require('../controllers/userController');
const userRouter = new Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.post('/', userController.addUser);
userRouter.patch('/:userId/guests/:guestId', userController.updateUserGuest);
userRouter.post('/:userId/tables', userController.addTableToUser);
userRouter.patch('/:userId', userController.updateUser);
userRouter.post('/:userId/guests', userController.addGuestToUser); //! to do: change to:userid/guest

module.exports = { userRouter };