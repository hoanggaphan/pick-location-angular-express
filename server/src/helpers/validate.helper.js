import { validationResult } from 'express-validator';

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const { msg: message } = errors.array({ onlyFirstError: true })[0];
    res.status(400).json({ error: { message } });
  };
};

export default validate;
