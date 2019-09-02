$(document).ready(function () {
    console.log("ready");
});

var currentList = {};
function createShoppingList() {
    currentList.Name = $("#newShoppingListName").val();
    currentList.Items = new Array();

    //Web service call
    $("#ShoppingListTitle").html(currentList.Name);
    $("#shoppingListItems").empty();
    $("#createListDiv").hide();
    $("#shoppingListDiv").show();

}
function AddItems() {
    var newItem = {};
    newItem.Name = $("#newItems").val();
    currentList.Items.push(newItem);
    drawItems();
}
function drawItems() {
    var $list = $("#shoppingListItems").empty();

    for (var i = 0; i < currentList.Items.length; i++) {
        var currentItem = currentList.Items[i];
        var $li = $("<li>").html(currentItem.Name).attr("id", "item_" + i);
        var $dltbtn = $("<button onClick='deleteItem("+i+")'>Delete</button>").appendTo($li);
        var $addbtn = $("<button onClick='checkItem(" + i +")'>Add</button>").appendTo($li);
        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.Items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    }
    else {
        $("#item_" + index).addClass("checked");
    }
  //  drawItems();
}