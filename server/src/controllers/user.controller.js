import * as userService from '../services/user.service.js';

export const getAllUser = async (req, res, next) => {
  try {
    const data = await userService.getAllUser();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const data = await userService.getUser(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const data = await userService.createUser(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = await userService.updateUser(req.params.id, req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const data = await userService.deleteUser(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
