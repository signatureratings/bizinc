const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');

const {getUserByEmail, createUser} = require('../Database/user');
const {insertRefreshToken, deleteRefreshToken, getRefreshToken} = require('../Database/token');

const {
  attachCookiesToResponse,
  createTokenUser,
  hashToken,
  verifyToken,
  generateJWT,
  verifyJWT,
  BadRequestError
} = require('../utils');


// new user registration
const register = async (req, res) => {

  const { email, name, password} = req.body;

  if(!email || !name || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide all fields'});
  }
try{
  const user = await getUserByEmail(email);

  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({message: 'User already exists'});
  }

  const userID = uuidv4();
  const hashedPassword = await hashToken(password);

  const newUser = await createUser(userID, name, email, hashedPassword);

  newUser.password = undefined;
  res.status(StatusCodes.CREATED).json({
    message: 'Success! User created',
    data: newUser,
  });
}
catch(error){
  console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Something went wrong',
    });
}
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide all fields'});
  }

  try{

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid user'});
  }

  const isPasswordCorrect = await verifyToken(password, user.password);
  
  if (!isPasswordCorrect) {
    return res.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid Credentials'});
  }

  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = '';
  // check for existing token
  const existingToken = await getRefreshToken(user.userID);

  if (existingToken) {
    const isValid = verifyJWT(existingToken.refreshToken);
    if (!isValid) {
     console.log('Token is not valid');
      await deleteRefreshToken(user.userID);
    }
    refreshToken = isValid ? existingToken.token: generateJWT(tokenUser, '30d');
    let accessToken = generateJWT(tokenUser, '1d');
    attachCookiesToResponse({ res, accessToken, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = generateJWT(tokenUser, '30d');
  let accessToken = generateJWT(tokenUser, '1d');
  const userAgent = req.headers['user-agent'];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user.userID };
  const expirtyDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const id = uuidv4();
  await insertRefreshToken(id, refreshToken, user.userid, expirtyDate);

  attachCookiesToResponse({ res, accessToken, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser, refreshToken: refreshToken, accessToken: accessToken});
}
catch(error){
  console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: 'Something went wrong',
    });
}}

const logout = async (req, res) => {
  const { userid } = req.user;
  await deleteRefreshToken(userid);
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};



module.exports = {
  register,
  login,
  logout,
}