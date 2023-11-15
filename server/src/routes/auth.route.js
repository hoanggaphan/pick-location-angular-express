import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import * as authValidation from '../validations/auth.validation.js';

const router = express.Router();

router.post('/login', authValidation.login, authController.login);
router.post('/register', authValidation.register, authController.register);
router.post(
  '/refresh-token',
  authValidation.refreshToken,
  authController.refreshToken
);

export default router;
