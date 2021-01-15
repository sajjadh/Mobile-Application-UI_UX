$(document).ready(function() {

	fetchData();

	// Fetch Fvaourite item Data
	function fetchData() {
	$.getJSON("https://api.jsonbin.io/b/60006d4af98f6e35d5fc7bdb/1", function(data) {
		var item_data = '';
		var isEmpty = 'true'; 
		$.each(data, function(key, value) {
			if (value.favourite == "true") {
				item_data += '<li name='+value.name+' data-keyword='+value.label+' item-price='+value.price+' category='+value.category+'>';
				item_data += '<div href=# class=items id=items>';
				item_data += '<input type="checkbox" class="checkBox" name='+value.label+'  id='+value.label+'>';
				item_data += '<img src=' +value.image_url+' class="itemImage" id="itemImage" >';
				item_data += '<div class="item_details" id="item_details">';
				item_data += '<h4>'+value.name+'</h4>';
				item_data += '<p>'+value.short_description+'</br>';
				item_data += '$'+value.price+'</br>';
				// Iterating the number of stars
				for (var i = 0; i <value.rating; i++) {
				item_data += '<i class="material-icons  rating">star</i>';
				}
				item_data +=  value.rating_count+'</p>';
				item_data += '<p><i data-role="button" class="material-icons ui-enabled cartBtn">add_shopping_cart</i>';
				item_data += '<i class="material-icons ui-enabled favorite favorite_True">favorite</i></p>';	
				item_data += '</div>';
				item_data += '</div>';
				item_data += '</li>';

				isEmpty = 'false';
				$('#checkBox').prop('checked');
			}

		});
		$('#favourite_itemList').append(item_data);
	});
	}

// remove favourite item FROM FAVOURITE PAGE
	$('.favourite_itemList').on('click','.favorite_True', function () {	
		// Getting the datakeyword of clicked item
		var tempt = $(this).closest('li').attr('data-keyword'); 
		// getting the element based on data keyword
		var tempt2 = $('.favourite_itemList li[data-keyword='+tempt+']')

		$('.itemList li[data-keyword='+tempt+'] div div .favorite').removeClass('favorite_True')
		$('.itemList li[data-keyword='+tempt+'] div div .favorite').addClass('favorite_False')

		$('.offer_list li[data-keyword='+tempt+'] div div .favorite').removeClass('favorite_True')
		$('.offer_list li[data-keyword='+tempt+'] div div .favorite').addClass('favorite_False')

		$('.favourite_itemList li[data-keyword='+tempt+']').remove()

   		// alert('you clicked on button #' + tempt);	

   		//Display message when all favourite items a re removed
   		var item_data = ''
		if (($("#favourite_itemList li").length==0)) {
				item_data += '<h4 class="emptyMessage">Uh No!, No Items</h4>';
				$('#favourite_itemList').append(item_data);
			}

			displayToast('warning', 'Item Removed')

	})



	// Enable disable email button function
	$('.favourite_itemList').on('click','.checkBox', function () {
		if($('.checkBox').is(':checked')){
			$('#email_btn').removeClass('ui-disabled');
		}else{
			$('#email_btn').addClass('ui-disabled');
		}
	})


		// Enable disable email button function
	$('.favourite_itemList').on('click','.checkBox', function () {
		if($('.checkBox').is(':checked')){
			$('#email_btn').removeClass('ui-disabled');
		}else{
			$('#email_btn').addClass('ui-disabled');
		}
	})

	
	// Sort By Item Name
	$('#favourites_Page .sortByName').on('click', function() { 
		alert('test')

		// Ascending
		if ($("#sortName").hasClass("sortMe")) {
			$(".favourite_itemList li").sort(sort_li).appendTo('.favourite_itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) < ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort descending
			$('.sortByName').removeClass('sortMe');
			$('.sortByName').addClass('sortedAsc');
		}else if ($("#sortName").hasClass("sortedAsc")) {
			// Descnding
			$(".favourite_itemList li").sort(sort_li).appendTo('.favourite_itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) > ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort ascending
			$('.sortByName').removeClass('sortedAsc');
			$('.sortByName').addClass('sortedDec');
		}else{
			$('.sortByName').removeClass('sortedDec');
			$('.sortByName').addClass('sortMe');
		}	
	});	
	
	

	// Sort by Price
	$('#favourites_Page .sortByPrice').on('click', function() { 
		alert('test')

		// Ascending
		if ($("#sortPrice").hasClass("sortMe")) {
			$(".favourite_itemList li").sort(sort_li).appendTo('.favourite_itemList');
			function sort_li(a, b) {

				var an = $(a).attr("item-price");
				var bn = $(b).attr("item-price");
				var numberA = Number(an.replace(/[^0-9\.]+/g, ""));
				var numberB = Number(bn.replace(/[^0-9\.]+/g, ""));
				return numberB - numberA;
			}
			// To enable sort descending
			$('.sortByPrice').removeClass('sortMe');
			$('.sortByPrice').addClass('sortedAsc');

		}else if ($("#sortPrice").hasClass("sortedAsc")){
			// Descending
			$(".favourite_itemList li").sort(sort_li).appendTo('.favourite_itemList');
			function sort_li(a, b) {

				var an = $(a).attr("item-price");
				var bn = $(b).attr("item-price");
				var numberA = Number(an.replace(/[^0-9\.]+/g, ""));
				var numberB = Number(bn.replace(/[^0-9\.]+/g, ""));
				return numberA - numberB;
			}
			// To enable sort ascending
			$('.sortByPrice').removeClass('sortedAsc');
			$('.sortByPrice').addClass('sortedDec');
		}else{
			$('.sortByPrice').removeClass('sortedDec');
			$('.sortByPrice').addClass('sortMe');
		}
	});	


	// // // Quick search for all items/deals page
	// $("#searchItem").on("keyup",function (){
	// 	$("ul li").hide()
	// 	var current_query = $("#searchItem").val().toUpperCase();

	// 	$("ul li").each(function(){
	// 		var current_keyword = $(this).attr("name").toUpperCase();

	// 		if (current_keyword.indexOf(current_query) >=0) {
	// 			$(this).show();
	// 		}
	// 	})	
	// })

	// $('#favourites_Page #temp').on('click', function() { 
	// 	alert('temp')
	// 	})	

		// display success toast
		function displayToast(messageType, message) {

			if(messageType=="success"){
				$('#favourites_Page #displayToast').css("background-color", "rgb(79, 196, 79)")
			}else if(messageType=="error"){
				$('#favourites_Page #displayToast').css("background-color", "rgb(204, 73, 73)")
			}else if(messageType=="warning"){
				$('#favourites_Page #displayToast').css("background-color", "rgb(219, 158, 45)")
			}
			
		$("#favourites_Page #displayToast").html('<p> '+message+' </p>');
		$("#favourites_Page #displayToast").popup(); 
		$("#favourites_Page #displayToast").popup("open"); 
		setTimeout(function(){  $("#favourites_Page #displayToast").popup("close"); }, 1200); 
	}


});