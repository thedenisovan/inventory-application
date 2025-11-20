import { deleteFromTable } from '../db/query.ts';
import type { Request, Response } from 'express';

export async function postDeleteFromTable(req: Request, res: Response) {
  const { id } = req.params;
  const { pass } = req.body;

  if (typeof id === 'string') {
    try {
      const result = await deleteFromTable(id, pass);
      if (result)
        res.redirect('/view/entrepreneur'); // If pass is correct only then redirect to new page
      else {
        return res.redirect(`/view/id/${id}`); // If pass in correct stay on same page
      }
    } catch {
      res.redirect('404');
      res.status(400);
    }
  }
}
