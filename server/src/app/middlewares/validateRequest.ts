import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const validateRequest =
  (zodSchema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }
      // Pass the full request shape: { body: req.body }
      // so it matches schemas written as z.object({ body: z.object({...}) })
      const parsed = await zodSchema.parseAsync({ body: req.body });
      // Extract the validated body back so downstream middleware/controllers
      // can use req.body as normal
      req.body = (parsed as { body: unknown }).body;
      next();
    } catch (error) {
      next(error);
    }
  };
