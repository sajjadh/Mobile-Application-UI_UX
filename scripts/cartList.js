$(document).ready(function() {

    // Fetch item Data
    $.getJSON("https://api.jsonbin.io/b/60006d4af98f6e35d5fc7bdb/6", function(data) {
        var item_data = '';
        // var isEmpty = 'true';
        // $.each(data, function (key, value) {
        // 	if (value.addedToCart == "true") {
        // 		item_data += '<li data-keyword=' + value.label + ' item-price=' + value.price + 'category=' + value.category + '>';
        // 		item_data += '<div href=# class=items id=items>';
        // 		item_data += '<input type="checkbox" name="" class="checkBox" id="checkBox" >';
        // 		item_data += '<img src=' + value.image_url + ' class="itemImage" id="itemImage" >';
        // 		item_data += '<div class="item_details" id="item_details">';
        // 		item_data += '<h4>' + value.name + '</h4>';
        // 		item_data += '<p>' + value.short_description + '</br>';
        // 		item_data += value.price + '</br>';
        // 		item_data += '<i class="material-icons delete">delete</i></p>';
        // 		item_data += '</div>';
        // 		item_data += '</div>';
        // 		item_data += '</li>';

        // 		isEmpty = 'false';
        // 		$('#checkBox').prop('checked');
        // 	}

        // });
        // $('#cart_itemList').append(item_data);

        var item_data = ''
        if (($("#favourite_itemList li").length == 0)) {
            item_data += '<h4 class="emptyMessage">Uh No!, No Items Saved</h4>';
            $('#favourite_itemList').append(item_data);
        }
    });


    // remove item FROM Cart PAGE
    $('.cart_itemList').on('click', '.delete', function() {
        // Getting the datakeyword of clicked item
        var tempt = $(this).closest('li').attr('data-keyword');
        alert("Cliskedvjebj")

        $('.cart_itemList li[data-keyword=' + tempt + ']').remove()

        alert('you clicked on button #' + tempt);

        //Display message when all items a removed
        var item_data = ''
        if (($("#cart_itemList li").length == 0)) {
            item_data += '<h4>Uh No!, No Items</h4>';
            $('#cart_itemList').append(item_data);
        }

    })


    $('.buttonCheck').on('click', function() {
        window.location.href = 'checkout.html';
    })

    // Trigger toast
    $('#all_Items .itemList').on('click', '.delete', function() {
        displayToast('Success', 'Removed from Cart')
    });

    // display toast
    function displayToast(messageType, message) {

        if (messageType == "success") {
            $('#all_Items #displayToast').css("background-color", "rgb(79, 196, 79)")
        } else if (messageType == "error") {
            $('#all_Items #displayToast').css("background-color", "rgb(204, 73, 73)")
        } else if (messageType == "warning") {
            $('#all_Items #displayToast').css("background-color", "rgb(219, 158, 45)")
        }

        $("#all_Items #displayToast").html('<p> ' + message + ' </p>');
        $("#all_Items #displayToast").popup();
        $("#all_Items #displayToast").popup("open");
        setTimeout(function() { $("#all_Items #displayToast").popup("close"); }, 1000);
    }

});