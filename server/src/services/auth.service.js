import bcrypt from 'bcrypt';
import { db } from '../configs/db.config.js';
import CustomError from '../helpers/CustomError.js';
import * as jwtHelper from '../helpers/jwt.helper.js';

const User = db.users;

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
    const decoded = await jwtHelper.verifyToken(
      data.refreshToken,
      jwtHelper.refreshTokenSecret
    );
    const accessToken = await jwtHelper.generateToken(
      decoded.data,
      jwtHelper.accessTokenSecret,
      jwtHelper.accessTokenLife
    );
    return { accessToken };
  } catch (error) {
    throw new CustomError(error.message, 401);
  }
};
