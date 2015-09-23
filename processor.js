
var childProecess = require('child-process-promise');

exports.testProcess = function(req, res){

	childProecess.exec('pwd').then(function(result){
		console.log(result.stdout);
		console.log(result.stderr);
		res.send(result.stdout + ' : ' + result.stderr);

	}).fail(function(err){
		console.log(err);
	}).progress(function(process){
		console.log('childProcess.pid:'+ process.pid);
	});
}

exports.runScript = function(req, res){

	var command = req.body.command;

	childProecess.exec(command).then(function(result){
		res.send(result.stdout + ' : ' + result.stderr);
	}).fail(function(err){
		console.log(err);
	}).progress(function(child){
		console.log('pid:' + child.pid);
	});
}
