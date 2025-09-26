/**
 * Error Handling Middleware
 *
 * Global error handler for Express application.
 * TODO: Implement comprehensive error handling and logging.
 */

import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

/**
 * Global error handling middleware
 * TODO: Implement error categorization and appropriate responses
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // TODO: Categorize different types of errors
  let statusCode = 500;
  let message = 'Internal server error';

  // TODO: Handle specific error types
  if (error.message.includes('not found')) {
    statusCode = 404;
    message = error.message;
  } else if (error.message.includes('validation')) {
    statusCode = 400;
    message = error.message;
  } else if (error.message.includes('unauthorized')) {
    statusCode = 401;
    message = 'Unauthorized access';
  } else if (error.message.includes('Invalid API key')) {
    statusCode = 500;
    message = 'Weather service configuration error';
  }

  const response: ApiResponse<null> = {
    success: false,
    error: message
  };

  res.status(statusCode).json(response);
};

/**
 * 404 Not Found handler
 * TODO: Handle routes that don't exist
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const response: ApiResponse<null> = {
    success: false,
    error: `Route ${req.method} ${req.path} not found`
  };

  res.status(404).json(response);
};

/**
 * Async error wrapper
 * TODO: Implement wrapper for async route handlers
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: Wrap async functions to catch promise rejections
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
