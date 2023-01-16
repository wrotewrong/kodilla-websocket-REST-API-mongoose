const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// get random post
router.route('/testimonials/random').get((req, res) => {
  const random = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[random]);
});

// get all posts
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

// get post by id
router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter((element) => element.id == req.params.id));
});

// add post
router.route('/testimonials').post((req, res) => {
  db.testimonials.push({
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  });

  res.json({ message: 'OK' });
});

// modify post by id
router.route('/testimonials/:id').put((req, res) => {
  db.testimonials.map((element) => {
    if (element.id == req.params.id) {
      element.author = req.body.author;
      element.text = req.body.text;
    } else {
      return element;
    }
  });

  res.json({ message: 'OK' });
});

// delete post by id
router.route('/testimonials/:id').delete((req, res) => {
  const index = db.testimonials.findIndex(
    (element) => element.id == req.params.id
  );
  db.testimonials.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
