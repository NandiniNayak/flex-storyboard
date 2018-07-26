module.exports = {
  // connect to Mlab:
  // mongoURI: 'mongodb://nandini:nandini1@ds141621.mlab.com:41621/storyboard-dev',

  // connect to Atlas mongo: https://www.mongodb.com/cloud/atlas
  mongoURI: process.env.MONGO_URI,
  googleClientID: process.env.GOGGLE_CLIENT_ID,
  googleClientSecret: process.env.GOGGLE_CLIENT_SECRET
}
