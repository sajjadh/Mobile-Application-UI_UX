$(document).ready(function() {
    var item_data = ''
    if (($("#cart_itemList li").length == 0)) {
        item_data += '<h4 class="emptyMessage">Uh No!, No Items in the cart</h4>';
        $('#cart_itemList').append(item_data);
    }

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