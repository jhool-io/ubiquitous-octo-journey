# Weather Alert System - Node.js Backend Assessment

![Weather Alert System](https://img.shields.io/badge/Assessment-Node.js%20%2B%20TypeScript%20%2B%20SQLite-blue)

**Technology Stack:** Node.js + TypeScript + Express.js + SQLite + OpenWeatherMap API

**Goal:** Build a comprehensive Weather Alert System where users can create location-based weather alerts and receive notifications when conditions are met.

## 🚀 Complete the Implementation

Follow the TODO comments throughout the codebase to implement the required functionality. Each file contains detailed TODO markers indicating exactly what needs to be implemented.

## 📁 Project Structure

```
WeatherAlert_NodeTS/
├── src/
│   ├── controllers/          # HTTP request handlers
│   │   ├── AlertController.ts
│   │   ├── LocationController.ts
│   │   └── NotificationController.ts
│   ├── database/            # Database setup and migrations
│   │   ├── connection.ts
│   │   ├── migrate.ts
│   │   └── schema.sql
│   ├── middleware/          # Express middleware
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── models/             # Database models
│   │   ├── Location.ts
│   │   ├── Notification.ts
│   │   ├── User.ts
│   │   └── WeatherAlert.ts
│   ├── routes/             # API route definitions
│   │   ├── alerts.ts
│   │   ├── index.ts
│   │   ├── locations.ts
│   │   └── notifications.ts
│   ├── services/           # Business logic services
│   │   ├── AlertService.ts
│   │   └── WeatherService.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── index.ts            # Main server file
├── keys.txt                # OpenWeatherMap API key
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🔧 Technical Requirements

### Core Technologies
- **Runtime:** Node.js 16+ with TypeScript
- **Framework:** Express.js for REST API
- **Database:** SQLite with proper relational schema
- **External API:** OpenWeatherMap Current Weather API
- **Authentication:** Simple user identification (no complex auth required)

### Database Schema
The system uses SQLite with the following tables:
- `users` - User information
- `locations` - User's tracked locations with coordinates
- `weather_alerts` - Alert rules with conditions
- `notifications` - Generated alert notifications

### API Integration
- **OpenWeatherMap API:** [Current Weather Data](https://openweathermap.org/current)
- **API Documentation:** [OpenWeather API Guide](https://openweathermap.org/api)

## 🧪 Testing Your Implementation

### 1. Setup
```bash
# Install dependencies
npm install

# Set up your OpenWeatherMap API key
# Edit keys.txt and add your API key
echo "your_api_key_here" > keys.txt

# Set up the database
npm run migrate
```

### 2. Development
```bash
# Start development server with auto-reload
npm run dev

# Or build and run
npm run build
npm start
```

### 3. API Testing

**Health Check:**
```bash
curl http://localhost:7843/api/health
```

**Create Location:**
```bash
curl -X POST http://localhost:7843/api/locations?user_id=user-001 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "London",
    "latitude": 51.5074,
    "longitude": -0.1278,
    "country": "GB"
  }'
```

**Create Alert:**
```bash
curl -X POST http://localhost:7843/api/alerts?user_id=user-001 \
  -H "Content-Type: application/json" \
  -d '{
    "location_id": "loc-001",
    "condition_type": "temperature",
    "condition_value": 20,
    "operator": "greater_than",
    "message": "Temperature alert for London"
  }'
```

**Check Alerts:**
```bash
curl http://localhost:7843/api/alerts/check?user_id=user-001
```

## 🎯 Implementation Guidelines

### TODO Completion Strategy

1. **Start with Database Connection** (`src/database/connection.ts`)
   - Implement SQLite connection methods
   - Test with migration script

2. **Implement Models** (`src/models/`)
   - Complete CRUD operations for each model
   - Test database operations

3. **Weather Service Integration** (`src/services/WeatherService.ts`)
   - Implement OpenWeatherMap API calls
   - Handle API responses and errors

4. **Alert Logic** (`src/services/AlertService.ts`)
   - Implement condition evaluation
   - Create notification system

5. **Controllers and Routes**
   - Complete HTTP request handlers
   - Test API endpoints

### Testing Data

The database migration includes sample data:
- **User:** `user-001` (Test User, test@example.com)
- **Locations:** London, New York, Tokyo
- **Sample Alerts:** Pre-configured for testing

## 🔑 Environment Variables

Create a `.env` file or use the provided `keys.txt`:

```env
OPENWEATHER_API_KEY=your_api_key_here
PORT=7843
NODE_ENV=development
```

## 📚 Resources

- **OpenWeatherMap API:** [https://openweathermap.org/api](https://openweathermap.org/api)
- **Express.js Documentation:** [https://expressjs.com/](https://expressjs.com/)
- **TypeScript Handbook:** [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **SQLite Documentation:** [https://www.sqlite.org/docs.html](https://www.sqlite.org/docs.html)
