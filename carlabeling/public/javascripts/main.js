var image = new Image();

image.onload = function() {
    var dim = resizeImage(image);
    context.drawImage(image, 0, 0, dim.width, dim.height);
    markCollection = new MarkingCollection(image);
}

console.log(gup('url'));
image.src = decode(gup('url'));
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


var mark = new Marking(image);

var color = new ColorRotator();
var markCollection;


$('#myCanvas').click(function(e) {
    if(!preview){
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
    }
});

$('#bt').click(function(e) {
    console.log(markCollection.jsonify());
    $('#marks').val(markCollection.jsonify());
    return false;
});