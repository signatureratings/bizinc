const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

// const hashString = (string) =>
//   crypto.createHash('md5').update(string).digest('hex');


async function hashToken(token) {
    try {
        const result = await bcrypt.hash(token, 10);
        return result;
      } catch (err) {
        console.error(
            'Error occured while converting passoword to hash',
            err.message,
        );
        throw err;
      }
}


async function verifyToken(token, hash) {
    try {
        const result = await bcrypt.compare(token, hash);
        return result;
      } catch (err) {
        console.error(
            'Error occured while converting hash to password',
            err.message,
        );
        throw err;
      }
}

module.exports = {hashToken, verifyToken};
