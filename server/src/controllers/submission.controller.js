import * as submissionService from '../services/submission.service.js';

export const getAllSubmission = async (req, res, next) => {
  try {
    const data = await submissionService.getAllSubmission();
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getSubmission = async (req, res, next) => {
  try {
    const data = await submissionService.getSubmission(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const createSubmission = async (req, res, next) => {
  try {
    const data = await submissionService.createSubmission(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const submit = async (req, res, next) => {
  try {
    const data = await submissionService.submit(req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const updateSubmission = async (req, res, next) => {
  try {
    const data = await submissionService.updateSubmission(
      req.params.id,
      req.body
    );
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteSubmission = async (req, res, next) => {
  try {
    const data = await submissionService.deleteSubmission(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};
