
module.exports = function(router){
	var multer = require('multer');
	var q = require('queue')();
	var processor = require('./processor');
	var mongoose = require('mongoose');
	var imgcontroller = require('./imageController');
	var Img = mongoose.model('Image');

	var maxPending = 5;

	//Configuring multer

	var enqueue = function(){
		
		console.log('In Enq!');
		Img.find({ IsProcessed : false }).sort({ timestamp : -1 }).limit(maxPending).exec(
			function(err, imgs){
				if(err) console.log(err);

				for(var i = 0; i < imgs.length; i++){

					Img.update({ _id : imgs[i]._id}, {$set : {IsProcessed : true}}, function(err, fb){
						if(err) console.log(err);
					});

					q.push(function(cb){
						processor.runDreamer(imgs[i].upload_name, imgs[i].dream_name);
						console.log('Success!');
					});

					q.start(function(enqueue){
						console.log('Queue started!');
						enqueue();
					});
				}
			});
	}

	
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

		 if (q.pending < maxPending){
		 	i.IsProcessed = true;

		 	i.save(function(err, fb){
		 		if(err) console.log(err);
		 	
		 		q.push( function(cb){
		 			processor.runDreamer(fb.upload_name, fb.dream_name);
		 			console.log(q);
		 		});


		 		q.start(function(cb){
							console.log('Queue started!');
							enqueue();
						});
	 		});
		}
		else
		{
			i.save(function(err, fb){
				if(err) console.log(err);
			})
		}		

		res.send('Upload Completed!');
	});

	
}
