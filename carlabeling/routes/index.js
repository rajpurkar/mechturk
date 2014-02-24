/*
 * GET home page.
 */

/*Defining a worker model. TODO move to a separate worker
 * module.
 */
/*
var Worker = new mongoose.Schema({
	id: {
		type: String,
		index: {
			unique: true,
			dropDups: true
		}
	},
	Confidence: Number,
	Feedback: [String],
	Hits: [Number],
});
*/

/*Defining a hit model. TODO move to a separate HIT
 * module.
 */

/*
var Hit = new mongoose.Schema({
	imgurl: String,
	workerid: String,
});
*/

exports.index = function(req, res){
  res.render('index', { title: 'Box Around Cars' });
};

/*This function is responsible for modifying the database to reflect the new feedback.
 * The function does not actually send the email: that is done from the front end.
 */
exports.handleFeedback = function(req, res){
	/* Pseudocode until workers are defined, and database set up
	 *
	 * -get the worker based on the worked id
	 * -update confidence based on accept/reject
	 * -update feedback array with new comments inserted
	 * -
	 */
}

/* This function is responsible for adding the workers
 *  to the database. TODO
 */
exports.addWorkers = function(){

}
