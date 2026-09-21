import { createRequire } from 'node:module';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const require = createRequire(import.meta.url);

const models = require('../../src/models');
const findAll = vi.spyOn(models.Post, 'findAll');
const findByPk = vi.spyOn(models.Post, 'findByPk');
const create = vi.spyOn(models.Post, 'create');
const save = vi.fn();
const destroy = vi.fn();

describe('post service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lista todos os posts', async () => {
    findAll.mockResolvedValue([{ id: 1, title: 'Post' }]);
    const service = require('../../src/services/post');
    await expect(service.getAll()).resolves.toEqual({ data: [{ id: 1, title: 'Post' }] });
  });

  it('busca post por id', async () => {
    findByPk.mockResolvedValue({ id: 1, title: 'Post' });
    const service = require('../../src/services/post');
    await expect(service.getById(1)).resolves.toEqual({ data: { id: 1, title: 'Post' } });
  });

  it('retorna 404 quando o post não existe', async () => {
    findByPk.mockResolvedValue(null);
    const service = require('../../src/services/post');
    await expect(service.getById(99)).rejects.toMatchObject({ message: 'Item not found', statusCode: 404 });
  });

  it('cria post e retorna seu id', async () => {
    create.mockResolvedValue({ id: 2 });
    const service = require('../../src/services/post');
    await expect(service.postCreate({ title: 'Novo', content: 'Texto', author: 'Ana' }))
      .resolves.toEqual({ data: { id: 2 } });
    expect(create).toHaveBeenCalledWith({ title: 'Novo', content: 'Texto', author: 'Ana' });
  });

  it('atualiza post preservando campos ausentes', async () => {
    const post = { id: 1, title: 'Antigo', content: 'Conteúdo', save };
    findByPk.mockResolvedValue(post);
    const service = require('../../src/services/post');
    await service.putUpdate(1, { title: 'Novo' });
    expect(post).toMatchObject({ title: 'Novo', content: 'Conteúdo' });
    expect(save).toHaveBeenCalledOnce();
  });

  it('exclui post por id', async () => {
    const post = { id: 1, destroy };
    findByPk.mockResolvedValue(post);
    const service = require('../../src/services/post');
    await expect(service.deleteById(1)).resolves.toEqual({ data: post });
    expect(destroy).toHaveBeenCalledOnce();
  });
});
