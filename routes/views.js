var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Adoptee    = require("../models/adoptee"),
    isLoggedIn = require("../middleware/logged");

// Index route.  Notice on every access, the database resets. This is intended so new viewers 
// could see the original version of the database.

router.get("/", function(req, res){
	res.redirect("/seeddb");
});

// Show (all) routes

router.get("/list", function(req, res){

	// Read querystring to determine filter criteria by passing appropriate object
	
	var search = req.query.s;

	if(!search){
		searchObj = {};
		search = "all";
	} else {
		searchObj = {species: search};
	}

	Adoptee.find(searchObj, function(err, data){
		if(err){
			console.log(err)
		} else {
			res.render("list", {data, search});	
		}
	});
});

// Create routes

router.get("/list/new", isLoggedIn, function(req, res){
	res.render("add", {data: ""}); // Declare a funky blank data object to prevent error from being thrown in view
});

router.post("/list", function(req, res){
	Adoptee.create(req.body.pet, function(err, data){
		if(err){
			console.log(err);
		} else {
			console.log(data);
			res.redirect("/list");
		};
	});
});

// Show (individual) route

router.get("/list/:id", function(req, res){
	Adoptee.findById(req.params.id, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.render("adoptee", {data});
		}
	});
});

// Edit and Delete routes

router.get("/list/:id/edit", isLoggedIn, function(req, res){
	Adoptee.findById(req.params.id, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.render("edit", {data});
		}
	});
});

router.put("/list/:id", isLoggedIn, function(req, res){
	Adoptee.findByIdAndUpdate(req.params.id, req.body.pet, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/list/" + req.params.id);
		}
	});
});

router.delete("/list/:id", isLoggedIn, function(req, res){
	Adoptee.findByIdAndRemove(req.params.id, function(err, data){
		if(err){
			console.log(err);
		} else {
			res.redirect("/list");
		}
	});
});

module.exports = router;