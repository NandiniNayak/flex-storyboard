// helper are created to restric routes
module.exports = {
  ensureAuthenticated: function(req, res, next){
    // only if authenticated, allow next function to be executed else redirect to root path
    if(req.isAuthenticated()){
      // console.log("user authentivcated");
      return next();
    }
    // console.log("user not authenticated redirect")
    res.redirect('/');
  },
  // if we are logged in we should be on dashboard, we should not be able to go back to welcome page
  ensureGuest: function(req, res, next){
    if(req.isAuthenticated()){
      // console.log("user authentivcated");
      res.redirect('/dashboard');
    }else {
      return next();
    }
  }
}
