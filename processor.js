

var childProcess = require('child-process-promise');

exports.runDreamer = function(filename, destname, callback){
	command = "python ./caffe/3-step-easy.py -l inception_4c/output -b ./caffe/bvlc_googlenet -i ./upload/" + filename + " -o ./dreams/" + destname +".jpg";

	childProcess.exec(command, function(err, stdout, stderr){
		if(err) console.log(err);

		console.log('stdout:' + stdout);
		console.log('stderr:' + stderr);

		callback();
	}).progress(function(child){
		console.log('Image.pid: ', child.pid);
	});
}
