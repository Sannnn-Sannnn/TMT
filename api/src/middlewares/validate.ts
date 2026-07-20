import { ZodType, treeifyError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: treeifyError(result.error) });
  }
  req.body = result.data;
  next();
};
