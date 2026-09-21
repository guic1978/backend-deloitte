import { createRequire } from 'node:module';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const ServiceServices = require('../../src/services/service');
const controller = require('../../src/api/controllers/service');
const methods = ['getAll', 'getById', 'postCreate', 'putUpdate', 'deleteById'];
const spies = Object.fromEntries(methods.map((method) => [method, vi.spyOn(ServiceServices, method)]));

const response = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('service controller', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lista serviços', async () => {
    const result = { data: [{ id: 1 }] };
    spies.getAll.mockResolvedValue(result);
    const res = response();

    await controller.getAll({}, res, vi.fn());

    expect(spies.getAll).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('busca serviço por id', async () => {
    const result = { data: { id: 2 } };
    spies.getById.mockResolvedValue(result);
    const res = response();

    await controller.getById({ params: { id: '2' } }, res, vi.fn());

    expect(spies.getById).toHaveBeenCalledWith('2');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('cria serviço', async () => {
    const result = { data: { id: 3 } };
    spies.postCreate.mockResolvedValue(result);
    const res = response();

    await controller.postCreate({ body: { name: 'Consultoria', description: 'Dev', ignored: true } }, res, vi.fn());

    expect(spies.postCreate).toHaveBeenCalledWith({ name: 'Consultoria', description: 'Dev' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('atualiza serviço', async () => {
    const result = { data: { id: 4 } };
    spies.putUpdate.mockResolvedValue(result);
    const res = response();

    await controller.putUpdate({ params: { id: '4' }, body: { name: 'Novo', description: 'Descrição', ignored: true } }, res, vi.fn());

    expect(spies.putUpdate).toHaveBeenCalledWith('4', { name: 'Novo', description: 'Descrição' });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('exclui serviço', async () => {
    const result = { data: { id: 5 } };
    spies.deleteById.mockResolvedValue(result);
    const res = response();

    await controller.deleteById({ params: { id: '5' } }, res, vi.fn());

    expect(spies.deleteById).toHaveBeenCalledWith('5');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('encaminha erro de busca com status interno padrão', async () => {
    const error = new Error('failure');
    const next = vi.fn();
    spies.getById.mockRejectedValue(error);

    await controller.getById({ params: { id: '5' } }, response(), next);

    expect(error.statusCode).toBe(500);
    expect(next).toHaveBeenCalledWith(error);
  });
});
