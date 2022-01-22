const { HttpStatus } = require('../../enums/http-status.enum');
const PostServices = require('../../services/post');

exports.getAll = async (req, res, next) => {
  const result = await PostServices.getAll();
  res.status(HttpStatus.OK).json(result);
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await PostServices.getById(id);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.postCreate = async (req, res, next) => {
  const postDto = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date().toJSON(),
  };

  const result = await PostServices.postCreate(postDto);
  res.status(HttpStatus.CREATED).json(result);
};

exports.deleteById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await PostServices.deleteById(id);
    res.status(HttpStatus.NO_CONTENT).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};
