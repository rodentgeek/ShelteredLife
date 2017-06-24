var mongoose = require("mongoose");

var adopteeSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
  gender: String,
  desc: String, 
  image: String,
  date: Date
});

module.exports = mongoose.model("Adoptee", adopteeSchema);