function resizeImage(image) {
    var diffWidth = image.width - canvas.width;
    var diffHeight = image.height - canvas.height;
    if (diffWidth > 0 || diffHeight > 0) {
        if (diffWidth > diffHeight) {
            var ratio = image.height / image.width;
            image.width = canvas.width;
            canvas.height = image.height = ratio * image.width;
        } else {
            var ratio = image.width / image.height;
            image.height = canvas.height;
            canvas.width = image.width = ratio * canvas.width;
        }

    } else {
        canvas.height = image.height;
        canvas.width = image.width;
    }
    return {
        width : image.width,
              height : image.height
    };
}

function findMouseOnCanvas(e) {
    return {
        x : e.pageX - canvas.offsetLeft,
        y : e.pageY - canvas.offsetTop
    }
}

function addMarkToCollection() {
    if (mark.isSet()) {
        markCollection.addMarking(mark);
        mark.removeMarking();
        return true;
    }
    return false;
}