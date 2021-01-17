$(document).ready(function() {

	fetchData();

	// Fetch Fvaourite item Data
	function fetchData() {
	$.getJSON("https://api.jsonbin.io/b/60006d4af98f6e35d5fc7bdb/6", function(data) {
		var item_data = '';
		var isEmpty = 'true'; 
		$.each(data, function(key, value) {
			if (value.favourite == "true") {
				item_data += '<li name='+value.name+' data-keyword='+value.label+' item-price='+value.price+' category='+value.category+' >';
				item_data += '<div href=# class=items id=items>';
				item_data += '<input type="checkbox" class="checkBox" name="type"  id='+value.label+' >';
				item_data += '<img src=' +value.image_url+' class="itemImage" id="itemImage" >';
				item_data += '<div class="item_details" id="item_details">';
				item_data += '<h4 id="title">'+value.name+'</h4>';
				item_data += '<p id="description">'+value.short_description+'</br>';
				item_data += '$'+value.price+'</br>';
				// Iterating the number of stars
				for (var i = 0; i <value.rating; i++) {
				item_data += '<i class="material-icons  rating">star</i>';
				}
				item_data +=  '</p>';
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
				item_data += '<h4 class="emptyMessage">Uh No!, No Items Saved</h4>';
				$('#favourite_itemList').append(item_data);
			}

			displayToast('warning', 'Removed From Favourites')

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
			var name2 = $(this).closest('li').attr('data-keyword');
			// checkedData.pop(name)
		}
	})
	var checkedData = []
	// Getting all checked items
	function getCheckedItems() {			
		$("input:checkbox[name=type]:checked").each(function(){
			checkedData.push($(this).closest('li').attr('data-keyword'));
		});
		console.log("checked items: " + checkedData)			
	}

	var list = []
	// create email body
	$('#email_btn').on('click', function () {
		list = []
		item_data = ''
		checkedData = []
		getCheckedItems(checkedData)
		// console.log("checked Items: " + checkedData)
			$.getJSON("https://api.jsonbin.io/b/60006d4af98f6e35d5fc7bdb/6", function(data) {
			var item_data = '';
			$.each(data, function(key, value) {
			// Iterate throguh checked item and append 
			for(i=0 ; i < checkedData.length; i++){
					if (value.label == checkedData[i]) {

						// console.log("Checked item: " + checkedData[i])
						// console.log("Json item: " + value.label)

						item_data += '<li name='+value.name+' data-keyword='+value.label+' item-price='+value.price+' category='+value.category+' >';

						item_data += '<img src=' +value.image_url+' class="itemImage" id="itemImage" >';
						item_data += '<div class="item_details" id="item_details">';
						item_data += '<h4 id="title">'+value.name+'</h4>';
						item_data += '<p id="description">'+value.short_description+'</br>';
						item_data += '$'+value.price+'</br>';	

						item_data += '</div>';
						item_data += '</li>';

						$('#checkBox').prop('checked');
					}
				}

				});
				list.push(item_data)
				console.log("List items :" +list)
		});

	});


	
	// Sort By Item Name
	$('#favourites_Page .sortByName').on('click', function() { 
		// Removing sort by price
		$('.sortByPrice').removeClass('SortedAsc');
		$('.sortByPrice').removeClass('SortedDsc');
		$('.sortByPrice').addClass('sortMe');

		// Ascending
		if ($("#sortName").hasClass("sortMe")) {
			$(".favourite_itemList li").sort(sort_li).appendTo('.favourite_itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) < ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort descending
			$('.sortByName').removeClass('sortMe');
			$('.sortByName').addClass('SortedAsc');
			$('#favourites_Page .SortedAsc').css("background-color", " #c5c9ce")
			$('#favourites_Page .SortedAsc').css("color", "#092C4C")
		}else if ($("#sortName").hasClass("SortedAsc")){
			// Descnding
			$(".favourite_itemList li").sort(sort_li).appendTo('.favourite_itemList');
			
			function sort_li(a, b) {
			return ($(b).attr("name").toUpperCase()) > ($(a).attr("name").toUpperCase()) ? 1 : -1;
			}
			// To enable sort ascending
			$('.sortByName').removeClass('SortedAsc');
			$('.sortByName').addClass('SortedDsc');
		}else if ($("#sortName").hasClass("SortedDsc")){
			// default
			$('.favourite_itemList li').remove()
			fetchData();
			$('.sortByName').removeClass('SortedDsc');
			$('.sortByName').addClass('sortMe');
		}		
	});	
	
	

	// Sort by Price
	$('#favourites_Page .sortByPrice').on('click', function() { 
		
		// Removing sort by name
		$('.sortByName').removeClass('SortedAsc');
		$('.sortByName').removeClass('SortedDsc');
		$('.sortByName').addClass('sortMe');

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
			$('.sortByPrice').addClass('SortedAsc');

			$('#favourites_Page .SortedAsc').css("background-color", " #c5c9ce")
			$('#favourites_Page .SortedAsc').css("color", "#092C4C")

		}else if ($("#sortPrice").hasClass("SortedAsc")){
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
			$('.sortByPrice').removeClass('SortedAsc');
			$('.sortByPrice').addClass('SortedDsc');
		}else if ($("#sortPrice").hasClass("SortedDsc")){
			// default
			$('.favourite_itemList li').remove()
			fetchData();
			$('.sortByPrice').removeClass('SortedDsc');
			$('.sortByPrice').addClass('sortMe');
		}
		
	});	

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
		setTimeout(function(){  $("#favourites_Page #displayToast").popup("close"); }, 1000); 
	}

	
// Send email poup validation
	$('.emailField').on("change keyup", function () {
		$("#error").text("please enter a valid email");
		dirty = true;
		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if(($(".emailField").val()!="")){
			if($(".emailField").val().match(mailformat)){
				$('.send_btn').removeClass('ui-disabled');
				$("#error").hide()
			}
		}else{
			$('.send_btn').addClass('ui-disabled');
			$("#error").text("please enter a valid email");
		}
})



// Send email when click send
$('#send_btn').on('click', function() { 

	Email.send({
			SecureToken : "4ab601a6-d790-447e-bfd9-0aa73c14bb40",
			To : 'UIUX_CW02@gmail.com',
			From : document.getElementById('emailField').value,
			Subject : "This is the subject",
			Body : '<html><style>.itemList, .favourite_itemList, .offer_list{ display: flex;display: -webkit-flex;flex-direction: column;-webkit-flex-direction:column ;margin-top: 10px;min-width: 100px;font-family:"IBM Plex Sans";transition: width 4s ease-in-out;padding-bottom: 80px;} .items{display: flex;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);background-color: #FFFFFF;margin: 5px;border-radius: 8px;transition: width 4s ease-in-out;padding: 4px;width: 380px;} .itemImage{padding-top: 15px;padding-right:10px;display: flex;transition: width 1s ease-in-out;display: -webkit-flex;flex-direction: row;-webkit-flex-direction:row;}ul{list-style-type: none; padding-left: 0pt;}</style><ul>'+list+'</ul></html>'
		}).then(
	message => alert(message)
	
	);
	displayToast("success", "Email Sent")
});


// //Display message when all favourite items a re removed
// var item_data = ''
// if (($("ul li").length==0)) {
// 		item_data += '<h4 class="emptyMessage" >Uh No!, No Saved Items</h4>';
// 		$('ul').append(item_data);
// }	

	// $('#favourites_Page #temp').on('click', function() { 
	// 	alert('temp')
	// 	})


});