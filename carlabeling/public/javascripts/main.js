        //
        // This method Gets URL Parameters (GUP)
        //
        function gup( name )
        {
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var tmpURL = window.location.href;
            var results = regex.exec( tmpURL );
            if( results == null )
            return "";
            else
            return results[1];
        }

        //
        // This method decodes the query parameters that were URL-encoded
        //
        function decode(strToDecode)
        {
            var encoded = strToDecode;
            return unescape(encoded.replace(/\+/g,  " "));
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

document.getElementById('assignmentId').value = gup('assignmentId');
//
// Check if the worker is PREVIEWING the HIT or if they've ACCEPTED the HIT
//
if (gup('assignmentId') == "ASSIGNMENT_ID_NOT_AVAILABLE")
{
	// If we're previewing, disable the button and give it a helpful message
	document.getElementById('submitButton').disabled = true;
	$('#bt').prop('disabled', true);
	preview = true;
	document.getElementById('submitButton').value = "You must ACCEPT the HIT before you can submit the results.";
} else {
	var form = document.getElementById('mturk_form');
	if (document.referrer && (document.referrer.indexOf('workersandbox') != -1) ) {
		form.action = "http://workersandbox.mturk.com/mturk/externalSubmit";
	}

	var mark = new Marking(image);
	var color = new ColorRotator();
	var markCollection;

	$('#myCanvas').click(function(e) {
		if (markCollection.alive()) {
			var mouse = findMouseOnCanvas(e);
			if (!mark.isSet()) {
			mark.markStarted();
			mark.addPoint(mouse);
			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = context.fillStyle = color.getNextColor();
			context.moveTo(mouse.x, mouse.y);
			context.arc(mouse.x, mouse.y, 3, 0, 2 * Math.PI, true);
			context.fill();
			context.stroke();
			$("#message").text("Now select the bottom right of the car.");
			} else {
			mark.addPoint(mouse);
			context.moveTo(mouse.x, mouse.y);
			context.arc(mouse.x, mouse.y, 3, 0, 2 * Math.PI, true);
			context.fill();
			context.stroke();
			context.closePath();
			var marking = mark.getPoints();
			context.beginPath();
			context.rect(marking[0].x, marking[0].y, marking[1].x- marking[0].x, marking[1].y- marking[0].y);
			context.stroke();
			context.closePath();
			$("#message").text("Now select the top-left of another car. Or press submit to finish.");
			addMarkToCollection(mark);
			return;
			}
	}
	});

	$('#bt').click(function(e) {
		console.log(markCollection.jsonify());
		$('#marks').val(markCollection.jsonify(),function(){
			$('#mturk_form').submit();
		});
	});
}
