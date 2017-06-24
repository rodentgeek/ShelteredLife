var express    = require("express"),
    router     = express.Router(),
    passport   = require("passport"),
    isLoggedIn = require("../middleware/logged");

// Authentication routes

router.get("/login", function(req, res){
	var msg = (req.query.msg == 1)? "failed" : ""; // if log-in failed, declare msg == 1 to inform view to post an appropriate message
	res.render("login", {msg});
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/list",
  failureRedirect: "/login?msg=1"
}));

router.get("/logout", isLoggedIn, function(req, res){
  req.logout();
  res.redirect("/list");
});

module.exports = router;