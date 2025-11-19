import { deleteFromTable } from '../db/query.ts';
import type { Request, Response } from 'express';

export async function postDeleteFromTable(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id === 'string') {
    deleteFromTable(id);
    res.redirect('/view/entrepreneur');
  }
}
