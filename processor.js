

var childProcess = require('child-process-promise');

exports.runDreamer = function(filename, destname){
	command = "python ./caffe/3-step-easy.py -l inception_4c/output -b ./caffe/bvlc_googlenet -i ./upload/" + filename + " -o ./dreams/" + destname +".jpg";

	childProcess.exec(command).then(function(result){
		console.log(filename + ' processing ...');
	}).fail(function(err){
		console.log(err);
	}).progress(function(child){
		console.log('pid: ' + child.pid);
	});
}
