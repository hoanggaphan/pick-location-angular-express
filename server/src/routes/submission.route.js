import express from 'express';
import * as submissionController from '../controllers/submission.controller.js';

const router = express.Router();

router.get('/', submissionController.getAllSubmission);
router.get('/:id', submissionController.getSubmission);
router.post('/', submissionController.createSubmission);
router.post('/submit', submissionController.submit);
router.put('/:id', submissionController.updateSubmission);
router.delete('/:id', submissionController.deleteSubmission);

export default router;
