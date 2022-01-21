const { HttpStatus } = require('../../enums/http-status.enum');

exports.getAll = async (req, res, next) => {
  const result = [
    {
      id: 1,
      title: 'title',
      content: 'content',
      author: 'Guilherme Reis',
      date: '20220121',
    },
  ];
  res.status(HttpStatus.OK).json(result);
};
