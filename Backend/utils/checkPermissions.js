const CustomAPIError = require('./custom-api');

const chechPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomAPIError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = chechPermissions;
