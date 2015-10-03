

var childProcess = require('child-process-promise');

var layers = ['inception_3b/5x5_reduce']

exports.runDreamer = function(filename, destname, layer, callback){

	var cnnLyr = layers[layer] || 'inception_4c/output';

	command = "python ./caffe/3-step-easy.py -l " + cnnLyr + " -b ./caffe/bvlc_googlenet -i ./upload/" + filename + " -o ./dreams/" + destname +".jpg";

	childProcess.exec(command, function(err, stdout, stderr){
		if(err) console.log(err);

		console.log('stdout:' + stdout);
		console.log('stderr:' + stderr);

		callback();
	}).progress(function(child){
		console.log('Image.pid: ', child.pid);
	});
}
