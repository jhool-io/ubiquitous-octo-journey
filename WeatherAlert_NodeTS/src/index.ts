/**
 * Weather Alert System - Main Server
 *
 * Express.js server with TypeScript for Weather Alert System.
 * TODO: Set up complete Express server with middleware, routes, and database connection.
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { database } from './database/connection';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

/**
 * Initialize Express application
 */
const app: Application = express();

/**
 * Configuration
 * TODO: Load configuration from environment variables
 */
const PORT = process.env.PORT || 7843;
const NODE_ENV = process.env.NODE_ENV || 'development';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';

/**
 * Security Middleware
 * TODO: Configure security middleware
 */

// TODO: Set security headers
app.use(helmet({
  crossOriginEmbedderPolicy: false, // Allow embedding for development
  contentSecurityPolicy: false // Disable CSP for API
}));

// TODO: Enable CORS
app.use(cors({
  origin: NODE_ENV === 'development' ? '*' : ['http://localhost:7843'], // TODO: Configure for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id']
}));

// TODO: Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'development' ? 1000 : 100, // More requests in development
  message: {
    success: false,
    error: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

/**
 * Body Parsing Middleware
 * TODO: Configure body parsing
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * Request Logging Middleware (Development)
 * TODO: Add request logging for development
 */
if (NODE_ENV === 'development') {
  app.use((req: Request, res: Response, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
  });
}

/**
 * API Routes
 * TODO: Mount API routes
 */
app.use('/api', apiRoutes);

/**
 * Root endpoint
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Weather Alert System API',
    version: '1.0.0',
    documentation: '/api/info',
    health: '/api/health',
    timestamp: new Date().toISOString()
  });
});

/**
 * Error Handling Middleware
 * TODO: Add error handling middleware (must be last)
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Database Connection and Server Startup
 * TODO: Implement server startup with database connection
 */
async function startServer(): Promise<void> {
  try {
    console.log('🚀 Starting Weather Alert System...');

    // TODO: Check if API key is configured
    if (!OPENWEATHER_API_KEY) {
      console.warn('⚠️  Warning: OPENWEATHER_API_KEY not configured. Weather functionality will not work.');
      console.log('   Please add your OpenWeatherMap API key to the keys.txt file or environment variables.');
    }

    // Connect to database
    console.log('📡 Connecting to database...');
    await database.connect();
    console.log('✅ Database connected successfully');

    // TODO: Start HTTP server
    const server = app.listen(PORT, () => {
      console.log('🎯 Server Configuration:');
      console.log(`   Environment: ${NODE_ENV}`);
      console.log(`   Port: ${PORT}`);
      console.log(`   API Base URL: http://localhost:${PORT}/api`);
      console.log(`   Health Check: http://localhost:${PORT}/api/health`);
      console.log(`   API Info: http://localhost:${PORT}/api/info`);
      console.log('');
      console.log('📋 Available Endpoints:');
      console.log('   Locations: /api/locations');
      console.log('   Alerts: /api/alerts');
      console.log('   Notifications: /api/notifications');
      console.log('');
      console.log('🔑 Authentication: Include user_id in query params or x-user-id header');
      console.log('');
      console.log('✅ Weather Alert System is running!');
    });

    // Graceful shutdown handling
    process.on('SIGTERM', async () => {
      console.log('📴 SIGTERM received. Shutting down gracefully...');
      server.close(async () => {
        console.log('🔌 HTTP server closed');
        await database.close();
        console.log('💾 Database connection closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      console.log('📴 SIGINT received. Shutting down gracefully...');
      server.close(async () => {
        console.log('🔌 HTTP server closed');
        await database.close();
        console.log('💾 Database connection closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

/**
 * Start the server
 */
if (require.main === module) {
  startServer();
}

export default app;
