var express        = require("express"),
    app            = express(),
    mongoose       = require("mongoose"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    mongoose       = require("mongoose"),
    User           = require("./models/user");

// Some app settings

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride("_method"));

app.use(require("express-session")({
  secret: "Anything", // this is the salt
  resave: false,
  saveUninitialized: false
}));

// Database and authentication settings

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(process.env.DB);
/*mongoose.connect("mongodb://127.0.0.1:27017/Adoption");*/

// Middleware to pass currentUser as a variable to all views;

app.use(function(req, res, next){
  res.locals.currentUser = req.user; 
  next();
});

// Routes

var generalRoutes= require("./routes/views");
var authRoutes= require("./routes/authentication");
var hiddenRoutes= require("./routes/hidden");

app.use(generalRoutes);
app.use(authRoutes);
app.use(hiddenRoutes);

// Turn this sucker on...

var port = process.env.PORT || 8080;

app.listen(port, function(){
	console.log("The server is running")
});