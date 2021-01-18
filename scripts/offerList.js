$(document).ready(function() {

	
	fetchData()

	// Fetch offer items Data
	function fetchData() {
	$.getJSON("https://api.jsonbin.io/b/6004bac14f42973a289e26a7", function(data) {
			var item_data = '';
			$.each(data, function(key, value) {
			if (value.offer =="true") {
					item_data += '<li name='+value.name+' data-keyword='+value.label+' item-price='+value.price+' category='+value.category+'>';
					item_data += '<div href=# class=items id=items>';
					item_data += '<img src=' +value.image_url+' class="itemImage temp" id="itemImage">';
					item_data += '<div class="item_details" id="item_details">';
					item_data += '<h4>'+value.name+'</h4>';
					item_data += '<p>'+value.short_description;
					item_data +=  '</br> <strike>'+'$'+value.price+'</strike>'+'&nbsp;&nbsp;'+value.offer_percentage + ' Off';
					item_data +=  '</br><strong> '+'$'+value.offer_price+'</strong></br>';
					for (var i = 0; i <value.rating; i++) {
					item_data += '<i class="material-icons  rating">star</i>';
					}
					item_data +=  '</p>';
					item_data += '<p><i class="material-icons ui-enabled">add_shopping_cart</i>';

					// check if the item is favourite or not
					if (value.favourite == "true") {
					item_data += '<i class="material-icons ui-enabled favorite favorite_True cartBtn">favorite</i></p>';
					}else{
						item_data += '<i class="material-icons ui-enabled favorite favorite_False">favorite</i></p>';
					}
					
					item_data += '</div>';
					item_data += '</div>';
					item_data += '</li>';

				}
				
			});
			$('#offer_list').append(item_data);
			$("#displayToast").popup(); 
		});
	}

	$('.offer_Image .back_btn').on('click', function() { 
		window.location.href = 'home_page.html';	
	})

	// Sort By Item Name
	$('#offers_Page .sortByName').on('click', function() { 
		// Removing sort by price
		$('.sortByPrice').removeClass('SortedAsc');
		$('.sortByPrice').removeClass('SortedDsc');
		$('.sortByPrice').addClass('sortMe');

		// Ascending
		if ($("#sortName").hasClass("sortMe")) {
			$(".offer_list li").sort(sort_li).appendTo('.offer_list');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) < ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort descending
			$('.sortByName').removeClass('sortMe');
			$('.sortByName').addClass('SortedAsc');
			$('#offers_Page .SortedAsc').css("background-color", " #c5c9ce")
			$('#offers_Page .SortedAsc').css("color", "#092C4C")
		}else if ($("#sortName").hasClass("SortedAsc")){
			// Descnding
			$(".offer_list li").sort(sort_li).appendTo('.offer_list');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) > ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort ascending
			$('.sortByName').removeClass('SortedAsc');
			$('.sortByName').addClass('SortedDsc');
		}else if ($("#sortName").hasClass("SortedDsc")){
			// default
			$('.offer_list li').remove()
			fetchData();
			$('.sortByName').removeClass('SortedDsc');
			$('.sortByName').addClass('sortMe');
		}		
	});	
	

	// Sort by Price
	$('#offers_Page .sortByPrice').on('click', function() { 
		
		// Removing sort by name
		$('.sortByName').removeClass('SortedAsc');
		$('.sortByName').removeClass('SortedDsc');
		$('.sortByName').addClass('sortMe');

		// Ascending
		if ($("#sortPrice").hasClass("sortMe")) {
			$(".offer_list li").sort(sort_li).appendTo('.offer_list');
			function sort_li(a, b) {

				var an = $(a).attr("item-price");
				var bn = $(b).attr("item-price");
				var numberA = Number(an.replace(/[^0-9\.]+/g, ""));
				var numberB = Number(bn.replace(/[^0-9\.]+/g, ""));
				return numberB - numberA;
			}

			// To enable sort descending
			$('.sortByPrice').removeClass('sortMe');
			$('.sortByPrice').addClass('SortedAsc');

			$('#offers_Page .SortedAsc').css("background-color", " #c5c9ce")
			$('#offers_Page .SortedAsc').css("color", "#092C4C")

		}else if ($("#sortPrice").hasClass("SortedAsc")){
			// Descending
			$(".offer_list li").sort(sort_li).appendTo('.offer_list');
			function sort_li(a, b) {

				var an = $(a).attr("item-price");
				var bn = $(b).attr("item-price");
				var numberA = Number(an.replace(/[^0-9\.]+/g, ""));
				var numberB = Number(bn.replace(/[^0-9\.]+/g, ""));
				return numberA - numberB;
			}
			// To enable sort ascending
			$('.sortByPrice').removeClass('SortedAsc');
			$('.sortByPrice').addClass('SortedDsc');
		}else if ($("#sortPrice").hasClass("SortedDsc")){
			// default
			$('.offer_list li').remove()
			fetchData();
			$('.sortByName').removeClass('SortedDsc');
			$('.sortByName').addClass('sortMe');
		}	
	});	



	// Trigger toast
	$('.offer_list').on('click','.favorite_False', function () {	
		displayToast('success', 'Added To Favourites')
	});


		// Trigger toast
	$('.offer_list').on('click','.favorite_True', function () {	
		displayToast('warning', 'Removed From Favourites')
	});

	
	// display toast
	function displayToast(messageType, message) {

		if(messageType=="success"){
			$('#offers_Page #displayToast').css("background-color", "rgb(79, 196, 79)")
		}else if(messageType=="error"){
			$('#offers_Page #displayToast').css("background-color", "rgb(204, 73, 73)")
		}else if(messageType=="warning"){
			$('#offers_Page #displayToast').css("background-color", "rgb(219, 158, 45)")
		}
		
	$("#offers_Page #displayToast").html('<p> '+message+' </p>');
	$("#offers_Page #displayToast").popup(); 
	$("#offers_Page #displayToast").popup("open"); 
	setTimeout(function(){  $("#offers_Page #displayToast").popup("close"); }, 1000); 
}

});