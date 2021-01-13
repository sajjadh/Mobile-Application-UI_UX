
$(document).ready(function () {

	$.getJSON("https://api.jsonbin.io/b/5ffe73568aa7af359da96351/17", function(data) {
		var item_data = '';
		$.each(data, function(key, value) {
				var dataLabel = value.name;

				item_data += '<li data-keyword='+value.label+' item-price='+value.price+'category='+value.category+'>';
				item_data += '<div href=# class=items id=items>';
				item_data += '<img src=' +value.image_url+' class="itemImage temp" id="itemImage">';
				item_data += '<div class="item_details" id="item_details">';
				item_data += '<h4>'+value.name+'</h4>';
				item_data += '<p>'+value.short_description+'</br>';
				item_data += value.price+'</br>';
				// Iterating the number of stars
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
			
		});
		$('#itemList').append(item_data);

	});

// adding favourite item from ALL ITEMS PAGE & OFFERS PAGE
	$('.itemList, .offer_list').on('click','.favorite_False', function () {	
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
		ele.innerHTML = ('<input type ="checkbox" class = "checkBox">')
		
		$('#checkBox').prop('checked', false);

		// append
		$('.favourite_itemList').append(tempt3)
		$(ele).insertBefore(".favourite_itemList .temp")	

		//add class and remove itemList class

		$('.favourite_itemList li[data-keyword='+tempt+'] div div').addClass('ui-checkbox')
		$('.favourite_itemList li[data-keyword='+tempt+'] img').removeClass('temp');


		alert( "Size: " + $(this.li).size() + 10 );
		var clickedBtnID = $('#tempt').attr("data-keyword"); 
   		alert('you clicked on button #' + tempt);	

   		//Remove message when a favourite item is added
   		$('.favourite_itemList h4').remove()

	})


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
	

   		alert('you clicked on button #' + tempt);	

   		//Display message when all favourite items a re removed
   		var item_data = ''
		if (($("#favourite_itemList li").length==0)) {
				item_data += '<h4>Uh No!, No Items</h4>';
				$('#favourite_itemList').append(item_data);
			}

	})


});