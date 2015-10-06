
var mongoose = require('mongoose'),
    Img = mongoose.model('Image');


exports.addImage = function(req, res){

	var i = Img(req.body);

	i.dream_name = "dd_" + i.upload_name;
	
	i.save(function(err, fb){

		if(err) console.log(err);
		res.json(fb);
	});
}

exports.listImages = function(req, res){

	Img.find(function(err, images){
		if(err) console.log(err);
		res.json(images);		
	});
}

exports.getImage = function(req, res){

	Img.find({ _id : req.params.id }, function(err, image){
		if(err) console.log(err);

		res.json(image);
	});
}