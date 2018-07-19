const express = require('express');
const router = express.Router();

// Stories Index
router.get('/', (req, res) => {
  // res.send('STORIES');
  res.render('stories/index');
});

//Stories new form
router.get('/new', (req, res) => {
  // res.send('STORIES');
  res.render('stories/new');
});

module.exports = router;
