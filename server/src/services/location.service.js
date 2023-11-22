import { db } from '../configs/db.config.js';
import CustomError from '../helpers/CustomError.js';

const Location = db.locations;

export const getAllLocation = async (params) => {
  try {
    const { userId = null, status = null } = params;

    let whereCondition = {};

    if (userId) {
      whereCondition.userId = userId;
    }

    if (status) {
      whereCondition.status = status;
    }

    return await Location.findAll({
      where: whereCondition,
    });
  } catch (error) {
    throw error;
  }
};

export const getLocation = async (id) => {
  try {
    const location = await Location.findByPk(id);
    if (!location) {
      throw new CustomError('Location not found', 404);
    }

    return location;
  } catch (error) {
    throw error;
  }
};

export const createLocation = async (data) => {
  try {
    return await Location.create(data);
  } catch (error) {
    throw error;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const location = await Location.update(data, { where: { id }, returning: true });
    if (!location[0]) {
      throw new CustomError('Location not found', 404);
    }
    return location[1][0]
  } catch (error) {
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const location = await Location.destroy({
      where: { id },
    });
    if (!location) {
      throw new CustomError('Location not found', 404);
    }
    return { message: 'Location was deleted successfully!' };
  } catch (error) {
    throw error;
  }
};
