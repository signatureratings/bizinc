const { verifyJWT, generateJWT, attachCookiesToResponse } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const {getRefreshToken} = require('../Database/token');

const authenticateUser = async (req, res, next) => {

  try {
    //signedCookies or cookies
    console.log(req.signedCookies);

    let accessToken = req.headers.authorization?.split(' ')[1];
    let refreshToken = req.headers.refreshtoken;

    if(!refreshToken && !accessToken){
   res.status(StatusCodes.FORBIDDEN).json({message:'User need to login first to access this route'});
    }

    if (accessToken && refreshToken) {
      const payload = await verifyJWT(accessToken);
      req.user = payload;
      return next();
    }

    const payload = await verifyJWT(refreshToken);
    // check if the refresh token exists in the database
    // if not, throw an error
    // if it exists, generate a new access token and attach it to the response
    // attach the new access token to the response
    const userID = payload?.userID;
    const existingToken = await getRefreshToken(userID);
    if (!existingToken) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'User need to login first to access this route' });
    }
    accessToken = await generateJWT(payload, '1d');

    attachCookiesToResponse({
      res,
      accessToken,
      refreshToken
    });

    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = {
  authenticateUser
};
