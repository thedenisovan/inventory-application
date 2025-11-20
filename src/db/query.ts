import { pool } from './pool.ts';
import type { QueryResultRow } from 'pg';
import 'dotenv/config';

export interface PostData {
  firstName: string;
  lastName: string;
  country: string;
  dateOfBirth: string;
  netWorth: string;
  roleInCOmpany: string;
  businessName: string;
  industry: string;
  foundationYear: string;
  startingCapital: string;
  hqLocation: string;
}

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
      SELECT DISTINCT name, business_name, role, nationality, date_of_birth, net_worth
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

async function postInToEntrepreneur(body: PostData, newIdx: number) {
  const name = body.firstName + ' ' + body.lastName;

  await pool.query(
    `
      INSERT INTO entrepreneur (name, net_worth,  nationality, date_of_birth, main_business_id)
      VALUES ($1, $2, $3, $4, $5)
    `,
    [
      name,
      Number(body.netWorth),
      body.country,
      body.dateOfBirth,
      Number(newIdx),
    ]
  );
}

async function postInToBusiness(body: PostData, newIdx: number) {
  await pool.query(
    `
      INSERT INTO business (business_name, foundation_year, industry, starting_capital, headquarters, entrepreneur_id)
      VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [
      body.businessName,
      Number(body.foundationYear),
      body.industry,
      Number(body.startingCapital),
      body.hqLocation,
      newIdx,
    ]
  );
}

export async function postRelationTable(body: PostData) {
  const entrepreneurIdx = await getNewId('entrepeneur_id_seq');
  const businessIdx = await getNewId('buisness_id_seq');

  await postInToEntrepreneur(body, businessIdx);
  await postInToBusiness(body, entrepreneurIdx);

  await pool.query(
    `
      INSERT INTO role (role, entrepreneur_id, business_id)
      VALUES ($1, $2, $3)
    `,
    [body.roleInCOmpany, entrepreneurIdx, businessIdx]
  );
}

// Gets id of new business and entrepreneur to insert them in relationship table
async function getNewId(table: string): Promise<number> {
  const { rows } = await pool.query(`SELECT * FROM ${table}`);

  return Number(rows[0].last_value) + 1;
}

export async function deleteFromTable(entrepreneurId: string, pass: string) {
  const id = Number(entrepreneurId);

  if (pass === process.env.PASSWORD) {
    await pool.query(
      `
      DELETE FROM entrepreneur
      WHERE id = $1
    `,
      [id]
    );

    await pool.query(
      `
      DELETE FROM business
      WHERE entrepreneur_id = $1
    `,
      [entrepreneurId]
    );

    await pool.query(
      `
      DELETE FROM role
      WHERE entrepreneur_id = $1
    `,
      [entrepreneurId]
    );
  }
}
