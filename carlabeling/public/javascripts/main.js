var image = new Image();

image.onload = function() {
    var dim = resizeImage(image);
    context.drawImage(image, 0, 0, dim.width, dim.height);
    markCollection = new MarkingCollection(image);
}

var myBuffer = new imageBuffer();
myBuffer.addImage("images/237E_split_9_237E_a2_00901.jpeg");
myBuffer.addImage("images/580E_split_0_580E_c1_00251.jpeg");
myBuffer.addImage("images/580E_split_0_580E_c1_00501.jpeg");
myBuffer.addImage("images/580E_split_3_580E_a1_00701.jpeg");

image.src = myBuffer.getNextImage();
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


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
    if (markCollection.isSet()) {
        addMarkToCollection();
        console.log(markCollection.jsonify());
        markCollection.removeMarkingCollection();
        if (myBuffer.hasMore()) {
            image.src = myBuffer.getNextImage();
            var dim = resizeImage(image);
            //$("#myCanvas").fadeOut(500, function() {
            context.drawImage(image, 0, 0, dim.width, dim.height);
            //    $("#myCanvas").fadeIn(500);
            //});
            $("#message").text("Next Image has loaded. Please start marking the cars.");

        } else {
            $("#message").text("Now move your mouse over the lane marking. Click once completed.");
            $("#bt").fadeOut("slow");
            $("#message").text("Your responses have been recorded. Thank you.");
            $("#myCanvas").fadeOut("slow");
            markCollection.kill();
        }
    }
    return false;
});
