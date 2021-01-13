$(document).ready(function() {

	// Fetch Fvaourite item Data
	$.getJSON("https://api.jsonbin.io/b/5ffe73568aa7af359da96351/17", function(data) {
		var item_data = '';
		var isEmpty = 'true'; 
		$.each(data, function(key, value) {
			if (value.favourite == "true") {
				item_data += '<li data-keyword='+value.label+' item-price='+value.price+'category='+value.category+'>';
				item_data += '<div href=# class=items id=items>';
				item_data += '<input type="checkbox" name="" class="checkBox" id="checkBox" >';
				item_data += '<img src=' +value.image_url+' class="itemImage" id="itemImage" >';
				item_data += '<div class="item_details" id="item_details">';
				item_data += '<h4>'+value.name+'</h4>';
				item_data += '<p>'+value.short_description+'</br>';
				item_data += value.price+'</br>';
				// Iterating the number of stars
				for (var i = 0; i <value.rating; i++) {
				item_data += '<i class="material-icons  rating">star</i>';
				}
				item_data +=  value.rating_count;
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

   		alert('you clicked on button #' + tempt);	

   		//Display message when all favourite items a re removed
   		var item_data = ''
		if (($("#favourite_itemList li").length==0)) {
				item_data += '<h4>Uh No!, No Items</h4>';
				$('#favourite_itemList').append(item_data);
			}


	})


	// Enable disable email button function
	// $('.checkBox').on('click', function () {
	// 	if($('.checkBox').is(':checked')){
	// 		$('#email_btn').removeClass('ui-disabled');
	// 	}else{
	// 		$('#email_btn').addClass('ui-disabled');
	// 	}
	// });







	// // Quick search for all items/deals page
	$("#searchItem").keyup(function (){
		$("ul li").hide()
		var current_query = $("#searchItem").val().toUpperCase();

		$("ul li").each(function(){
			var current_keyword = $(this).attr("data-keyword").toUpperCase();

			if (current_keyword.indexOf(current_query) >=0) {
				$(this).show();
			}
		})	
	})


	// $(function() {
	//   $("ul li").sort(sort_li).appendTo('ul');
	//   function sort_li(a, b) {
	//   return ($(b).data('keyword')) < ($(a).data('keyword')) ? 1 : -1;
	//   }
	// });

	// $('.favourite_itemList').append("<h2>test</h2>")



});