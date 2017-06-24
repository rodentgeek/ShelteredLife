var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    Adoptee  = require("../models/adoptee"),
    seedData = require("../models/seeddata"),
    User     = require("../models/user");

// Hidden route to reseed database

router.get("/seeddb", function(req, res){
	Adoptee.remove({}, function(err, success){
		if(err){
			console.log(err);
		} else {
			Adoptee.create(seedData, function(err, data){
				if(err){
					console.log(err);
				} else {
					console.log("Database resetted");
					res.redirect("/list");
				}
			});
		}
	});
});

// Hidden route for needing to quickly add to the authentication collection in MongoDB, if neessary

router.post("/register", function(req, res){
  var x = req.body;
  User.register(new User({username: x.username}), x.password, function(err, success){
      if(err){
         console.log(err);
     }
     passport.authenticate("local")(req, res, function(){
       res.redirect("/list");
     });
   });
});

module.exports = router;