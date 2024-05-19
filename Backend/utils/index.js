const { createJWT, isTokenValid, attachCookiesToResponse, generateJWT, verifyJWT } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkPermissions = require('./checkPermissions');
const {hashString, hashToken, verifyToken} = require('./createHash');

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  hashString, hashToken, verifyToken,
  generateJWT, verifyJWT
};
