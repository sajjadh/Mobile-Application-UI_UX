$(document).ready(function() {
	
	// Enable disable email button function
	$('.checkBox').on('click', function () {
		if($('.checkBox').is(':checked')){
			$('#email_btn').removeClass('ui-disabled');
		}else{
			$('#email_btn').addClass('ui-disabled');
		}
	});

});