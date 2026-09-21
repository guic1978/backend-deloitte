const { Post } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

/**
 * Retorna todos os posts cadastrados.
 *
 * @returns {Promise<{ data: Array<Object> }>} Lista de posts.
 */
exports.getAll = async () => {
  const posts = await Post.findAll();
  return new Promise((resolve) => {
    resolve({
      data: posts,
    });
  });
};

/**
 * Retorna um post pelo seu id.
 *
 * @param {number} id - Id do post.
 * @returns {Promise<{ data: Object }>} Dados do post encontrado.
 * @throws {Error} Caso o post não seja encontrado (404).
 */
exports.getById = async (id) => {
  const post = await checkIfExists(id);

  return new Promise((resolve) => {
    resolve({
      data: post,
    });
  });
};

exports.postCreate = async (postDto) => {
  const post = await Post.create(postDto);
  return new Promise((resolve) => {
    resolve({
      data: { id: post.id },
    });
  });
};

exports.putUpdate = async (id, postDto) => {
  const post = await checkIfExists(id);

  post.title = postDto.title || post.title;
  post.content = postDto.content || post.content;
  await post.save();

  return new Promise((resolve) => {
    resolve({
      data: post,
    });
  });
};

exports.deleteById = async (id) => {
  const post = await checkIfExists(id);

  await post.destroy();
  return new Promise((resolve) => {
    resolve({
      data: post,
    });
  });
};

const checkIfExists = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) {
    const error = new Error('Item not found');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  return new Promise((resolve) => resolve(post));
};
