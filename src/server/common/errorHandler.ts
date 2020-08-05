import { Express, Request, Response, NextFunction } from 'express';

export type ErrorHandler = (err: any, req: TarRequest, res: Response, next: NextFunction) => void;

export default interface TarRequest extends Request {
  lastError?: any
}

export function initializeErrorHandler(app: Express, errorHandler?: ErrorHandler | undefined) {
  app.use((err: any, req: TarRequest, res: Response, next: NextFunction) => {
      req.lastError = err;
      if (errorHandler) {
          errorHandler(err, req, res, next);
      } else {
          res.status(err.status || 500).send(err);
      }
  });
}