import express from 'express';
import path from 'path';
import { tablePage } from './routes/tablePage.ts';

const app = express();
const PORT = 3030;

app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'ejs');

// Uses static files
app.use(express.static(path.join(import.meta.dirname, 'public')));
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', tablePage);

app.get('{*splat}', function (_req, res) {
  res.render('404');
});

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Listening to http://localhost:${PORT}`)
);
