const { HttpStatus } = require('../../enums/http-status.enum');

module.exports = (roles = []) => {
  return [
    (req, res, next) => {
      if (roles.length && !roles.some((role) => role === req.userMainRole)) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: 'Not Authorized' });
      }

      next();
    },
  ];
};
