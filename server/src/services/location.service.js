import { db } from '../configs/db.config.js';
import CustomError from '../helpers/CustomError.js';

const Location = db.locations;

export const getAllLocation = async () => {
  try {
    return await Location.findAll();
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

export const submit = async (data) => {
  try {
    const { userId, lat, lng } = data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const location = await Location.update(data, { where: { id } });
    if (!location[0]) {
      throw new CustomError('Location not found', 404);
    }
    return {
      message: 'Location was updated successfully!',
    };
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
