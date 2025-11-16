import express from 'express';

const app = express();
const PORT = 3030;

app.get('/', (req, res) => res.send('hello'));

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Listening to http://localhost:${PORT}`)
);
