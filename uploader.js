
module.exports = function(router){
	var multer = require('multer');
	
	var processor = require('./processor');
	var mongoose = require('mongoose');
	var imgcontroller = require('./imageController');
	var Img = mongoose.model('Image');

	var maxPending = 3;

	var q = require('queue')({ concurrency : maxPending });

	console.log(q);

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
		 });

		 Img.find({ IsProcessed : false }).sort({ timestamp : 1 }).exec(function(err, images){
		 	if(err) console.log(err);
		 	getUnprocessed(images);

		 });

		 console.log("Len: " + q.length);	

		 q.start(function(err){
		  	console.log('Finished!');			
		 });

		 res.send('Upload Completed!');
	});

	
	function getUnprocessed(data){		 
		
		for(var i = 0; i < data.length; i++){

			q.push(function(cb){
				processor.runDreamer(data[i].upload_name, data[i].dream_name);
				cb();
			});

			Img.update({ _id : data[i]._id}, { IsProcessed : true }, function(err, data){
				if(err) console.log(err);
			});
		}
	}
	
}
