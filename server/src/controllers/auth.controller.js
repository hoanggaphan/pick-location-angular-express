import * as authService from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body, req.foundUser);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const data = await authService.refreshToken(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
