const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// show concert
router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// show concert by id
router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter((element) => element.id == req.params.id));
});

// add concert
router.route('/concerts').post((req, res) => {
  db.concerts.push({
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });

  res.json({ message: 'OK' });
});

// modify concert by id
router.route('/concerts/:id').put((req, res) => {
  db.concerts.map((element) => {
    if (element.id == req.params.id) {
      element.performer = req.body.performer;
      element.genre = req.body.genre;
      element.price = req.body.price;
      element.day = req.body.day;
      element.image = req.body.image;
    } else {
      return element;
    }
  });

  res.json({ message: 'OK' });
});

// delete concert by id
router.route('/concerts/:id').delete((req, res) => {
  const index = db.concerts.findIndex((element) => element.id == req.params.id);
  db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
