import { createRequire } from 'node:module';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const require = createRequire(import.meta.url);

const models = require('../../src/models');
const findAll = vi.spyOn(models.Member, 'findAll');
const findByPk = vi.spyOn(models.Member, 'findByPk');
const findOne = vi.spyOn(models.Member, 'findOne');
const create = vi.spyOn(models.Member, 'create');
const memberSave = vi.fn();
const memberDestroy = vi.fn();

describe('member service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('lista todos os membros', async () => {
    findAll.mockResolvedValue([{ id: 1 }]);
    const service = require('../../src/services/member');
    await expect(service.getAll()).resolves.toEqual({ data: [{ id: 1 }] });
  });

  it('busca um membro por id', async () => {
    findByPk.mockResolvedValue({ id: 1, name: 'Ana' });
    const service = require('../../src/services/member');
    await expect(service.getById(1)).resolves.toEqual({ data: { id: 1, name: 'Ana' } });
    expect(findByPk).toHaveBeenCalledWith(1);
  });

  it('retorna 404 quando o membro não existe', async () => {
    findByPk.mockResolvedValue(null);
    const service = require('../../src/services/member');
    await expect(service.getById(99)).rejects.toMatchObject({ message: 'Item not found', statusCode: 404 });
  });

  it('cria membro e retorna seu id', async () => {
    findOne.mockResolvedValue(null);
    create.mockResolvedValue({ id: 2 });
    const service = require('../../src/services/member');
    await expect(service.postCreate({ name: 'Ana', email: 'ana@example.com', description: 'Dev' }))
      .resolves.toEqual({ data: { id: 2 } });
    expect(create).toHaveBeenCalledWith({ name: 'Ana', email: 'ana@example.com', description: 'Dev' });
  });

  it('impede membro duplicado pelo e-mail', async () => {
    findOne.mockResolvedValue({ id: 1 });
    const service = require('../../src/services/member');
    await expect(service.postCreate({ email: 'ana@example.com' }))
      .rejects.toMatchObject({ message: 'Member already created', statusCode: 409 });
    expect(create).not.toHaveBeenCalled();
  });

  it('atualiza membro preservando campos ausentes', async () => {
    const member = { id: 1, name: 'Ana', description: 'Antiga', save: memberSave };
    findByPk.mockResolvedValue(member);
    const service = require('../../src/services/member');
    await service.putUpdate(1, { name: 'Bia' });
    expect(member.name).toBe('Bia');
    expect(member.description).toBe('Antiga');
    expect(memberSave).toHaveBeenCalledOnce();
  });

  it('exclui membro por id', async () => {
    const member = { id: 1, destroy: memberDestroy };
    findByPk.mockResolvedValue(member);
    const service = require('../../src/services/member');
    await expect(service.deleteById(1)).resolves.toEqual({ data: member });
    expect(memberDestroy).toHaveBeenCalledOnce();
  });
});
