const { Post } = require('../models');
const { HttpStatus } = require('../enums/http-status.enum');

exports.getAll = async () => {
  const posts = await Post.findAll();
  return new Promise((resolve) => {
    resolve({
      data: posts,
    });
  });
};

exports.getById = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

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

exports.deleteById = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) {
    const error = new Error('Post not found');
    error.statusCode = HttpStatus.NOT_FOUND;
    throw error;
  }

  await post.destroy();
  return new Promise((resolve) => {
    resolve({
      data: post,
    });
  });
};
