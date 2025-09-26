/**
 * Location Routes
 *
 * Defines all routes for location-related endpoints.
 * TODO: Set up all location routes with proper middleware.
 */

import { Router } from 'express';
import { LocationController } from '../controllers/LocationController';
import { validateUserId, validateLocationRequest } from '../middleware/validation';

const router = Router();

// TODO: Apply user validation middleware to all routes
router.use(validateUserId);

/**
 * Location Routes
 */

// TODO: Create location
// POST /api/locations
router.post('/',
  validateLocationRequest,
  LocationController.createLocation
);

// TODO: Get all user locations
// GET /api/locations
router.get('/',
  LocationController.getUserLocations
);

// TODO: Get locations with alert counts
// GET /api/locations/with-alerts
router.get('/with-alerts',
  LocationController.getLocationsWithAlerts
);

// TODO: Get specific location by ID
// GET /api/locations/:id
router.get('/:id',
  LocationController.getLocationById
);

// TODO: Update location
// PUT /api/locations/:id
router.put('/:id',
  // TODO: Add partial validation middleware if needed
  LocationController.updateLocation
);

// TODO: Delete location
// DELETE /api/locations/:id
router.delete('/:id',
  LocationController.deleteLocation
);

export default router;
