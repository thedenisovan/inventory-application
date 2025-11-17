import { Router } from 'express';
import { getTableData } from '../controllers/getTableData.ts';

export const tablePage = Router();

tablePage.get('/:table', getTableData);
