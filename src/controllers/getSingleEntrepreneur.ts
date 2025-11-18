import type { Request, Response } from 'express';
import * as db from '../db/query.ts';

export const getSingleEntrepreneur = async (req: Request, res: Response) => {
  let { id } = req.params;

  if (typeof id !== 'string') return;
  const { rows } = await db.getSingleTableRow(id);

  res.render('person', { rows });
};
