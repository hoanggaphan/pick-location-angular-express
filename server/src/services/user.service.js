import CustomError from '../helpers/CustomError.js';
import User from '../models/user.model.js';

export const getAllUser = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new CustomError('User was not found', 404);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const user = await User.update(data, { where: { id } });
    if (!user[0]) {
      throw new CustomError('User was not found', 404);
    }
    return {
      message: 'User was updated successfully!',
    };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const user = await User.destroy({
      where: { id },
    });
    if (!user) {
      throw new CustomError('User was not found', 404);
    }
    return { message: 'User was deleted successfully!' };
  } catch (error) {
    throw error;
  }
};
