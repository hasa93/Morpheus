
var prevUploaded = false;

function handleFiles(){
	
	var file;

	if(prevUploaded === false){
		$('#file').trigger('click');

		file = $('#file')[0].files[0];

		if(file){
			$('#logo').attr('title', '>>');
			$('#logo').attr('subtitle', 'Dreamify Me!');
	  }
	}	
	else {		
		
		if(file) $('#submitter').trigger('click');		
	}	

	prevUploaded = !prevUploaded;

}

$('document').ready(function(){
	$('#info').on('click', function(message){		
		console.log('Clicked!');
	});
});
