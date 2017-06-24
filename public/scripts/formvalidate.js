function validate(){

	var fieldName = document.querySelector("#name").value;
	var fieldAge = document.querySelector("#age").value;
	var fieldDesc = document.querySelector("#desc").value;
	var fieldImage = document.querySelector("#image").value;
	var fieldSpecies = document.querySelector("#species").value;
	var fieldGender = document.querySelector("#gender").value;

// If passes all tests, to submit form.

	if(ifEmpty(fieldName)){
		postMsg("Please provide a name");
	} else if(!isNumber(fieldAge)){
		postMsg("Please provide a valid age");
	} else if(ifEmpty(fieldDesc)){
		postMsg("Please provide a description")
	} else if(ifEmpty(fieldImage)){
		postMsg("Please provide an image URL");
	} else if(fieldSpecies == "default"){
		postMsg("Please select a species");
	} else if(fieldGender == "default"){
		postMsg("Please select a gender");
	} else {
		document.querySelector("#theForm").submit();
	}
}

// Checks if the Name, Description and Image files are not empty.

function ifEmpty(x) {
  return x.length == 0;
}

// Checks if the Age field is a number and not empty.

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// If something's wrong, post appropriate message on the page.

function postMsg(msg){
	var x = "<span class='glyphicon glyphicon-remove'></span> " + msg;
	document.querySelector("#msg").innerHTML = x;
}