
//Establishing connection and configuring db

var mongoose = require('mongoose');

var connect = function(){
	var options = {server: {socketOptions: {keepAlive: 1}}};
    mongoose.connect('mongodb://localhost/cicada', options);
    console.log('DB Connected!');
}

connect();

mongoose.connection.on('error', function(err){
	console.log(err);
});

mongoose.connection.on('disconnected', function(){
	connect();
});


//Declaring Schemas and models

var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	mobile_id : String,
	player_name : String,
	attributes : Array
});

var ProblemSchema = new Schema({
	gps_coords : Array,
	problem_text : String,
	answer_text : String
});

mongoose.model('Player', PlayerSchema);
mongoose.model('Problem', ProblemSchema);