/**
 * Notification Routes
 *
 * Defines all routes for notification endpoints.
 * TODO: Set up all notification routes with proper middleware.
 */

import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { validateUserId, validatePagination } from '../middleware/validation';

const router = Router();

// TODO: Apply user validation middleware to all routes
router.use(validateUserId);

/**
 * Notification Routes
 */

// TODO: Get all user notifications (with pagination)
// GET /api/notifications
router.get('/',
  validatePagination,
  NotificationController.getUserNotifications
);

// TODO: Get recent notifications
// GET /api/notifications/recent
router.get('/recent',
  NotificationController.getRecentNotifications
);

// TODO: Get unread notification count
// GET /api/notifications/unread-count
router.get('/unread-count',
  NotificationController.getUnreadCount
);

// TODO: Get notification statistics
// GET /api/notifications/statistics
router.get('/statistics',
  NotificationController.getNotificationStatistics
);

// TODO: Mark all notifications as read
// PUT /api/notifications/read-all
router.put('/read-all',
  NotificationController.markAllAsRead
);

// TODO: Cleanup old notifications (admin function)
// DELETE /api/notifications/cleanup
router.delete('/cleanup',
  NotificationController.cleanupOldNotifications
);

// TODO: Get specific notification by ID
// GET /api/notifications/:id
router.get('/:id',
  NotificationController.getNotificationById
);

// TODO: Mark notification as read
// PUT /api/notifications/:id/read
router.put('/:id/read',
  NotificationController.markAsRead
);

export default router;
