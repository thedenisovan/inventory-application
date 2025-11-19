import type { Request, Response } from 'express';
import * as db from '../db/query.ts';

export const getSingleEntrepreneur = async (req: Request, res: Response) => {
  let { id } = req.params;

  if (typeof id !== 'string') {
    res.render('404');
    res.status(404);
    throw new Error('Un known url reached');
  }
  try {
    const { rows } = await db.getSingleTableRow(id);
    res.render('person', { rows, id });
  } catch (err) {
    res.render('404');
    res.status(404);
    throw new Error(`You stumbled in to error: ${err}`);
  }
};
