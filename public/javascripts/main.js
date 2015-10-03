
var prevUploaded = false;

function handleFiles(){

	if(prevUploaded === false)
		$('#file').trigger('click');	
	else
		$('#submitter').trigger('click');

	prevUploaded = !prevUploaded;
}
