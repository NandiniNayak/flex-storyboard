const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {ensureAuthenticated, ensureGuest} = require('../helpers/auth');


// Stories Index
router.get('/', (req, res) => {
  // fetch public stories
  Story.find({status: 'public'})
  // populate suer with user fields : access association
    .populate('user')
    .sort({date: 'desc'})
    .then(stories => {
      // res.send('STORIES');
      res.render('stories/index', {
        stories: stories
      });
    });

});

// show single Story
router.get('/show/:id', (req, res) => {
  // note: when an id is passed use findOne method
  Story.findOne({
    _id: req.params.id
  })
  .populate('user')
  // populate user comment
  .populate('comments.commentUser')
  .then( story => {
    // render only if status is public for all users
    if(story.status == 'public'){
      res.render('stories/show', {
        story: story
      });
    } else{
      // check if the user exists and the user owns the story then show the private story aswell
        if(req.user){
          if(req.user.id === story.user.id){
            res.render('stories/show', {
              story: story
            });
          }else {
            res.redirect('/stories');
          }
        } else {
          res.redirect('/stories');
        }
    }
  });
});


// list stories from a user
router.get('/user/:userId', (req, res) =>{
  Story.find({
    user:req.params.userId,
    status: 'public'
  })
  .populate('user')
  .then(stories => {
    res.render('stories/index', {
      stories: stories
  });
 });
});

// Logged user stories my story page
router.get('/my', ensureAuthenticated, (req, res) =>{
  Story.find({
    user:req.user.id
  })
  .populate('user')
  .then(stories => {
    res.render('stories/index', {
      stories: stories
  });
 });
});
//Stories new form
router.get('/new', ensureAuthenticated, (req, res) => {
  // res.send('STORIES');
  res.render('stories/new');
});
// edit story form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  console.log('edit story');
  Story.findOne({
    _id: req.params.id
  })
  .then( story => {
    // if the story doesnot belong to user disable edit
    if(story.user != req.user.id){
      res.redirect('/stories');
    }else {
      // res.send('STORIES');
      res.render('stories/edit', {
        story: story
      });
    }
  });
});

// process Add Story
router.post('/', (req, res) => {
  /* step 1:
  res.send('sent')
  step 2:
  console.log(req.body); //{ title: '', status: 'public', allowComments: 'on', body: '' }
  res.send('hello')
  step 3:
  note: allowComments gets saved as on when checked and allowComments does not exist when unchecked, hence we need a check to store true or false*/

  let allowComments;

  if(req.body.allowComments){
    allowComments = true;
  } else {
    allowComments = false;
  }
  // create story object
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }

  // Create Story
  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`);
    });
});

// EDIT form process
router.put('/:id', (req,res) => {
    Story.findOne({
      _id: req.params.id
    })
    .then(story => {
      let allowComments;

      if(req.body.allowComments){
        allowComments = true;
      } else {
        allowComments = false;
      }
      //New values
      story.title = req.body.title;
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = allowComments;
      story.save()
        .then(story => {
          res.redirect('/dashboard');
        });
    });
});

// delete story
router.delete('/:id', (req, res) => {
  Story.remove({_id: req.params.id})
    .then(() => {
      res.redirect('/dashboard');
    });
});

// Add Comment
router.post('/comment/:id', (req,res) => {
  Story.findOne({
    _id:req.params.id
  })
  .then(story => {
    // create a new object comment
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user.id
    }
    // Add to comment array
    // note: unshift will add comments at start of the array, hence showing lastest comments
    story.comments.unshift(newComment);
    story.save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`)
    })
  })
})
module.exports = router;
