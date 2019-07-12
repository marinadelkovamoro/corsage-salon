var myCart = JSON.parse(localStorage.getItem("mycart"));
if (!myCart) {
  myCart = [];
}

// remove item from local storage

function removeItemFromCart() {
  var productId = parseFloat($(this).attr("data-productId"));
  // get the array of all products from the local storage
  // run through this array
  const items = JSON.parse(localStorage.getItem("mycart"));
  for (var i = 0; i < items.length; i++) {
    // if the product ids are equal(match), remove it from the array
    if (productId === items[i].id) {
      // update the local storage
      //  at this index, take out one item from the array
      items.splice(i, 1);
    }
  }
  // put the arraw back in local storage
  localStorage.setItem("mycart", JSON.stringify(items));

  // re-render the cart handlebar
  window.location.replace("/cart");
}

$(document).on("click", ".btn-cart-delete", removeItemFromCart);

$("#cart-btn-checkout").on("click", function(event) {
  // save to database. then display confirmation page.
  $.ajax("/api/orders", {
    type: "POST",
    data: {
      order: myCart
    }
  }).then(function() {
    console.log(myCart);
  });
});

$("#cart-btn-continue").on("click", function(event) {
  window.location.replace("/");
});

function getCart() {
  if (!document.getElementById("cart-page")) {
    return;
  }

  var newRow;
  var pName, pImg, pPrice, pUnits, pDelete;
  var btnDelete, imgElem;

  var total = 0;
  var cartPage = $("#cart-page");
  for (var i = 0; i < myCart.length; i++) {
    total += myCart[i].price * myCart[i].numItems;
    newRow = $("<div>")
      .addClass("row")
      .attr("item-id", myCart[i].id);
    pName = $("<div>")
      .addClass("col cart-item-name")
      .text(myCart[i].name);

    imgElem = $("<img>")
      .addClass("cart-item-image img-fluid")
      .attr("src", myCart[i].image);
    pImg = $("<div>")
      .addClass("col")
      .append(imgElem);

    pPrice = $("<div>").addClass("col");
    pPrice.append($("<p>").text("$" + myCart[i].price.toLocaleString()));
    pPrice.append($("<p>").text("Bitcoins"));

    pUnits = $("<div>")
      .addClass("col")
      .text(myCart[i].numItems);

    btnDelete = $("<button>")
      .addClass("btn-cart-delete")
      .attr("data-productId", myCart[i].id)
      .text("delete");
    pDelete = $("<div>")
      .addClass("col")
      .append(btnDelete);

    newRow.append(pName, pImg, pPrice, pUnits, pDelete);
    cartPage.append(newRow, $("<hr>"));
  }
  $(".cart-total").text("Total $" + total.toLocaleString() + " / bitcoin?");
}
