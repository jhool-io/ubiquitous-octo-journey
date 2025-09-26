/**
 * TypeScript Type Definitions for Weather Alert System
 *
 * This file contains all the interfaces and types used throughout the application.
 * Candidates should review these types and use them consistently in their implementation.
 */

// =====================================================
// User Types
// =====================================================

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

// =====================================================
// Location Types
// =====================================================

export interface Location {
  id: string;
  user_id: string;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  state?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateLocationRequest {
  user_id: string;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  state?: string;
}

export interface LocationWithWeather extends Location {
  current_weather?: WeatherData;
}

// =====================================================
// Weather Alert Types
// =====================================================

export interface WeatherAlert {
  id: string;
  user_id: string;
  location_id: string;
  condition_type: AlertConditionType;
  condition_value: number;
  operator: AlertOperator;
  message: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAlertRequest {
  user_id: string;
  location_id: string;
  condition_type: AlertConditionType;
  condition_value: number;
  operator: AlertOperator;
  message: string;
}

export type AlertConditionType =
  | 'temperature'
  | 'humidity'
  | 'wind_speed'
  | 'pressure'
  | 'visibility';

export type AlertOperator =
  | 'greater_than'
  | 'less_than'
  | 'equals'
  | 'greater_or_equal'
  | 'less_or_equal';

export interface AlertWithLocation extends WeatherAlert {
  location: Location;
}

// =====================================================
// Notification Types
// =====================================================

export interface Notification {
  id: string;
  user_id: string;
  alert_id: string;
  message: string;
  weather_data: WeatherData;
  triggered_at: string;
  is_read: boolean;
  created_at: string;
}

export interface CreateNotificationRequest {
  user_id: string;
  alert_id: string;
  message: string;
  weather_data: WeatherData;
}

export interface NotificationWithAlert extends Notification {
  alert: WeatherAlert;
  location: Location;
}

// =====================================================
// Weather Data Types (OpenWeatherMap API)
// =====================================================

export interface WeatherData {
  temperature: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  visibility: number;
  wind_speed: number;
  wind_direction: number;
  weather_condition: string;
  weather_description: string;
  weather_icon: string;
  timestamp: string;
}

export interface OpenWeatherMapResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// =====================================================
// API Response Types
// =====================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// =====================================================
// Database Types
// =====================================================

export interface DatabaseConfig {
  filename: string;
  mode?: number;
}

export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  lastInsertId?: number;
}

// =====================================================
// Service Types
// =====================================================

export interface WeatherServiceConfig {
  apiKey: string;
  baseUrl: string;
  timeout: number;
}

export interface AlertCheckResult {
  alert: WeatherAlert;
  location: Location;
  currentWeather: WeatherData;
  conditionMet: boolean;
  notificationSent: boolean;
}

// =====================================================
// Express Request Extensions
// =====================================================

export interface RequestWithUser extends Request {
  user?: User;
  userId?: string;
}

// =====================================================
// Validation Types
// =====================================================

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
