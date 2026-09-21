import { createRequire } from 'node:module';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const require = createRequire(import.meta.url);

const models = require('../../src/models');
const findAll = vi.spyOn(models.Service, 'findAll');
const findByPk = vi.spyOn(models.Service, 'findByPk');
const create = vi.spyOn(models.Service, 'create');
const save = vi.fn();
const destroy = vi.fn();

describe('service service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lista todos os serviços', async () => {
    findAll.mockResolvedValue([{ id: 1, name: 'Consultoria' }]);
    const service = require('../../src/services/service');
    await expect(service.getAll()).resolves.toEqual({ data: [{ id: 1, name: 'Consultoria' }] });
  });

  it('busca serviço por id', async () => {
    findByPk.mockResolvedValue({ id: 1, name: 'Consultoria' });
    const service = require('../../src/services/service');
    await expect(service.getById(1)).resolves.toEqual({ data: { id: 1, name: 'Consultoria' } });
  });

  it('retorna 404 quando o serviço não existe', async () => {
    findByPk.mockResolvedValue(null);
    const service = require('../../src/services/service');
    await expect(service.getById(99)).rejects.toMatchObject({ message: 'Item not found', statusCode: 404 });
  });

  it('cria serviço e retorna seu id', async () => {
    create.mockResolvedValue({ id: 2 });
    const service = require('../../src/services/service');
    await expect(service.postCreate({ name: 'Novo', description: 'Descrição' }))
      .resolves.toEqual({ data: { id: 2 } });
    expect(create).toHaveBeenCalledWith({ name: 'Novo', description: 'Descrição' });
  });

  it('atualiza serviço preservando campos ausentes', async () => {
    const item = { id: 1, name: 'Antigo', description: 'Descrição', save };
    findByPk.mockResolvedValue(item);
    const service = require('../../src/services/service');
    await service.putUpdate(1, { name: 'Novo' });
    expect(item).toMatchObject({ name: 'Novo', description: 'Descrição' });
    expect(save).toHaveBeenCalledOnce();
  });

  it('exclui serviço por id', async () => {
    const item = { id: 1, destroy };
    findByPk.mockResolvedValue(item);
    const service = require('../../src/services/service');
    await expect(service.deleteById(1)).resolves.toEqual({ data: item });
    expect(destroy).toHaveBeenCalledOnce();
  });
});
