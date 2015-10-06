
var prevUploaded = false;

function handleFiles(){
	
	if(prevUploaded === false){
		$('#file').trigger('click');		
	}	
	else {		
		var file = $('#file')[0].files[0];
		if(file) $('#submitter').trigger('click');		
	}	

	prevUploaded = !prevUploaded;

}

$('document').ready(function(){
	$('#info').on('click', function(event){
		event.stopPropagation();
		console.log('Clicked!');
	});
});
