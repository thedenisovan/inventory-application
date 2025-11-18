import { Router } from 'express';

export const newPersonForm = Router();

newPersonForm.get('/', (_req, res) => res.render('newPerson'));
