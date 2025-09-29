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
   */
  public async query<T = any>(sql: string, params: any[] = []): Promise<QueryResult<T>> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      this.db.all(sql, params, (err: Error | null, rows: T[]) => {
        if (err) {
          console.error('Query error:', err.message);
          reject(err);
        } else {
          resolve({
            rows: rows || [],
            rowCount: rows ? rows.length : 0
          });
        }
      });
    });
  }

  /**
   * Execute a SQL command that modifies data (INSERT, UPDATE, DELETE)
   */
  public async run(sql: string, params: any[] = []): Promise<QueryResult> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      this.db.run(sql, params, function(this: sqlite3.RunResult, err: Error | null) {
        if (err) {
          console.error('Run error:', err.message);
          reject(err);
        } else {
          resolve({
            rows: [],
            rowCount: this.changes || 0,
            lastInsertId: this.lastID
          });
        }
      });
    });
  }

  /**
   * Execute multiple SQL statements in a transaction
   */
  public async transaction(queries: Array<{ sql: string; params?: any[] }>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not connected'));
        return;
      }

      this.db.serialize(() => {
        this.db!.run('BEGIN TRANSACTION', (err) => {
          if (err) {
            reject(err);
            return;
          }

          let completed = 0;
          let hasError = false;

          const rollback = (error: Error) => {
            if (hasError) return; // Prevent multiple rollbacks
            hasError = true;
            this.db!.run('ROLLBACK', () => {
              reject(error);
            });
          };

          const checkCompletion = () => {
            if (hasError) return;
            completed++;
            if (completed === queries.length) {
              this.db!.run('COMMIT', (commitErr) => {
                if (commitErr) {
                  rollback(commitErr);
                } else {
                  resolve();
                }
              });
            }
          };

          if (queries.length === 0) {
            this.db!.run('COMMIT', (commitErr) => {
              if (commitErr) {
                reject(commitErr);
              } else {
                resolve();
              }
            });
            return;
          }

          for (const query of queries) {
            this.db!.run(query.sql, query.params || [], (err) => {
              if (err) {
                rollback(err);
              } else {
                checkCompletion();
              }
            });
          }
        });
      });
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
