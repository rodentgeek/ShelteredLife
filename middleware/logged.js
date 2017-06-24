// Middleware to test whether someone's been logged in

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
	  res.redirect("/login");
};

module.exports = isLoggedIn;