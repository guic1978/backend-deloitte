import { createRequire } from 'node:module';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const MemberServices = require('../../src/services/member');
const controller = require('../../src/api/controllers/member');
const methods = ['getAll', 'getById', 'postCreate', 'putUpdate', 'deleteById'];
const spies = Object.fromEntries(methods.map((method) => [method, vi.spyOn(MemberServices, method)]));

const response = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('member controller', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lista membros com status 200', async () => {
    const result = { data: [{ id: 1 }] };
    spies.getAll.mockResolvedValue(result);
    const res = response();

    await controller.getAll({}, res, vi.fn());

    expect(spies.getAll).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('busca membro por id', async () => {
    const result = { data: { id: 3 } };
    spies.getById.mockResolvedValue(result);
    const res = response();

    await controller.getById({ params: { id: '3' } }, res, vi.fn());

    expect(spies.getById).toHaveBeenCalledWith('3');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('cria membro com apenas os campos permitidos', async () => {
    const result = { data: { id: 4 } };
    spies.postCreate.mockResolvedValue(result);
    const res = response();

    await controller.postCreate({ body: { name: 'Ana', email: 'ana@example.com', description: 'Dev', ignored: true } }, res, vi.fn());

    expect(spies.postCreate).toHaveBeenCalledWith({ name: 'Ana', email: 'ana@example.com', description: 'Dev' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('atualiza membro e responde 204', async () => {
    const result = { data: { id: 5 } };
    spies.putUpdate.mockResolvedValue(result);
    const res = response();

    await controller.putUpdate({ params: { id: '5' }, body: { name: 'Bia', description: 'QA', ignored: true } }, res, vi.fn());

    expect(spies.putUpdate).toHaveBeenCalledWith('5', { name: 'Bia', description: 'QA' });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('exclui membro e responde 204', async () => {
    const result = { data: { id: 6 } };
    spies.deleteById.mockResolvedValue(result);
    const res = response();

    await controller.deleteById({ params: { id: '6' } }, res, vi.fn());

    expect(spies.deleteById).toHaveBeenCalledWith('6');
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('encaminha erro de busca e define status 500 quando necessário', async () => {
    const error = new Error('failure');
    const next = vi.fn();
    spies.getById.mockRejectedValue(error);

    await controller.getById({ params: { id: '9' } }, response(), next);

    expect(error.statusCode).toBe(500);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('preserva statusCode existente ao encaminhar erro de atualização', async () => {
    const error = Object.assign(new Error('not found'), { statusCode: 404 });
    const next = vi.fn();
    spies.putUpdate.mockRejectedValue(error);

    await controller.putUpdate({ params: { id: '9' }, body: {} }, response(), next);

    expect(error.statusCode).toBe(404);
    expect(next).toHaveBeenCalledWith(error);
  });
});
