var express = require('express');
var router = express.Router();
var imgController = require('../imageController');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Morpheus 1.0' });
});

router.get('/files', function(req, res){
	res.render('file', { title : 'File Upload'});
});

router.get('/api/images/list', imgController.listImages);
router.post('/api/images/add', imgController.addImage);
router.get('/api/images/get/:id', imgController.getImage);

module.exports = router;
