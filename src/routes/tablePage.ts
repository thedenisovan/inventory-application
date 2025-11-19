import { Router } from 'express';
import { getTableData } from '../controllers/getTableData.ts';
import { getSingleEntrepreneur } from '../controllers/getSingleEntrepreneur.ts';
import { postDeleteFromTable } from '../controllers/delteFromTable.ts';

export const tablePage = Router();

tablePage.get('/:table', getTableData);
tablePage.get('/id/:id', getSingleEntrepreneur);
tablePage.post('/id/:id/delete', postDeleteFromTable);
