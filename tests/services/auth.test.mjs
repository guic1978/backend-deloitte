import { createRequire } from 'node:module';
import { describe, it, expect, beforeEach, vi } from 'vitest';

const require = createRequire(import.meta.url);

const models = require('../../src/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userFindOne = vi.spyOn(models.User, 'findOne');
const compare = vi.spyOn(bcrypt, 'compare');
const sign = vi.spyOn(jwt, 'sign');

describe('auth service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('autentica o usuário e retorna um JWT com o userId', async () => {
    userFindOne.mockResolvedValue({
      id: 7,
      name: 'Admin',
      email: 'admin@example.com',
      password: 'hashed-password',
      mainRole: 'Admin',
    });
    compare.mockResolvedValue(true);
    sign.mockReturnValue('jwt-token');

    const service = require('../../src/services/auth');
    const result = await service.postLogin({ email: 'admin@example.com', password: 'secret' });

    expect(result).toEqual({ data: { token: 'jwt-token', userId: '7' } });
    expect(compare).toHaveBeenCalledWith('secret', 'hashed-password');
    expect(sign).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 7, mainRole: 'Admin' }),
      'test-secret',
      { expiresIn: '1h' }
    );
  });

  it('rejeita login de usuário inexistente', async () => {
    userFindOne.mockResolvedValue(null);
    const service = require('../../src/services/auth');

    await expect(service.postLogin({ email: 'missing@example.com', password: 'secret' }))
      .rejects.toMatchObject({ message: 'User not found or invalid password', statusCode: 404 });
  });

  it('rejeita senha inválida', async () => {
    userFindOne.mockResolvedValue({ password: 'hashed-password' });
    compare.mockResolvedValue(false);
    const service = require('../../src/services/auth');

    await expect(service.postLogin({ email: 'admin@example.com', password: 'wrong' }))
      .rejects.toMatchObject({ message: 'User not found or invalid password', statusCode: 404 });
  });
});
