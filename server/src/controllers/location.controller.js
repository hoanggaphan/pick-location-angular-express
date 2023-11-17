import * as locationService from '../services/location.service.js';

export const getAllLocation = async (req, res, next) => {
  try {
    const data = await locationService.getAllLocation();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getLocation = async (req, res, next) => {
  try {
    const data = await locationService.getLocation(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createLocation = async (req, res, next) => {
  try {
    const data = await locationService.createLocation(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const submit = async (req, res, next) => {
  try {
    const data = await locationService.submit(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const data = await locationService.updateLocation(req.params.id, req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    const data = await locationService.deleteLocation(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
