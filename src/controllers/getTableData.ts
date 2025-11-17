import type { Request, Response } from 'express';
import { getFullTable } from '../db/query.ts';

// Return table based on current users url
export const getTableData = async (req: Request, res: Response) => {
  let { table } = req.params;

  const tableViews = {
    entrepreneur: 'entrepreneur',
    business: 'business',
    role: 'role',
  };

  if (table !== 'entrepreneur' && table !== 'business' && table !== 'role') {
    res.render('404');
    throw new Error('You came to unavailable url');
  }

  try {
    const { rows } = await getFullTable(tableViews[table]);
    res.render(tableViews[table], { rows });
  } catch (err) {
    res.render('404');
    throw new Error(`You stumbled in to error: ${err}`);
  }
};
