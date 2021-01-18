$(document).ready(function () {

	fetchData();

	function fetchData() {
		$.getJSON("https://api.jsonbin.io/b/60006d4af98f6e35d5fc7bdb/6", function(data) {
			var item_data = '';
			$.each(data, function(key, value) {
					var dataLabel = value.name;

					item_data += '<li name='+value.name+' data-keyword='+value.label+' item-price='+value.price+' category='+value.category+'>';
					item_data += '<div href=# class=items id=items>';
					item_data += '<img src=' +value.image_url+' class="itemImage temp" id="itemImage">';
					item_data += '<div class="item_details" id="item_details">';
					item_data += '<h4>'+value.name+'</h4>';
					item_data += '<p>'+value.short_description+'</br>';
					item_data += '$'+value.price+'</br>';
					// Iterating the number of stars
					for (var i = 0; i <value.rating; i++) {
					item_data += '<i class="material-icons  rating">star</i>';
					}
					
					item_data +=  '</p>';
					item_data += '<p><i class="material-icons ui-enabled cartBtn">add_shopping_cart</i>';
						// check if the item is favourite or not
					if (value.favourite == "true") {
						item_data += '<i class="material-icons ui-enabled favorite favorite_True">favorite</i></p>';
					}else{
						item_data += '<i class="material-icons ui-enabled favorite favorite_False">favorite</i></p>';
					}
					
					item_data += '</div>';
					item_data += '</div>';
					item_data += '</li>';
				
			});
			$('#itemList').append(item_data);

		});
	}	
// adding favourite item from ALL ITEMS PAGE & OFFERS PAGE
	$('.itemList, .offer_list').on('click','.favorite_False', function () {	

		//Remove message when a favourite item is added
		$('.favourite_itemList .emptyMessage').remove()

		// Getting the data keyword of clicked item
		var tempt = $(this).closest('li').attr('data-keyword'); 
		// getting the element based on data keyword
		var tempt2 = $('.itemList li[data-keyword='+tempt+']')

		$('.itemList li[data-keyword='+tempt+'] div div .favorite').removeClass('favorite_False')
		$('.itemList li[data-keyword='+tempt+'] div div .favorite').addClass('favorite_True')

		$('.offer_list li[data-keyword='+tempt+'] div div .favorite').removeClass('favorite_False')
		$('.offer_list li[data-keyword='+tempt+'] div div .favorite').addClass('favorite_True')


		// cloning the element
		var tempt3 = tempt2.clone();

		// create div and checkbox
		var ele = document.createElement('div')
		ele.innerHTML = ('<input type ="checkbox"  class = "checkBox" name="type" id ='+tempt+'>')
		
		$('#checkBox').prop('checked', false);

		// append
		$('.favourite_itemList').append(tempt3)
		$(ele).insertBefore(".favourite_itemList .temp")	

		//add class and remove itemList class
		$('.favourite_itemList li[data-keyword='+tempt+'] div div').addClass('ui-checkbox')
		$('.favourite_itemList li[data-keyword='+tempt+'] img').removeClass('temp');


		// alert( "Size: " + $(this.li).size() + 10 );
		var clickedBtnID = $('#tempt').attr("data-keyword"); 
   		// alert('you clicked on button #' + tempt);	

	})

	// Trigger toast
	$('#all_Items .itemList').on('click','.favorite_False', function () {	
		displayToast('success', 'Added To Favourites')
		// alert('test1')
	});


		// Trigger toast
	$('#all_Items .itemList').on('click','.favorite_True', function () {	
		displayToast('warning', 'Removed From Favourites')
		// alert('test2')
	});


// remove favourite item from ALL ITEMS PAGE & OFFERS PAGE
	$('.itemList, .offer_list').on('click','.favorite_True', function () {	
		// Getting the datakeyword of clicked item
		var tempt = $(this).closest('li').attr('data-keyword'); 
		// getting the element based on data keyword
		var tempt2 = $('.itemList li[data-keyword='+tempt+']')

		$('.itemList li[data-keyword='+tempt+'] div div .favorite').removeClass('favorite_True')
		$('.itemList li[data-keyword='+tempt+'] div div .favorite').addClass('favorite_False')

		$('.offer_list li[data-keyword='+tempt+'] div div .favorite').removeClass('favorite_True')
		$('.offer_list li[data-keyword='+tempt+'] div div .favorite').addClass('favorite_False')


		$('.favourite_itemList li[data-keyword='+tempt+']').remove()
	
   		//Display message when all favourite items a re removed
   		var item_data = ''
		if (($("#favourite_itemList li").length==0)) {
				item_data += '<h4 class="emptyMessage" >Uh No!, No Saved Items</h4>';
				$('#favourite_itemList').append(item_data);
			}
	})



	// display toast
	function displayToast(messageType, message) {

		if(messageType=="success"){
			$('#all_Items #displayToast').css("background-color", "rgb(79, 196, 79)")
		}else if(messageType=="error"){
			$('#all_Items #displayToast').css("background-color", "rgb(204, 73, 73)")
		}else if(messageType=="warning"){
			$('#all_Items #displayToast').css("background-color", "rgb(219, 158, 45)")
		}
		
	$("#all_Items #displayToast").html('<p> '+message+' </p>');
	$("#all_Items #displayToast").popup(); 
	$("#all_Items #displayToast").popup("open"); 
	setTimeout(function(){  $("#all_Items #displayToast").popup("close"); }, 1000); 
}


	
	// Sort By Item Name
	$('#all_Items .sortByName').on('click', function() { 
		// Removing sort by price
		$('.sortByPrice').removeClass('SortedAsc');
		$('.sortByPrice').removeClass('SortedDsc');
		$('.sortByPrice').addClass('sortMe');

		// Ascending
		if ($("#sortName").hasClass("sortMe")) {
			$(".itemList li").sort(sort_li).appendTo('.itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) < ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort descending
			$('.sortByName').removeClass('sortMe');
			$('.sortByName').addClass('SortedAsc');
			$('#all_Items .SortedAsc').css("background-color", " #c5c9ce")
			$('#all_Items .SortedAsc').css("color", "#092C4C")
		}else if ($("#sortName").hasClass("SortedAsc")){
			// Descnding
			$(".itemList li").sort(sort_li).appendTo('.itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) > ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort ascending
			$('.sortByName').removeClass('SortedAsc');
			$('.sortByName').addClass('SortedDsc');
		}else if ($("#sortName").hasClass("SortedDsc")){
			// default
			$('#all_Items li').remove()
			fetchData();
			$('.sortByName').removeClass('SortedDsc');
			$('.sortByName').addClass('sortMe');
		}		
	});	
	
	

	// Sort by Price
	$('#all_Items .sortByPrice').on('click', function() { 
		
		// Removing sort by name
		$('.sortByName').removeClass('SortedAsc');
		$('.sortByName').removeClass('SortedDsc');
		$('.sortByName').addClass('sortMe');

		// Ascending
		if ($("#sortPrice").hasClass("sortMe")) {
			$(".itemList li").sort(sort_li).appendTo('.itemList');
			function sort_li(a, b) {

				var an = $(a).attr("item-price");
				var bn = $(b).attr("item-price");
				var numberA = Number(an.replace(/[^0-9\.]+/g, ""));
				var numberB = Number(bn.replace(/[^0-9\.]+/g, ""));
				return numberB - numberA;
			}

			// To enable sort descending
			$('#sortPrice').removeClass('sortMe');
			$('#sortPrice').addClass('SortedAsc');

			$('#all_Items .SortedAsc').css("background-color", " #c5c9ce")
			$('#all_Items .SortedAsc').css("color", "#092C4C")

		}else if ($("#sortPrice").hasClass("SortedAsc")){
			// Descending
			$(".itemList li").sort(sort_li).appendTo('.itemList');
			function sort_li(a, b) {

				var an = $(a).attr("item-price");
				var bn = $(b).attr("item-price");
				var numberA = Number(an.replace(/[^0-9\.]+/g, ""));
				var numberB = Number(bn.replace(/[^0-9\.]+/g, ""));
				return numberA - numberB;
			}
			// To enable sort ascending
			$('#sortPrice').removeClass('SortedAsc');
			$('#sortPrice').addClass('SortedDsc');
		}else if ($("#sortPrice").hasClass("SortedDsc")){
			// default
			$('.itemList li').remove()
			fetchData();
			$('.sortByName').removeClass('SortedDsc');
			$('.sortByName').addClass('sortMe');
		}
		
	});	
	// Quick search for all items/deals page
	$(".search").on("keyup",function (){
		$("ul li").hide()
		var current_query = $(".search").val().toUpperCase();

		$("ul li").each(function(){
			var current_keyword = $(this).attr("name").toUpperCase();
			var current_keyword_2 = $(this).attr("category").toUpperCase();
			
			if ((current_keyword.indexOf(current_query) >=0) || (current_keyword_2.indexOf(current_query) >=0)) {
				$(this).show();
			}		
		})
	})

	$('#fav').on('click', function() { 
		window.location.href = 'test.html#favourites_Page';	
	})

});