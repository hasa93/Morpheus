
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

var ImageSchema = new Schema({
	
	upload_name : String,
	dream_name : String,
	IsProcessed : { type : Boolean, default : false },
	timestamp : { type : Date, default : Date.now },
	likes : { type : Number, default : 0 }
});

mongoose.model('Image', ImageSchema);