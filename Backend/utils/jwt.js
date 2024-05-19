const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

async function verifyJWT(token) {
  try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
  } catch (error) {
      console.error(error.message);
      return null;
  }
}

function generateJWT(data, expiresIn) {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
  return token;
}

const attachCookiesToResponse = ({ res, accessToken, refreshToken }) => {
  //const accessTokenJWT = generateJWT(user, '1d');
  //const refreshTokenJWT = generateJWT(user, '30d');

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  if(accessToken){
  res.cookie('accessToken', accessToken, {
    sameSite: 'none',
    httpOnly: true,
    secure: true,
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
}

  if(refreshToken){
  res.cookie('refreshToken', refreshToken, {
    sameSite: 'none',
    httpOnly: true,
    secure: true,
    signed: true,
    expires: new Date(Date.now() + longerExp),
  });
}
};


module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  generateJWT,
  verifyJWT
};
