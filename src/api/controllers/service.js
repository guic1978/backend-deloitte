const { HttpStatus } = require('../../enums/http-status.enum');
const ServiceServices = require('../../services/service');

exports.getAll = async (req, res, next) => {
  const result = await ServiceServices.getAll();
  res.status(HttpStatus.OK).json(result);
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await ServiceServices.getById(id);
    res.status(HttpStatus.OK).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.postCreate = async (req, res, next) => {
  const serviceDto = {
    name: req.body.name,
    description: req.body.description,
  };

  const result = await ServiceServices.postCreate(serviceDto);
  res.status(HttpStatus.CREATED).json(result);
};

exports.putUpdate = async (req, res, next) => {
  const id = req.params.id;
  const serviceDto = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const result = await ServiceServices.putUpdate(id, serviceDto);
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
    const result = await ServiceServices.deleteById(id);
    res.status(HttpStatus.NO_CONTENT).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    next(err);
  }
};
