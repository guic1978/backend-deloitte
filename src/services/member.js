const { Member } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

/**
 * Retorna todos os membros cadastrados.
 *
 * @returns {Promise<{ data: Array<Object> }>} Lista de membros.
 */
exports.getAll = async () => {
  const members = await Member.findAll();
  return new Promise((resolve) => {
    resolve({
      data: members,
    });
  });
};

/**
 * Retorna um membro pelo seu id.
 *
 * @param {number} id - Id do membro.
 * @returns {Promise<{ data: Object }>} Dados do membro encontrado.
 * @throws {Error} Caso o membro não seja encontrado (404).
 */
exports.getById = async (id) => {
  const member = await checkIfExists(id);

  return new Promise((resolve) => {
    resolve({
      data: member,
    });
  });
};

/**
 * Cria um novo membro.
 * Garante que não exista outro membro com o mesmo e-mail.
 *
 * @param {Object} memberDto - Dados do membro a ser criado.
 * @returns {Promise<{ data: { id: number } }>} Id do membro criado.
 * @throws {Error} Caso já exista um membro com o e-mail informado (409).
 */
exports.postCreate = async (memberDto) => {
  await checkIfNotExistsByEmail(memberDto.email);
  const member = await Member.create(memberDto);
  return new Promise((resolve) => {
    resolve({
      data: { id: member.id },
    });
  });
};

/**
 * Atualiza os dados de um membro existente.
 * Apenas os campos enviados são alterados (os demais permanecem inalterados).
 *
 * @param {number} id - Id do membro a ser atualizado.
 * @param {Object} memberDto - Dados a serem atualizados.
 * @returns {Promise<{ data: Object }>} Dados do membro atualizado.
 * @throws {Error} Caso o membro não seja encontrado (404).
 */
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

/**
 * Remove um membro pelo seu id.
 *
 * @param {number} id - Id do membro a ser removido.
 * @returns {Promise<{ data: Object }>} Dados do membro removido.
 * @throws {Error} Caso o membro não seja encontrado (404).
 */
exports.deleteById = async (id) => {
  const member = await checkIfExists(id);

  await member.destroy();
  return new Promise((resolve) => {
    resolve({
      data: member,
    });
  });
};

/**
 * Verifica se um membro existe pelo seu id.
 *
 * @param {number} id - Id do membro.
 * @returns {Promise<Object>} Objeto do membro encontrado.
 * @throws {Error} Caso o membro não seja encontrado (404).
 */
const checkIfExists = async (id) => {
  const member = await Member.findByPk(id);
  if (!member) {
    const error = new Error('Item not found');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(member));
};

/**
 * Verifica se NÃO existe um membro com o e-mail informado.
 *
 * @param {string} email - E-mail a ser verificado.
 * @returns {Promise<Object>} Objeto do membro encontrado (ou null).
 * @throws {Error} Caso já exista um membro com o e-mail informado (409).
 */
const checkIfNotExistsByEmail = async (email) => {
  const member = await Member.findOne({ where: [{ email }] });
  if (member) {
    const error = new Error('Member already created');
    error.statusCode = HttpStatus.CONFLICT;
    throw error;
  }

  return new Promise((resolve) => resolve(member));
};
