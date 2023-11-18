import * as jwtHelper from '../helpers/jwt.helper.js';

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const checkAccessToken = async (req, res, next) => {
  const authHeader =
    req.headers['authorization'] ||
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];

  if (!authHeader)
    return res.status(401).json({
      message: 'No authorization header',
    });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await jwtHelper.verifyToken(
      token,
      jwtHelper.accessTokenSecret
    );

    req.jwtDecoded = decoded;
    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({
        message: 'Access token expired',
      });
    }
    return res.status(401).json({
      message: error.message,
    });
  }
};
