import { Router } from 'express';
import { postNewData } from '../controllers/postNewData.js';

export const newPersonForm = Router();

newPersonForm.get('/', (_req, res) => res.render('newPerson'));
newPersonForm.post('/', postNewData);
