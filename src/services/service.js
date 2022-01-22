const { Service } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

exports.getAll = async () => {
  const posts = await Service.findAll();
  return new Promise((resolve) => {
    resolve({
      data: posts,
    });
  });
};

exports.getById = async (id) => {
  const service = await checkIfExists(id);

  return new Promise((resolve) => {
    resolve({
      data: service,
    });
  });
};

exports.postCreate = async (serviceDto) => {
  const service = await Service.create(serviceDto);
  return new Promise((resolve) => {
    resolve({
      data: { id: service.id },
    });
  });
};

exports.putUpdate = async (id, serviceDto) => {
  const service = await checkIfExists(id);

  service.name = serviceDto.name || service.name;
  service.description = serviceDto.description || service.description;
  await service.save();

  return new Promise((resolve) => {
    resolve({
      data: service,
    });
  });
};

exports.deleteById = async (id) => {
  const service = await checkIfExists(id);

  await service.destroy();
  return new Promise((resolve) => {
    resolve({
      data: service,
    });
  });
};

const checkIfExists = async (id) => {
  const service = await Service.findByPk(id);
  if (!service) {
    const error = new Error('Item not found');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(service));
};
