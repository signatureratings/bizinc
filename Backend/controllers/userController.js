
const { StatusCodes } = require('http-status-codes');

const {
  createTokenUser,
  attachCookiesToResponse,
} = require('../utils');


const getAllUsers = async (req, res) => {
  console.log(req.user);
 // const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  //const user = await User.findOne({ userID: req.params.id }).select('-password');
  if (!user) {
   return res.status(StatusCodes.BAD_REQUEST).json({message:`No user with id : ${req.params.id}`});
  }
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};


module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser
};
