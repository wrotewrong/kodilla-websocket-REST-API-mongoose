const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extends: false }));
app.use(express.json());

const db = [
  { id: 'x1', author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 'x2',
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
  {
    id: 'x3',
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

app.post('/testimonials', (req, res) => {
  db.push({ id: uuidv4(), author: req.body.author, text: req.body.text });

  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  db.map((element) => {
    if (element.id == req.params.id) {
      element.author = req.body.author;
      element.text = req.body.text;
    } else {
      return element;
    }
  });

  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const index = db.findIndex((element) => element.id == req.params.id);
  db.splice(index, 1);

  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
