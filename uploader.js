
var multer = require('multer');

//Configuring multer

var storage = multer.diskStorage({
	
	destination: function(req, file, cb){
		cb(null, './upload');
	},

	filename: function(req, file, cb){
		cb(null, file.originalname + '-' + Date.now());
	}
});

var upload = multer({storage: storage});

module.exports = upload;
