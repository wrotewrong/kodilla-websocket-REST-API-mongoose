const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// show all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

// show seat by id
router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter((element) => element.id == req.params.id));
});

// add seat
router.route('/seats').post((req, res) => {
  db.seats.push({
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  });

  res.json({ message: 'OK' });
});

// modify seat by id
router.route('/seats/:id').put((req, res) => {
  db.seats.map((element) => {
    if (element.id == req.params.id) {
      element.day = req.body.day;
      element.seat = req.body.seat;
      element.client = req.body.client;
      element.email = req.body.email;
    } else {
      return element;
    }
  });

  res.json({ message: 'OK' });
});

// delete seat by id
router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex((element) => element.id == req.params.id);
  db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
