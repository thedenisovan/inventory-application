import { postRelationTable } from '../db/query.ts';
import type { Request, Response } from 'express';

export const postNewData = async (req: Request, res: Response) => {
  const { body } = req.body;

  console.log(body);
  console.log(req.body);

  postRelationTable(req.body);
  res.redirect('/');
};
