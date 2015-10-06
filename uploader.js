
module.exports = function(router){
	var multer = require('multer');
	
	var processor = require('./processor');
	var mongoose = require('mongoose');
	var imgcontroller = require('./imageController');
	var Img = mongoose.model('Image');

	var async = require('async');

	var q = async.queue(function(task, callback){		
		processor.runDreamer(task.upload_name, task.dream_name, 0, callback);		
		//callback();
	}, 2);

	Img.find({ IsProcessed : false }).sort({ timestamp : 1 }).exec(function(err, images){

		for(var i = 0; i < images.length; i++){
			enqueue(images[i]);
		}

	});
	
	q.drain = function() {
		console.log('Queue drained!');		
	}

	//Configuring multer

	var storage = multer.diskStorage({
	 
		destination: function(req, file, cb){
			cb(null, './upload');
		},

		filename: function(req, file, cb){
			cb(null, file.originalname + '-' + Date.now());
		},


	});

	var fileFilter = function(req, file, cb){
	
		if(file.mimetype !== 'image/jpeg'){
			return cb(new Error('Only jpegs are allowed!'));
		}

		cb(null, true);
	}

	var upload = multer({ storage: storage, fileFilter: fileFilter });

	router.post('/api/image/process', upload.single('dream'), function(req, res, next){
		
		 var fname = req.file.filename;

		 var i = Img({ upload_name : fname, dream_name : 'dd_' + fname });

		 i.save(function(err, fb){
		 	if(err) console.log(err);
		 	enqueue(fb);
		 });

		 res.render('index', { title : 'Morpheus 1.0' });
	});

	function enqueue(item){

		q.push(item, function(err){
			if(err) console.log(err);

			Img.update({ _id : item._id }, { IsProcessed : true }, function(err, item){
				if(err) console.log(err);
				console.log('Processed image: ' + item.upload_name);
			});
			
		});		
	}

}
