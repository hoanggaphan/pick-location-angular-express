import { body } from 'express-validator';
import validate from '../helpers/validate.helper.js';
import { db } from '../configs/db.config.js';

const User = db.users;

export const register = validate([
  body(
    'username',
    'username are limited to 3-16 characters and do not contain special characters.'
  )
    .isLength({ min: 3, max: 16 })
    .matches(
      /^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/
    )
    .custom(async (username) => {
      const user = await User.findOne({ where: { username } });
      if (user) {
        throw new Error('username already in use');
      }
    }),
  body(
    'password',
    'password has at least 6 characters, including uppercase letters, numbers and special characters'
  )
    .isLength({ min: 6 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/
    ),
  body('confirm_password', 'Re-enter the password incorrectly').custom(
    (value, { req }) => {
      return value === req.body.password;
    }
  ),
]);

export const login = validate([
  body('username', 'username is missing')
    .trim()
    .notEmpty()
    .escape()
    .custom(async (username, { req }) => {
      const user = await User.findOne({ where: { username }, raw: true });
      if (!user) {
        throw new Error('username was not exists');
      }
      req.foundUser = user;
    }),
  body('password', 'password is missing').trim().notEmpty().escape(),
]);

export const refreshToken = validate([
  body('refreshToken', 'Token is missing').trim().notEmpty(),
]);
