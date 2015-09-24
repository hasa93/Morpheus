

var childProcess = require('child-process-promise');

exports.runDreamer = function(command){
	command = command || 'ls -l';

	childProcess.exec(command).then(function(result){
		console.log(result.stdout + ' : ' + result.stderr);
	}).fail(function(err){
		console.log(err);
	}).progress(function(child){
		console.log('pid:' + child.pid);
	});
}
