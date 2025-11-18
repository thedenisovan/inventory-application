import { pool } from './pool.ts';
import type { QueryResultRow } from 'pg';

export async function getFullTable(tableName: string): Promise<QueryResultRow> {
  const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
  return { rows };
}

export async function getRelationshipTable() {
  const { rows } = await pool.query(`
    SELECT name, business_name, role, entrepreneur.id
    FROM entrepreneur
    INNER JOIN business
    ON entrepreneur.id = business.entrepreneur_id
    INNER JOIN role
    ON role.business_id = business.id;
  `);

  return { rows };
}

export async function getSingleTableRow(entrepreneurId: string) {
  const { rows } = await pool.query(
    `
      SELECT name, business_name, role, nationality, date_of_birth, net_worth
      FROM entrepreneur
      INNER JOIN business
      ON entrepreneur.id = business.entrepreneur_id
      INNER JOIN role
      ON role.business_id = business.id
      WHERE entrepreneur.id = $1
    `,
    [entrepreneurId]
  );

  return { rows };
}
