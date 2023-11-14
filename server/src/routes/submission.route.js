import express from 'express';
import * as submissionController from '../controllers/submission.controller.js';

const router = express.Router();

router.post('/', submissionController.submit);

export default router;
