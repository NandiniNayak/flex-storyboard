const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');

// Stories Index
router.get('/', (req, res) => {
  // res.send('STORIES');
  res.render('stories/index');
});

//Stories new form
router.get('/new', ensureAuthenticated, (req, res) => {
  // res.send('STORIES');
  res.render('stories/new');
});

module.exports = router;
