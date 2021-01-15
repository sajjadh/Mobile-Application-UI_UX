$(document).ready(function() {

	// Fetch offer items Data
$.getJSON("https://api.jsonbin.io/b/60006d4af98f6e35d5fc7bdb/1", function(data) {
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
				item_data +=  '</br>'+'$'+value.offer_price+'</br>';
				for (var i = 0; i <value.rating; i++) {
				item_data += '<i class="material-icons  rating">star</i>';
				}
				item_data +=  value.rating_count+'</p>';
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


	// Sort By Item Name
	$('#offers_Page .sortByName').on('click', function() { 
		alert('test')

		// Ascending
		if ($("#sortName").hasClass("SortNameAsc")) {
			$(".itemList li").sort(sort_li).appendTo('.itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) < ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort descending
			$('.sortByName').removeClass('SortNameAsc');
			$('.sortByName').addClass('SortNameDes');
		}else{
			// Descnding
			$(".itemList li").sort(sort_li).appendTo('.itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) > ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort ascending
			$('.sortByName').removeClass('SortNameDes');
			$('.sortByName').addClass('SortNameAsc');
		}	
	});	
	
	

	// Sort by Price
	$('#offers_Page .sortByPrice').on('click', function() { 
		alert('test')

		// Ascending
		if ($("#sortName").hasClass("SortPriceAsc")) {
			$(".offer_list li").sort(sort_li).appendTo('.offer_list');
			function sort_li(a, b) {

				var an = $(a).attr("item-price");
				var bn = $(b).attr("item-price");
				var numberA = Number(an.replace(/[^0-9\.]+/g, ""));
				var numberB = Number(bn.replace(/[^0-9\.]+/g, ""));
				return numberB - numberA;
			}
			// To enable sort descending
			$('.sortByName').removeClass('SortPriceAsc');
			$('.sortByName').addClass('SortPriceDes');
		}else{
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
			$('.sortByName').removeClass('SortPriceDes');
			$('.sortByName').addClass('SortPriceAsc');
		}
	});	



});