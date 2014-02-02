var fs = require('fs');
var $ = jQuery = require('jQuery');
require('./jquery.csv.js');

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

var sample = 'samp2.csv';
var total = [];
fs.readFile(sample, 'UTF-8', function(err, csv) {
    $.csv.toArrays(csv, {delimiter:'"', separator:'\t', }, function(err, data) {
        a= getCol(data,getColOf(data, "annotation"));
        b= getCol(data,getColOf(data, "Answer.markings"));
        total.push(a);
        total.push(b);
        total =total.transpose();
        console.log(total)
    });
});

