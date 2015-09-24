
var multer = require('multer');

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

module.exports = upload;
