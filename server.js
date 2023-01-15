const express = require('express');
const app = express();

app.use(express.urlencoded({ extends: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
  {
    id: 3,
    author: 'Jane Smith',
    text: 'So cool.',
  },
];

app.get('/testimonials/random', (req, res) => {
  const random = Math.floor(Math.random() * db.length);
  res.json(db[random]);
});

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter((element) => element.id == req.params.id));
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
