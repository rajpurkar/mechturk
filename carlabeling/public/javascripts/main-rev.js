//
// This method Gets URL Parameters (GUP)
//
function gup(name) {
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var tmpURL = window.location.href;
	var results = regex.exec(tmpURL);
	if (results == null)
		return "";
	else
		return results[1];
}

//
// This method decodes the query parameters that were URL-encoded
//
function decode(strToDecode) {
	var encoded = strToDecode;
	return unescape(encoded.replace(/\+/g, " "));
}

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var image = new Image();

image.onload = function() {
	var dim = resizeImage(image);
	context.drawImage(image, 0, 0, dim.width, dim.height);
	markCollection = new MarkingCollection(image);
}

image.src = decodeURI(gup('url'));

var mark = new Marking(image);
var color = new ColorRotator();
var markCollection;
