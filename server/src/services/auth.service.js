import bcrypt from 'bcrypt';
import CustomError from '../helpers/CustomError.js';
import * as jwtHelper from '../helpers/jwt.helper.js';
import User from '../models/user.model.js';

const saltRounds = 10;

export const register = async (data) => {
  try {
    const hashedPassword = bcrypt.hashSync(data.password, saltRounds);
    const newUser = { ...data, password: hashedPassword };
    return await User.create(newUser);
  } catch (error) {
    throw error;
  }
};

export const login = async (data, foundUser) => {
  try {
    const passCorrect = await bcrypt.compare(data.password, foundUser.password);
    if (!passCorrect) {
      throw new CustomError('Password was not correct', 401);
    }

    const accessToken = await jwtHelper.generateToken(
      foundUser,
      jwtHelper.accessTokenSecret,
      jwtHelper.accessTokenLife
    );

    const refreshToken = await jwtHelper.generateToken(
      foundUser,
      jwtHelper.refreshTokenSecret,
      jwtHelper.refreshTokenLife
    );

    delete foundUser.password;

    return {
      ...foundUser,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (data) => {
  try {
    const decodedData = await jwtHelper.verifyToken(
      data.refreshToken,
      jwtHelper.refreshTokenSecret
    );

    const accessToken = await jwtHelper.generateToken(
      decodedData,
      jwtHelper.accessTokenSecret,
      jwtHelper.accessTokenLife
    );
    return { accessToken };
  } catch (error) {
    if (error.message === 'jwt expired') {
      throw new CustomError('Refresh token expired', 401);
    }
    throw new CustomError(error.message, 401);
  }
};
