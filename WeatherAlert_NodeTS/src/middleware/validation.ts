/**
 * Validation Middleware
 *
 * Request validation middleware for API endpoints.
 * TODO: Implement validation functions for different request types.
 */

import { Request, Response, NextFunction } from 'express';
import { ApiResponse, ValidationError } from '../types';

/**
 * Validate user ID parameter
 * TODO: Implement user ID validation
 */
export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO: Get user ID from headers or query params
  const userId = req.headers['x-user-id'] as string || req.query.user_id as string;

  if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'User ID is required. Provide user_id in query parameters or x-user-id header.'
    };
    res.status(400).json(response);
    return;
  }

  // TODO: Add user ID to request object for use in controllers
  (req as any).userId = userId.trim();
  next();
};

/**
 * Validate location creation request
 * TODO: Implement location validation
 */
export const validateLocationRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors: ValidationError[] = [];

  // TODO: Validate required fields
  if (!req.body.name || typeof req.body.name !== 'string') {
    errors.push({ field: 'name', message: 'Location name is required and must be a string' });
  }

  if (req.body.latitude === undefined || typeof req.body.latitude !== 'number') {
    errors.push({ field: 'latitude', message: 'Latitude is required and must be a number' });
  } else if (req.body.latitude < -90 || req.body.latitude > 90) {
    errors.push({ field: 'latitude', message: 'Latitude must be between -90 and 90 degrees' });
  }

  if (req.body.longitude === undefined || typeof req.body.longitude !== 'number') {
    errors.push({ field: 'longitude', message: 'Longitude is required and must be a number' });
  } else if (req.body.longitude < -180 || req.body.longitude > 180) {
    errors.push({ field: 'longitude', message: 'Longitude must be between -180 and 180 degrees' });
  }

  // TODO: Validate optional fields
  if (req.body.country && (typeof req.body.country !== 'string' || req.body.country.length < 2)) {
    errors.push({ field: 'country', message: 'Country must be at least 2 characters long' });
  }

  if (req.body.state && (typeof req.body.state !== 'string' || req.body.state.length < 2)) {
    errors.push({ field: 'state', message: 'State must be at least 2 characters long' });
  }

  if (errors.length > 0) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Validation failed',
      message: errors.map(e => `${e.field}: ${e.message}`).join(', ')
    };
    res.status(400).json(response);
    return;
  }

  next();
};

/**
 * Validate alert creation request
 * TODO: Implement alert validation
 */
export const validateAlertRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors: ValidationError[] = [];

  // TODO: Validate location_id
  if (!req.body.location_id || typeof req.body.location_id !== 'string') {
    errors.push({ field: 'location_id', message: 'Location ID is required' });
  }

  // TODO: Validate condition_type
  const validConditionTypes = ['temperature', 'humidity', 'wind_speed', 'pressure', 'visibility'];
  if (!req.body.condition_type || !validConditionTypes.includes(req.body.condition_type)) {
    errors.push({
      field: 'condition_type',
      message: `Condition type must be one of: ${validConditionTypes.join(', ')}`
    });
  }

  // TODO: Validate condition_value
  if (req.body.condition_value === undefined || typeof req.body.condition_value !== 'number') {
    errors.push({ field: 'condition_value', message: 'Condition value is required and must be a number' });
  }

  // TODO: Validate operator
  const validOperators = ['greater_than', 'less_than', 'equals', 'greater_or_equal', 'less_or_equal'];
  if (!req.body.operator || !validOperators.includes(req.body.operator)) {
    errors.push({
      field: 'operator',
      message: `Operator must be one of: ${validOperators.join(', ')}`
    });
  }

  // TODO: Validate message
  if (!req.body.message || typeof req.body.message !== 'string' || req.body.message.trim().length < 5) {
    errors.push({ field: 'message', message: 'Alert message is required and must be at least 5 characters long' });
  }

  if (errors.length > 0) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Validation failed',
      message: errors.map(e => `${e.field}: ${e.message}`).join(', ')
    };
    res.status(400).json(response);
    return;
  }

  next();
};

/**
 * Validate pagination parameters
 * TODO: Implement pagination validation
 */
export const validatePagination = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // TODO: Parse and validate page and limit parameters
  let page = 1;
  let limit = 10;

  if (req.query.page) {
    const parsedPage = parseInt(req.query.page as string);
    if (isNaN(parsedPage) || parsedPage < 1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Page must be a positive integer'
      };
      res.status(400).json(response);
      return;
    }
    page = parsedPage;
  }

  if (req.query.limit) {
    const parsedLimit = parseInt(req.query.limit as string);
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Limit must be between 1 and 100'
      };
      res.status(400).json(response);
      return;
    }
    limit = parsedLimit;
  }

  // TODO: Add pagination info to request
  (req as any).pagination = { page, limit, offset: (page - 1) * limit };
  next();
};
