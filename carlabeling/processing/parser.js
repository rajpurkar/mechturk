var fs = require('fs');
var $ = jQuery = require('jQuery');
require('./jquery.csv.js');
var builder = require('xmlbuilder');

Array.prototype.transpose = function() {

  // Calculate the width and height of the Array
  var a = this,
    w = a.length ? a.length : 0,
    h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
};

Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
            array.map(function(elem,i) {
                return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
            })
            );
}

function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
        column.push(matrix[i][col]);
    }
    return column;
}

function getColOf(mat, search){	
    return (mat[0].indexOf(search))
}

var filename = 'samp.csv';
var total = [];
fs.readFile(filename, 'UTF-8', function(err, csv) {
    $.csv.toArrays(csv, {delimiter:'"', separator:'\t', }, function(err, data) {
        makeal(data);
        makeidl(data);
    });
});

function processResults(results){
    results = results.split(",");
    var rects = results.slice(1);
    if(rects.length%4 !== 0) throw "rectangle markings not a multiple of four"
    return rects.chunk(4);
}

function e(data, str, i){
    return data[i+1][getColOf(data, str)];
}

function makeal(data){
    var al = builder.create("annotationlist");
    //can be multiple annotation
    for(var i = 0; i< data.length-1; i++){
        var annot = al.ele("annotation")
            .ele("image")
            .ele("name", e(data, "annotation", i))
            //can be many of these
            var results = processResults(e(data, "Answer.results", i));
        for ( var j = 0; j < results.length; j++){
            var rectCoords = results[j]; 
            annot.ele("annorect")
                .ele("amt_annotation_str", e(data, "annotation", i))
                .insertAfter("hitid", e(data,"hitid", i)) 
                .insertAfter("assignmentid", e(data, "assignmentid", i))
                .insertAfter("workerid", e(data, "workerid", i))
                .insertAfter("x1", rectCoords[0])
                .insertAfter("y1", rectCoords[1])
                .insertAfter("x2", rectCoords[2])
                .insertAfter("y2", rectCoords[3])
                .insertAfter("silhouette")
                //what does this id mean?
                .ele("id", "id here")
                //what does score mean?
                .up().ele("score", "score here");
        }
    }
    var xml = al.end({ pretty: true});
    //console.log(xml.substr(xml.indexOf('\n')));
}

function makeidl(data){
    var str = "";
   for(var i = 0; i< data.length-1; i++){ 
      var image = e(data, "annotation", i);  
      str += image + ": ";
      var markings= processResults(e(data, "Answer.results", i));
      for(var j =0; j < markings.length -1; j++){
          if(j!==0) str += ", "
          str += "(" + markings[j] + "):-1";
      }
      str += "; \n" 
   }
   console.log(str);
}
