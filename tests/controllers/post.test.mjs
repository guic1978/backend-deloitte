import { createRequire } from 'node:module';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const PostServices = require('../../src/services/post');
const controller = require('../../src/api/controllers/post');
const methods = ['getAll', 'getById', 'postCreate', 'putUpdate', 'deleteById'];
const spies = Object.fromEntries(methods.map((method) => [method, vi.spyOn(PostServices, method)]));

const response = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('post controller', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lista posts', async () => {
    const result = { data: [{ id: 1 }] };
    spies.getAll.mockResolvedValue(result);
    const res = response();

    await controller.getAll({}, res, vi.fn());

    expect(spies.getAll).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('busca post por id', async () => {
    const result = { data: { id: 2 } };
    spies.getById.mockResolvedValue(result);
    const res = response();

    await controller.getById({ params: { id: '2' } }, res, vi.fn());

    expect(spies.getById).toHaveBeenCalledWith('2');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('cria post com data no formato ISO', async () => {
    const result = { data: { id: 3 } };
    spies.postCreate.mockResolvedValue(result);
    const res = response();

    await controller.postCreate({ body: { title: 'Título', content: 'Texto', author: 'Ana', ignored: true } }, res, vi.fn());

    expect(spies.postCreate).toHaveBeenCalledWith({
      title: 'Título', content: 'Texto', author: 'Ana', date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T/),
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('atualiza post', async () => {
    const result = { data: { id: 4 } };
    spies.putUpdate.mockResolvedValue(result);
    const res = response();

    await controller.putUpdate({ params: { id: '4' }, body: { title: 'Novo', content: 'Conteúdo', ignored: true } }, res, vi.fn());

    expect(spies.putUpdate).toHaveBeenCalledWith('4', { title: 'Novo', content: 'Conteúdo' });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('exclui post', async () => {
    const result = { data: { id: 5 } };
    spies.deleteById.mockResolvedValue(result);
    const res = response();

    await controller.deleteById({ params: { id: '5' } }, res, vi.fn());

    expect(spies.deleteById).toHaveBeenCalledWith('5');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('encaminha erro de exclusão com status interno padrão', async () => {
    const error = new Error('failure');
    const next = vi.fn();
    spies.deleteById.mockRejectedValue(error);

    await controller.deleteById({ params: { id: '5' } }, response(), next);

    expect(error.statusCode).toBe(500);
    expect(next).toHaveBeenCalledWith(error);
  });
});
