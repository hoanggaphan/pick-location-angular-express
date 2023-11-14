import * as submissionService from '../services/submission.service.js';

export const submit = async (req, res, next) => {
  try {
    const data = await submissionService.submit(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
