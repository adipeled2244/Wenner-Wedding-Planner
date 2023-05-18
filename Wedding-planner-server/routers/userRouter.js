const { Router } = require('express');
const { userController } = require('../controllers/userController');
const userRouter = new Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/:userId', userController.getUser);
userRouter.post('/', userController.addUser);
userRouter.patch('/:userId', userController.updateUser);


// more to tables 
// userRouter.post('/:userId/tables', userController.addTable);
// userRouter.get('/:userId/tables', userController.getTable);
// userRouter.patch('/:userId/tables/:tableId', userController.updateTable);
// userRouter.delete('/:userId/tables/:tableId', userController.removeTable);

module.exports = { userRouter };