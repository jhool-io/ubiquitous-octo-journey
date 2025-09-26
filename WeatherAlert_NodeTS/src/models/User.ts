/**
 * User Model
 *
 * This model handles all user-related database operations.
 * TODO: Implement all the user CRUD operations using the database connection.
 */

import { v4 as uuidv4 } from 'uuid';
import { database } from '../database/connection';
import { User, CreateUserRequest, QueryResult } from '../types';

export class UserModel {

  /**
   * Create a new user
   * TODO: Implement user creation with validation and database insertion
   */
  static async create(userData: CreateUserRequest): Promise<User> {
    try {
      // TODO: Generate unique ID for the user
      const userId = ''; // TODO: Use uuidv4() to generate unique ID

      // TODO: Validate user data
      if (!userData.name || !userData.email) {
        throw new Error('Name and email are required');
      }

      // TODO: Check if user with this email already exists
      // const existingUser = await this.findByEmail(userData.email);
      // if (existingUser) {
      //   throw new Error('User with this email already exists');
      // }

      // TODO: Insert user into database
      const sql = ''; // TODO: Write INSERT SQL statement
      const params = []; // TODO: Add parameters for the SQL statement

      // await database.run(sql, params);

      // TODO: Return the created user
      // return await this.findById(userId);

      // TODO: Remove this placeholder and implement actual user creation
      throw new Error('TODO: Implement user creation');

    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  /**
   * Find user by ID
   * TODO: Implement user lookup by ID
   */
  static async findById(id: string): Promise<User | null> {
    try {
      // TODO: Query database for user by ID
      const sql = ''; // TODO: Write SELECT SQL statement
      const params = []; // TODO: Add parameters

      // const result: QueryResult<User> = await database.query(sql, params);

      // TODO: Return user if found, null otherwise
      // return result.rows.length > 0 ? result.rows[0] : null;

      // TODO: Remove this placeholder and implement actual user lookup
      throw new Error('TODO: Implement findById method');

    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  /**
   * Find user by email
   * TODO: Implement user lookup by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    try {
      // TODO: Query database for user by email
      const sql = ''; // TODO: Write SELECT SQL statement with email filter
      const params = []; // TODO: Add email parameter

      // const result: QueryResult<User> = await database.query(sql, params);

      // TODO: Return user if found, null otherwise
      // return result.rows.length > 0 ? result.rows[0] : null;

      // TODO: Remove this placeholder and implement actual email lookup
      throw new Error('TODO: Implement findByEmail method');

    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  /**
   * Get all users (for admin/testing purposes)
   * TODO: Implement method to retrieve all users
   */
  static async findAll(): Promise<User[]> {
    try {
      // TODO: Query database for all users
      const sql = ''; // TODO: Write SELECT statement to get all users

      // const result: QueryResult<User> = await database.query(sql);

      // TODO: Return array of users
      // return result.rows;

      // TODO: Remove this placeholder and implement actual findAll
      throw new Error('TODO: Implement findAll method');

    } catch (error) {
      console.error('Error finding all users:', error);
      throw error;
    }
  }

  /**
   * Update user information
   * TODO: Implement user update functionality
   */
  static async update(id: string, userData: Partial<CreateUserRequest>): Promise<User | null> {
    try {
      // TODO: Validate that user exists
      // const existingUser = await this.findById(id);
      // if (!existingUser) {
      //   throw new Error('User not found');
      // }

      // TODO: Build dynamic update query based on provided fields
      const updateFields = [];
      const params = [];

      // TODO: Add fields to update if they are provided
      // if (userData.name) {
      //   updateFields.push('name = ?');
      //   params.push(userData.name);
      // }
      // if (userData.email) {
      //   updateFields.push('email = ?');
      //   params.push(userData.email);
      // }

      // TODO: Add updated_at timestamp
      // updateFields.push('updated_at = datetime("now")');
      // params.push(id);

      // TODO: Execute update query
      // const sql = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
      // await database.run(sql, params);

      // TODO: Return updated user
      // return await this.findById(id);

      // TODO: Remove this placeholder and implement actual update
      throw new Error('TODO: Implement update method');

    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  /**
   * Delete user by ID
   * TODO: Implement user deletion (cascade delete will handle related data)
   */
  static async delete(id: string): Promise<boolean> {
    try {
      // TODO: Check if user exists
      // const user = await this.findById(id);
      // if (!user) {
      //   return false;
      // }

      // TODO: Delete user from database
      const sql = ''; // TODO: Write DELETE SQL statement
      const params = []; // TODO: Add ID parameter

      // const result = await database.run(sql, params);

      // TODO: Return true if deletion was successful
      // return result.rowCount > 0;

      // TODO: Remove this placeholder and implement actual deletion
      throw new Error('TODO: Implement delete method');

    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  /**
   * Validate user data
   * TODO: Implement comprehensive user data validation
   */
  static validateUserData(userData: CreateUserRequest): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // TODO: Validate name
    if (!userData.name || userData.name.trim().length === 0) {
      errors.push('Name is required');
    } else if (userData.name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // TODO: Validate email
    if (!userData.email || userData.email.trim().length === 0) {
      errors.push('Email is required');
    } else {
      // TODO: Add email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        errors.push('Invalid email format');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
