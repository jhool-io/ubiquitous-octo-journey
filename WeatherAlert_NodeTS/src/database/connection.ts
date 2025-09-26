/**
 * Database Connection Module
 *
 * This module handles SQLite database connection and provides a singleton instance.
 * TODO: Implement the database connection and basic query methods.
 */

import sqlite3 from 'sqlite3';
import path from 'path';
import { DatabaseConfig, QueryResult } from '../types';

// TODO: Enable verbose mode for debugging during development
sqlite3.verbose();

class DatabaseConnection {
  private db: sqlite3.Database | null = null;
  private static instance: DatabaseConnection;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  /**
   * Initialize database connection
   */
  public async connect(config?: DatabaseConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set default database path if not provided
      const dbPath = config?.filename || path.join(process.cwd(), 'weather_alerts.db');

      // Create SQLite database connection
      this.db = new sqlite3.Database(dbPath, config?.mode || sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          console.error('Database connection error:', err.message);
          reject(err);
        } else {
          console.log('Connected to SQLite database:', dbPath);
          resolve();
        }
      });
    });
  }

  /**
   * Execute a SQL query that returns data (SELECT)
   * TODO: Implement this method to handle SELECT queries
   */
  public async query<T = any>(sql: string, params: any[] = []): Promise<QueryResult<T>> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      // TODO: Implement SELECT query execution
      // this.db.all(sql, params, (err: Error | null, rows: T[]) => {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve({
      //       rows,
      //       rowCount: rows.length
      //     });
      //   }
      // });

      // TODO: Remove this placeholder and implement actual query
      throw new Error('TODO: Implement query method');
    });
  }

  /**
   * Execute a SQL command that modifies data (INSERT, UPDATE, DELETE)
   * TODO: Implement this method to handle data modification queries
   */
  public async run(sql: string, params: any[] = []): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      // TODO: Implement INSERT/UPDATE/DELETE query execution
      // this.db.run(sql, params, function(err: Error | null) {
      //   if (err) {
      //     reject(err);
      //   } else {
      //     resolve({
      //       rows: [],
      //       rowCount: this.changes,
      //       lastInsertId: this.lastID
      //     });
      //   }
      // });

      // TODO: Remove this placeholder and implement actual run method
      throw new Error('TODO: Implement run method');
    });
  }

  /**
   * Execute multiple SQL statements in a transaction
   * TODO: Implement transaction support
   */
  public async transaction(queries: Array<{ sql: string; params?: any[] }>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      // TODO: Implement transaction logic
      // this.db.serialize(() => {
      //   this.db!.run('BEGIN TRANSACTION');
      //
      //   try {
      //     for (const query of queries) {
      //       this.db!.run(query.sql, query.params || []);
      //     }
      //     this.db!.run('COMMIT', (err) => {
      //       if (err) {
      //         reject(err);
      //       } else {
      //         resolve();
      //       }
      //     });
      //   } catch (error) {
      //     this.db!.run('ROLLBACK');
      //     reject(error);
      //   }
      // });

      // TODO: Remove this placeholder and implement actual transaction
      throw new Error('TODO: Implement transaction method');
    });
  }

  /**
   * Close database connection
   */
  public async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve();
        return;
      }

      // Close database connection properly
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Database connection closed');
          this.db = null;
          resolve();
        }
      });
    });
  }

  /**
   * Get database instance (for advanced operations)
   */
  public getDatabase(): sqlite3.Database | null {
    return this.db;
  }
}

// Export singleton instance
export const database = DatabaseConnection.getInstance();
