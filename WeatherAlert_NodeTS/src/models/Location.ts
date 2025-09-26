/**
 * Location Model
 *
 * This model handles all location-related database operations.
 * TODO: Implement all the location CRUD operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { database } from '../database/connection';
import { Location, CreateLocationRequest, LocationWithWeather, QueryResult } from '../types';

export class LocationModel {

  /**
   * Create a new location for a user
   * TODO: Implement location creation with validation
   */
  static async create(locationData: CreateLocationRequest): Promise<Location> {
    try {
      // TODO: Generate unique ID for the location
      const locationId = ''; // TODO: Use uuidv4() to generate unique ID

      // TODO: Validate location data
      const validation = this.validateLocationData(locationData);
      if (!validation.isValid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }

      // TODO: Insert location into database
      const sql = ''; // TODO: Write INSERT SQL statement
      const params = []; // TODO: Add all required parameters

      // await database.run(sql, params);

      // TODO: Return the created location
      // return await this.findById(locationId);

      // TODO: Remove this placeholder and implement actual location creation
      throw new Error('TODO: Implement location creation');

    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  }

  /**
   * Find location by ID
   * TODO: Implement location lookup by ID
   */
  static async findById(id: string): Promise<Location | null> {
    try {
      // TODO: Query database for location by ID
      const sql = ''; // TODO: Write SELECT SQL statement
      const params = []; // TODO: Add ID parameter

      // const result: QueryResult<Location> = await database.query(sql, params);

      // TODO: Return location if found, null otherwise
      // return result.rows.length > 0 ? result.rows[0] : null;

      // TODO: Remove this placeholder and implement actual location lookup
      throw new Error('TODO: Implement findById method');

    } catch (error) {
      console.error('Error finding location by ID:', error);
      throw error;
    }
  }

  /**
   * Find all locations for a specific user
   * TODO: Implement method to get user's locations
   */
  static async findByUserId(userId: string): Promise<Location[]> {
    try {
      // TODO: Query database for user's locations
      const sql = ''; // TODO: Write SELECT SQL statement with user_id filter
      const params = []; // TODO: Add userId parameter

      // const result: QueryResult<Location> = await database.query(sql, params);

      // TODO: Return array of locations
      // return result.rows;

      // TODO: Remove this placeholder and implement actual user locations lookup
      throw new Error('TODO: Implement findByUserId method');

    } catch (error) {
      console.error('Error finding locations by user ID:', error);
      throw error;
    }
  }

  /**
   * Find locations by coordinates (for duplicate checking)
   * TODO: Implement method to find locations near specific coordinates
   */
  static async findByCoordinates(latitude: number, longitude: number, tolerance: number = 0.001): Promise<Location[]> {
    try {
      // TODO: Query database for locations within tolerance range
      // Note: For more precise geolocation, consider using geospatial functions
      const sql = `
        SELECT * FROM locations
        WHERE latitude BETWEEN ? AND ?
        AND longitude BETWEEN ? AND ?
      `;

      const params = [
        latitude - tolerance,
        latitude + tolerance,
        longitude - tolerance,
        longitude + tolerance
      ];

      // const result: QueryResult<Location> = await database.query(sql, params);
      // return result.rows;

      // TODO: Remove this placeholder and implement actual coordinates lookup
      throw new Error('TODO: Implement findByCoordinates method');

    } catch (error) {
      console.error('Error finding locations by coordinates:', error);
      throw error;
    }
  }

  /**
   * Update location information
   * TODO: Implement location update functionality
   */
  static async update(id: string, locationData: Partial<CreateLocationRequest>): Promise<Location | null> {
    try {
      // TODO: Validate that location exists
      // const existingLocation = await this.findById(id);
      // if (!existingLocation) {
      //   throw new Error('Location not found');
      // }

      // TODO: Build dynamic update query based on provided fields
      const updateFields = [];
      const params = [];

      // TODO: Add fields to update if they are provided
      // if (locationData.name) {
      //   updateFields.push('name = ?');
      //   params.push(locationData.name);
      // }
      // if (locationData.latitude !== undefined) {
      //   updateFields.push('latitude = ?');
      //   params.push(locationData.latitude);
      // }
      // if (locationData.longitude !== undefined) {
      //   updateFields.push('longitude = ?');
      //   params.push(locationData.longitude);
      // }
      // if (locationData.country) {
      //   updateFields.push('country = ?');
      //   params.push(locationData.country);
      // }
      // if (locationData.state) {
      //   updateFields.push('state = ?');
      //   params.push(locationData.state);
      // }

      // TODO: Add updated_at timestamp and location ID
      // updateFields.push('updated_at = datetime("now")');
      // params.push(id);

      // TODO: Execute update query
      // const sql = `UPDATE locations SET ${updateFields.join(', ')} WHERE id = ?`;
      // await database.run(sql, params);

      // TODO: Return updated location
      // return await this.findById(id);

      // TODO: Remove this placeholder and implement actual update
      throw new Error('TODO: Implement update method');

    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }

  /**
   * Delete location by ID
   * TODO: Implement location deletion (cascade delete will handle related alerts)
   */
  static async delete(id: string): Promise<boolean> {
    try {
      // TODO: Check if location exists
      // const location = await this.findById(id);
      // if (!location) {
      //   return false;
      // }

      // TODO: Delete location from database
      const sql = ''; // TODO: Write DELETE SQL statement
      const params = []; // TODO: Add ID parameter

      // const result = await database.run(sql, params);

      // TODO: Return true if deletion was successful
      // return result.rowCount > 0;

      // TODO: Remove this placeholder and implement actual deletion
      throw new Error('TODO: Implement delete method');

    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
  }

  /**
   * Get locations with weather alerts count
   * TODO: Implement method to get locations with alert statistics
   */
  static async findWithAlertCounts(userId: string): Promise<Array<Location & { alert_count: number }>> {
    try {
      // TODO: Join locations with weather_alerts to get counts
      const sql = `
        SELECT l.*, COUNT(wa.id) as alert_count
        FROM locations l
        LEFT JOIN weather_alerts wa ON l.id = wa.location_id AND wa.is_active = 1
        WHERE l.user_id = ?
        GROUP BY l.id
        ORDER BY l.name
      `;

      // const result = await database.query(sql, [userId]);
      // return result.rows;

      // TODO: Remove this placeholder and implement actual query
      throw new Error('TODO: Implement findWithAlertCounts method');

    } catch (error) {
      console.error('Error finding locations with alert counts:', error);
      throw error;
    }
  }

  /**
   * Validate location data
   * TODO: Implement comprehensive location data validation
   */
  static validateLocationData(locationData: CreateLocationRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // TODO: Validate required fields
    if (!locationData.user_id || locationData.user_id.trim().length === 0) {
      errors.push('User ID is required');
    }

    if (!locationData.name || locationData.name.trim().length === 0) {
      errors.push('Location name is required');
    } else if (locationData.name.length < 2) {
      errors.push('Location name must be at least 2 characters long');
    }

    // TODO: Validate coordinates
    if (locationData.latitude === undefined || locationData.latitude === null) {
      errors.push('Latitude is required');
    } else if (locationData.latitude < -90 || locationData.latitude > 90) {
      errors.push('Latitude must be between -90 and 90 degrees');
    }

    if (locationData.longitude === undefined || locationData.longitude === null) {
      errors.push('Longitude is required');
    } else if (locationData.longitude < -180 || locationData.longitude > 180) {
      errors.push('Longitude must be between -180 and 180 degrees');
    }

    // TODO: Validate optional fields
    if (locationData.country && locationData.country.length < 2) {
      errors.push('Country must be at least 2 characters long');
    }

    if (locationData.state && locationData.state.length < 2) {
      errors.push('State must be at least 2 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
