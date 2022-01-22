const { check } = require('express-validator');

exports.validatePostLogin = () => {
  return [
    check('email')
      .exists()
      .withMessage('email: Required field')
      .isEmail()
      .withMessage('email: Invalid email')
      .normalizeEmail({ gmail_remove_dots: false }),
    check('password').exists().withMessage('password: Required field'),
  ];
};
