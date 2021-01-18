$(document).ready(function() {

   	// offers page back navi
	$('.back_btn').on('click', function() { 
		window.location.href = 'home.html';	
	})

	// offers page navi
	$('#viewMore').on('click', function() { 
		window.location.href = 'offers.html';	
	})

	// go to favs
	$('.fav').on('click', function() { 
		window.location.href = 'test.html#favourites_Page';	
	})

    // go to home
	$('.home').on('click', function() { 
		window.location.href = 'home.html';	
    })
    
    // go to all items
	$('.allItems').on('click', function() { 
		window.location.href = 'test.html';	
	})


});