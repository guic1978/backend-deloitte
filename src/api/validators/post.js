const { check } = require('express-validator');

exports.validatePostPosts = () => {
  return [
    check('title')
      .exists()
      .withMessage('title: Required field')
      .isLength({ min: 5 })
      .withMessage('title: MinLenth is 5'),
    check('content').exists().withMessage('content: Required field'),
    check('author').exists().withMessage('author: Required field'),
  ];
};

exports.validatePutPosts = () => {
  return [
    check('title')
      .exists()
      .withMessage('title: Required field')
      .isLength({ min: 5 })
      .withMessage('title: MinLenth is 5'),
    check('content').exists().withMessage('content: Required field'),
  ];
};
