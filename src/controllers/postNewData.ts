import { postRelationTable } from '../db/query.js';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';

const validateUser = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage(`Second name ${lengthErr}`)
    .isAlpha()
    .withMessage(`Second name ${alphaErr}`),
];

export const postNewData = [
  // Must destructure validator because express get/post methods does not accepts array as second argument.
  ...validateUser,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('newPerson', { errors: errors.array() });
    }

    try {
      await postRelationTable(req.body);
      res.redirect('/view/entrepreneur');
    } catch {
      res.redirect('404');
      res.status(400);
    }
  },
];
