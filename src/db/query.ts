import { pool } from './pool.js';
import type { QueryResultRow } from 'pg';

export async function getFullTable(tableName: string): Promise<QueryResultRow> {
  const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
  return rows;
}
