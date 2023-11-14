import * as locationService from './location.service.js';
import * as userService from './user.service.js';

export const submit = async (data) => {
  try {
    const { userId, location } = data;
    return data;
  } catch (error) {
    throw error;
  }
};
