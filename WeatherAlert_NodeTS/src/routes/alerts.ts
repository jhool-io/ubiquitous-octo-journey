/**
 * Alert Routes
 *
 * Defines all routes for weather alert endpoints.
 * TODO: Set up all alert routes with proper middleware.
 */

import { Router } from 'express';
import { AlertController } from '../controllers/AlertController';
import { validateUserId, validateAlertRequest } from '../middleware/validation';

const router = Router();

// TODO: Apply user validation middleware to all routes
router.use(validateUserId);

/**
 * Alert Routes
 */

// TODO: Create alert
// POST /api/alerts
router.post('/',
  validateAlertRequest,
  AlertController.createAlert
);

// TODO: Get all user alerts
// GET /api/alerts
router.get('/',
  AlertController.getUserAlerts
);

// TODO: Manual alert checking
// GET /api/alerts/check
router.get('/check',
  AlertController.checkAlerts
);

// TODO: Get alert statistics
// GET /api/alerts/statistics
router.get('/statistics',
  AlertController.getAlertStatistics
);

// TODO: Get specific alert by ID
// GET /api/alerts/:id
router.get('/:id',
  AlertController.getAlertById
);

// TODO: Update alert
// PUT /api/alerts/:id
router.put('/:id',
  // TODO: Add partial validation middleware if needed
  AlertController.updateAlert
);

// TODO: Toggle alert active status
// PUT /api/alerts/:id/toggle
router.put('/:id/toggle',
  AlertController.toggleAlert
);

// TODO: Test specific alert
// GET /api/alerts/:id/test
router.get('/:id/test',
  AlertController.testAlert
);

// TODO: Delete alert
// DELETE /api/alerts/:id
router.delete('/:id',
  AlertController.deleteAlert
);

export default router;
