import { deleteFromTable } from '../db/query.ts';
import type { Request, Response } from 'express';

export async function postDeleteFromTable(req: Request, res: Response) {
  const { id } = req.params;
  const { pass } = req.body;

  if (typeof id === 'string') {
    try {
      await deleteFromTable(id, pass);
      res.redirect('/view/entrepreneur');
    } catch {
      res.redirect('404');
      res.status(400);
    }
  }
}
