import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const err = result
      .array()
      .map((error) => error.msg)
      .filter((msg) => msg !== 'Invalid value');

    return res.json({ errors: err });
  }

  next();
};
