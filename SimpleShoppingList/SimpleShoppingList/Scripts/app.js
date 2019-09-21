$(document).ready(function () {
    console.log("ready");
    var pageurl = window.location.href;
    var idIndex = pageurl.indexOf("?id=");
    $("#newShoppingListName").focus();
    $("#newShoppingListName").keyup(function (event) {
        if (event.keyCode == 13) {
            createShoppingList();
        }
    }
    );

    
    if (idIndex != -1) {
        getShoppingListById(pageurl.substr(idIndex+4));
    }
});

var currentList = {};
function getShoppingListById(id) {
    //currentList.Items = [
    //    { name: "Milk" }
    //];
    //showShoppinnList();
    //drawItems();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingList/" + id,
        success: function (result) {
            currentList = result;
            showShoppinnList();
            drawItems();
        },
        error: alert("Something went wrong")

    });

}
function showShoppinnList() {
    //Web service call
    $("#ShoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();
    $("#createListDiv").hide();
    $("#shoppingListDiv").show();
}
function createShoppingList() {
    currentList.Name = $("#newShoppingListName").val();
    currentList.items = new Array();

    //currentList.keyup(function (event) {
    //    if (event.keyCode == 13) {
    //        AddItems();
    //    }
    //}
    //);
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingList/",
        data: currentList,
        success: function (result) {
           // currentList = result;
            showShoppinnList();
            //drawItems();
        },
        error: alert("Something went wrong")

    });

    //showShoppinnList();

}
function AddItems() {
    var newItem = {};
    newItem.Name = $("#newItems").val();
    currentList.items.push(newItem);
    drawItems();
}
function drawItems() {
    var $list = $("#shoppingListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $dltbtn = $("<button onClick='deleteItem("+i+")'>Delete</button>").appendTo($li);
        var $addbtn = $("<button onClick='checkItem(" + i +")'>Add</button>").appendTo($li);
        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
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