/**
 * Main Routes Index
 *
 * Combines all route modules and exports them.
 * TODO: Set up main router with all API routes.
 */

import { Router } from 'express';
import locationRoutes from './locations';
import alertRoutes from './alerts';
import notificationRoutes from './notifications';

const router = Router();

/**
 * API Routes
 * TODO: Mount all route modules under their respective paths
 */

// TODO: Mount location routes
router.use('/locations', locationRoutes);

// TODO: Mount alert routes
router.use('/alerts', alertRoutes);

// TODO: Mount notification routes
router.use('/notifications', notificationRoutes);

/**
 * Health check endpoint
 * GET /api/health
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Weather Alert System API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * API information endpoint
 * GET /api/info
 */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Weather Alert System API',
      version: '1.0.0',
      description: 'Node.js + TypeScript + SQLite backend for weather alerts',
      endpoints: {
        locations: [
          'POST /api/locations - Create location',
          'GET /api/locations - Get user locations',
          'GET /api/locations/with-alerts - Get locations with alert counts',
          'GET /api/locations/:id - Get location by ID',
          'PUT /api/locations/:id - Update location',
          'DELETE /api/locations/:id - Delete location'
        ],
        alerts: [
          'POST /api/alerts - Create alert',
          'GET /api/alerts - Get user alerts',
          'GET /api/alerts/check - Manual alert checking',
          'GET /api/alerts/statistics - Get alert statistics',
          'GET /api/alerts/:id - Get alert by ID',
          'PUT /api/alerts/:id - Update alert',
          'PUT /api/alerts/:id/toggle - Toggle alert status',
          'GET /api/alerts/:id/test - Test alert',
          'DELETE /api/alerts/:id - Delete alert'
        ],
        notifications: [
          'GET /api/notifications - Get user notifications',
          'GET /api/notifications/recent - Get recent notifications',
          'GET /api/notifications/unread-count - Get unread count',
          'GET /api/notifications/statistics - Get notification statistics',
          'PUT /api/notifications/read-all - Mark all as read',
          'DELETE /api/notifications/cleanup - Cleanup old notifications',
          'GET /api/notifications/:id - Get notification by ID',
          'PUT /api/notifications/:id/read - Mark as read'
        ]
      },
      authentication: 'Provide user_id in query parameters or x-user-id header'
    },
    message: 'API documentation and endpoint information'
  });
});

export default router;
