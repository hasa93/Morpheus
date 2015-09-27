
module.exports = function(router){
	var multer = require('multer');
	
	var processor = require('./processor');
	var mongoose = require('mongoose');
	var imgcontroller = require('./imageController');
	var Img = mongoose.model('Image');

	var maxPending = 3;

	var q = require('queue')({ concurrency : maxPending });

    q.on('success', function(err, job){
    	if(err) console.log(err);

    	console.log('Processing Comleted!');
	});
	
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

		 	q.push(function(cb){
		 		processor.runDreamer(fb.upload_name, fb.dream_name);
		 		cb();
		 	});

		 	q.start(function(err){
		 		if(err) console.log(err);
		 	});


		 });

		 res.send('Upload Completed!');
	});
	
}
