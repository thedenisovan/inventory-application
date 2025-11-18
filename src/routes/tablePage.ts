import { Router } from 'express';
import { getTableData } from '../controllers/getTableData.ts';
import { getSingleEntrepreneur } from '../controllers/getSingleEntrepreneur.ts';

export const tablePage = Router();

tablePage.get('/:table', getTableData);
tablePage.get('/id/:id', getSingleEntrepreneur);
