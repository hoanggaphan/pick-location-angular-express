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

    const { msg } = errors.array({ onlyFirstError: true })[0];
    res.status(400).json({ message: msg });
  };
};

export default validate;
