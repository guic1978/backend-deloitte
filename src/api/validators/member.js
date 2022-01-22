const { check, body } = require('express-validator');

exports.validatePostMembers = () => {
  return [
    check('name')
      .exists()
      .withMessage('name: Required field')
      .isLength({ min: 5 })
      .withMessage('name: MinLenth is 5'),
    check('email')
      .exists()
      .withMessage('email: Required field')
      .isEmail()
      .withMessage('email: Invalid email')
      .normalizeEmail({ gmail_remove_dots: false }),
    check('description').exists().withMessage('description: Required field'),
  ];
};

exports.validatePutMembers = () => {
  return [
    check('name')
      .exists()
      .withMessage('name: Required field')
      .isLength({ min: 5 })
      .withMessage('name: MinLenth is 5'),
    check('description').exists().withMessage('description: Required field'),
  ];
};
