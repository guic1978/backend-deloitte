const { HttpStatus } = require('../../enums/http-status.enum');
const MemberServices = require('../../services/member');

exports.getAll = async (req, res, next) => {
  const result = await MemberServices.getAll();
  res.status(HttpStatus.OK).json(result);
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await MemberServices.getById(id);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.postCreate = async (req, res, next) => {
  const memberDto = {
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
  };

  try {
    const result = await MemberServices.postCreate(memberDto);
    res.status(HttpStatus.CREATED).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.putUpdate = async (req, res, next) => {
  const id = req.params.id;
  const memberDto = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const result = await MemberServices.putUpdate(id, memberDto);
    res.status(HttpStatus.NO_CONTENT).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.deleteById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await MemberServices.deleteById(id);
    res.status(HttpStatus.NO_CONTENT).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};
