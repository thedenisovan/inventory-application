import { Router } from 'express';
import { getTableData } from '../controllers/getTableData.js';
import { getSingleEntrepreneur } from '../controllers/getSingleEntrepreneur.js';
import { postDeleteFromTable } from '../controllers/delteFromTable.js';

export const tablePage = Router();

tablePage.get('/:table', getTableData);
tablePage.get('/id/:id', getSingleEntrepreneur);
tablePage.post('/id/:id/delete', postDeleteFromTable);
