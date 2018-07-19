## OPL:
- how to save the keys in env/secure


1. npm init
2. start server
3. push to heroku

## use passport-google-oauth2
https://github.com/jaredhanson/passport-google-oauth2

1. enable google oauth in developer console
2. create credentials
3. save them in config/keys.js

## install passport
- npm install --save passport passport-google-oauth20

1. create routes for auth.
2. create routes/auth.js and express router in app.js
3. test out with /auth/google
4. define strategy -> create config/passport.js
5. upadte auth.js, app.js

## configure callback
/auth/google/callback

https://github.com/jaredhanson/passport-google-oauth2:

<!-- at this stage notice in console, profile and google info is fetched -->


## push to heroku
