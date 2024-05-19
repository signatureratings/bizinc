const express = require('express');
const authRouter = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
  register,
  login,
  logout,
} = require('../controllers/authController');

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.delete('/logout', authenticateUser, logout);

module.exports = authRouter;