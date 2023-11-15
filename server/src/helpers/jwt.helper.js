import jwt from 'jsonwebtoken';

export const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1d';
export const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || 'access-tk-secret-toidilove-@123';
export const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '7d';
export const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || 'refresh-tk-secret-toidilove-@123';

/**
 * private function generateToken
 * @param {object} user
 * @param {string} secretSignature
 * @param {string} tokenLife
 */
export const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      id: user.id,
      username: user.username,
      roles: user.roles,
    };

    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
export const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
