const { check } = require('express-validator');

exports.validateServices = () => {
  return [
    check('name')
      .exists()
      .withMessage('name: Required field')
      .isLength({ min: 5 })
      .withMessage('name: MinLenth is 5'),
    check('description').exists().withMessage('description: Required field'),
  ];
};
