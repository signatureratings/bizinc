const express = require('express');
const userRouter = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
  getSingleUser,
  getAllUsers
} = require('../controllers/userController');

userRouter.get('/', authenticateUser, getAllUsers);
userRouter.get('/:id', authenticateUser, getSingleUser);

module.exports = userRouter;