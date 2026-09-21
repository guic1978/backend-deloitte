import { createRequire } from 'node:module';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const require = createRequire(import.meta.url);

const models = require('../../src/models');
const bcrypt = require('bcryptjs');
const findOne = vi.spyOn(models.User, 'findOne');
const create = vi.spyOn(models.User, 'create');
const hash = vi.spyOn(bcrypt, 'hash');

describe('user service', () => {
  beforeEach(() => vi.clearAllMocks());

  it('cria usuário com senha criptografada', async () => {
    findOne.mockResolvedValue(null);
    hash.mockResolvedValue('hashed-password');
    create.mockResolvedValue({ id: 1, email: 'guilherme.guic2@gmail.com' });
    const service = require('../../src/services/user');

    const result = await service.postCreate();

    expect(hash).toHaveBeenCalledWith('12345', 12);
    expect(create).toHaveBeenCalledWith({
      name: 'Guilherme Reis Viewer',
      email: 'guilherme.guic2@gmail.com',
      password: 'hashed-password',
      mainRole: 'Viewer',
    });
    expect(result).toEqual({ data: { id: 1, email: 'guilherme.guic2@gmail.com' } });
  });

  it('impede criar usuário já existente', async () => {
    findOne.mockResolvedValue({ id: 1 });
    const service = require('../../src/services/user');

    await expect(service.postCreate())
      .rejects.toMatchObject({ message: 'User alread exists', statusCode: 409 });
    expect(create).not.toHaveBeenCalled();
  });
});
