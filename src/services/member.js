const { Member } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

exports.getAll = async () => {
  const members = await Member.findAll();
  return new Promise((resolve) => {
    resolve({
      data: members,
    });
  });
};

exports.getById = async (id) => {
  const member = await checkIfExists(id);

  return new Promise((resolve) => {
    resolve({
      data: member,
    });
  });
};

exports.postCreate = async (memberDto) => {
  await checkIfNotExistsByEmail(memberDto.email);
  const member = await Member.create(memberDto);
  return new Promise((resolve) => {
    resolve({
      data: { id: member.id },
    });
  });
};

exports.putUpdate = async (id, memberDto) => {
  const member = await checkIfExists(id);

  member.name = memberDto.name || member.name;
  member.description = memberDto.description || member.description;
  await member.save();

  return new Promise((resolve) => {
    resolve({
      data: member,
    });
  });
};

exports.deleteById = async (id) => {
  const member = await checkIfExists(id);

  await member.destroy();
  return new Promise((resolve) => {
    resolve({
      data: member,
    });
  });
};

const checkIfExists = async (id) => {
  const member = await Member.findByPk(id);
  if (!member) {
    const error = new Error('Item not found');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(member));
};

const checkIfNotExistsByEmail = async (email) => {
  const member = await Member.findOne({ where: [{ email }] });
  if (member) {
    const error = new Error('Member already created');
    error.statusCode = HttpStatus.CONFLICT;
    throw error;
  }

  return new Promise((resolve) => resolve(member));
};
