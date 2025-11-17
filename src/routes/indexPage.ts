import { Router } from 'express';

export const indexPage = Router();

indexPage.get('/', (_req, res) => res.render('index'));
