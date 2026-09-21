import { createRequire } from 'node:module';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);
const AuthServices = require('../../src/services/auth');
const controller = require('../../src/api/controllers/auth');

const postLogin = vi.spyOn(AuthServices, 'postLogin');

const response = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('auth controller', () => {
  beforeEach(() => vi.clearAllMocks());

  it('faz login e responde 200 com o resultado do serviço', async () => {
    const req = { body: { email: 'ana@example.com', password: 'secret' } };
    const res = response();
    postLogin.mockResolvedValue({ data: { token: 'token' } });

    await controller.postLogin(req, res, vi.fn());

    expect(postLogin).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: { token: 'token' } });
  });

  it('encaminha o erro do login e atribui 500 quando não há status', async () => {
    const res = response();
    const next = vi.fn();
    const error = new Error('database unavailable');
    postLogin.mockRejectedValue(error);

    await controller.postLogin({ body: {} }, res, next);

    expect(error.statusCode).toBe(500);
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});
