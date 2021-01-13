$(document).ready(function() {

	// Fetch offer items Data
$.getJSON("https://api.jsonbin.io/b/5ffe73568aa7af359da96351/17", function(data) {
		var item_data = '';
		$.each(data, function(key, value) {
		if (value.offer =="true") {
				item_data += '<li data-keyword='+value.label+' item-price='+value.price+'category='+value.category+'>';
				item_data += '<div href=# class=items id=items>';
				item_data += '<img src=' +value.image_url+' class="itemImage temp" id="itemImage">';
				item_data += '<div class="item_details" id="item_details">';
				item_data += '<h4>'+value.name+'</h4>';
				item_data += '<p>'+value.short_description;
				item_data +=  '</br> <strike>'+value.price+'</strike>'+'&nbsp;&nbsp;'+value.offer_percentage + ' Off';
				item_data +=  '</br>'+value.offer_price+'</br>';
				for (var i = 0; i <value.rating; i++) {
				item_data += '<i class="material-icons  rating">star</i>';
				}
				item_data +=  value.rating_count;
				// check if the item is favourite or not
				if (value.favourite == "true") {
				item_data += '<i class="material-icons ui-enabled favorite favorite_True">favorite</i></p>';
				}else{
					item_data += '<i class="material-icons ui-enabled favorite favorite_False">favorite</i></p>';
				}
				
				item_data += '</div>';
				item_data += '</div>';
				item_data += '</li>';

			}
			
		});
		$('#offer_list').append(item_data);

	});



});