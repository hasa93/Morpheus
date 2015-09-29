
module.exports = function(router){
	var multer = require('multer');
	
	var processor = require('./processor');
	var mongoose = require('mongoose');
	var imgcontroller = require('./imageController');
	var Img = mongoose.model('Image');

	var async = require('async');

	var q = async.queue(function(task, callback){
		console.log('Q initiated!');
		processor.runDreamer(task.upload_name, task.dream_name, callback);
		//callback();
	}, 2);

	q.drain = function() {
		console.log('Processing Finished!');
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

		    q.push(fb, function(err){
		    	console.log('Image Pushed!')
		    	console.log(err);
		    } );
		 });

		 res.send('Upload Completed!');
	});

}
