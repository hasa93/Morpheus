var express = require('express');
var router = express.Router();
var gamemaker = require('../gamemaker');
var processor = require('../processor');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/files', function(req, res){
	res.render('file', { title : 'File Upload'});
});

router.post('/api/player/create', gamemaker.createPlayer);
router.get('/api/player/list', gamemaker.listPlayers);
router.get('/api/player/find/:id', gamemaker.getPlayer);
router.get('/api/player/find/:gps', gamemaker.getGps);
router.get('/api/player/remove/:mobileId', gamemaker.removePlayer);

router.post('/api/problem/create', gamemaker.addProblem);
router.get('/api/problem/get', gamemaker.getGps);
router.get('/api/problem/list', gamemaker.listProblems);

router.post('/api/processor/run', processor.runScript);

module.exports = router;
