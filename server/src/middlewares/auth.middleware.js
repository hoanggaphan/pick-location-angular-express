import * as jwtHelper from '../helpers/jwt.helper.js';

/**
 * Middleware: Authorization user by Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const checkToken = async (req, res, next) => {
  const authHeader =
    req.headers['authorization'] ||
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];

  if (!authHeader)
    return res.status(401).json({
      error: {
        message: 'No authorization header',
      },
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
    return res.status(401).json({
      error: {
        message: error.message,
      },
    });
  }
};
