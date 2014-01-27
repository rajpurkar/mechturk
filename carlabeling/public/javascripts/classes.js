var imageBuffer = function() {
    var images = [];
    var index = 0;
    var count = 0;

    this.addImage = function(imageString) {
        images.push(imageString);
        count++;
    }

    this.hasMore = function() {
        return index < count;
    }

    this.getNextImage = function() {
        var singleImage = images[index];
        index++;
        return singleImage;
    }

    this.printAll = function() {
        for (var i = 0; i < count; i++) {
            $('body').append(images[i] + "<br/>");
        }
    }
}

var MarkingCollection = function(image) {
    //var imageHeight = image.height;
    var count = 0;
    var markings = [];
    var started = false;
    var dead = false;
    this.addMarking = function(marking) {
        started = true;
        markings.push(marking.getPoints());
    }

    this.kill = function() {
        dead = true;
    }

    this.alive = function() {
        return !dead;
    }

    this.exportMarkings = function() {
        return NULL;
    }

    this.isSet = function() {
        return started;
    }

    this.printMarkings = function() {
        console.log(markings);
    }

    this.removeMarkingCollection = function() {
        started = false;
        count = 0;
        markings = [];
    }

    this.jsonify = function() {
        return JSON.stringify({
            width : image.width,
            height : image.height,
            markings : markings,
        });
    }
}

var Marking = function() {
    var points = [];
    var counter = 0;
    var started = false;

    this.addPoint = function(point) {
        points.push(point);
    };

    this.printPoints = function() {
        for (var i = 0; i < points.length; i++) {
            $('body').append(points[i].x + ", " + points[i].y + "<br/>");
        }
    }

    this.getPoints = function() {
        return points;
    }

    this.isSet = function() {
        return started;
    }

    this.markStarted = function() {
        started = true;
    }

    this.removeMarking = function() {
        points = [];
        started = false;
    }

    this.jsonify = function() {
        return JSON.stringify({
            width : image.width,
            height : image.height,
            markings : points,
        });
    }
}

var ColorRotator = function() {
    var index = 0;
    var colors = ['#9acd32', '#ff6347', '#4169e1', '#ffd700'];
    this.getNextColor = function() {
        var color = colors[index];
        index = (index + 1) % colors.length;
        return color;
    }
}
