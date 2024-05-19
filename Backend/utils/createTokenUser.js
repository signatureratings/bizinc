const createTokenUser = (user) => {
  return { name: user.name, userID: user.userid, email: user.email};
};

module.exports = createTokenUser;
