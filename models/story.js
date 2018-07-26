const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const StorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'public' //set a default value
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  //comments is an array of objects
  comments: [{
    commentBody: {
      type: String,
      required: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
    // association between user and comments
    commentUser:{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  //association between story and user
  // story.user.firstName
  user:{
    type: Schema.Types.ObjectId, // if you use string instead you will get user id but cannot get the functionality like story.user.firstName
    ref: 'users'
  },
  date:{
    type: Date,
    default: Date.now
  }
});
// create collection and add schema: third param is to overwrite the default database that gets created as storys with stories "ies"
mongoose.model('stories', StorySchema, 'stories');
