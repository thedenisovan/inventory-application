import type { Request, Response } from 'express';
import * as db from '../db/query.ts';

// Return table based on current users url
export const getTableData = async (req: Request, res: Response) => {
  let { table } = req.params;

  // Url path corresponding to each table
  const tableViews = {
    entrepreneur: 'entrepreneur',
    business: 'business',
    role: 'role',
  };

  if (table !== 'entrepreneur' && table !== 'business' && table !== 'role') {
    res.render('404');
    res.status(404);
    throw new Error('You came to unavailable url');
  }

  try {
    let rows;
    // Based on current url path get full table or mixed relationship table
    if (table !== 'role') {
      ({ rows } = await db.getFullTable(tableViews[table]));
    } else {
      ({ rows } = await db.getRelationshipTable());
    }
    // Render view based on req.params value
    res.render(tableViews[table], {
      rows,
    });
  } catch (err) {
    res.render('404');
    res.status(404);
    throw new Error(`You stumbled in to error: ${err}`);
  }
};
