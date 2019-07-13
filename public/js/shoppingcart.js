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

function popupConfirmation() {
  var total = populateProducts($(".modal-products"), false);
  $(".modal-total").text(
    "Total $" +
      total.toLocaleString() +
      " / ₿" +
      (total / bitcoinRate).toFixed(4)
  );
  $("#confirm-modal").modal({ backdrop: "static", keyboard: false });
}

$(".btn-modal-close").on("click", function(event) {
  $("#confirm-modal").modal("hide");
  window.location.replace("/cart");
});

$("#cart-btn-clear").on("click", function(event) {
  localStorage.clear();
  window.location.replace("/cart");
});

function updateDatabaseAfterPurchase() {
  // save to database. then display confirmation page.
  $.ajax("/api/orders", {
    type: "POST",
    data: {
      order: myCart
    }
  })
    .then(function(data) {
      // Reload the page to get the updated list
      localStorage.clear();
      window.location.replace("/cart");
    })
    .catch(function(error) {
      console.log(error.status);

      if (error.status === 401) {
        // user not log in yet
        window.location.replace("/login");
      } else if (error.status === 601) {
        // out of stock
        var outList = error.responseJSON;
        for (var i = 0; i < outList.length; i++) {
          if (outList[i].numItems > 0) {
            $("#text-out" + outList[i].id).text(
              "Only " + outList[i].numItems + " left in Stock!"
            );
          } else {
            $("#text-out" + outList[i].id).text("Out of Stock!");
          }
        }
      }
    });
}

$(".btn-usd").on("click", function(event) {
  updateDatabaseAfterPurchase();
});

$(".btn-bitcoin").on("click", function(event) {
  updateDatabaseAfterPurchase();
});

$("#cart-btn-checkout").on("click", function(event) {
  popupConfirmation();
});

$("#cart-btn-continue").on("click", function(event) {
  window.location.replace("/");
});
function populateProducts(parentElem, isCartPage) {
  var newRow;
  var pName, pImg, pPrice, pUnits, pDelete;
  var btnDelete, imgElem;

  var total = 0;
  for (var i = 0; i < myCart.length; i++) {
    total += myCart[i].price * myCart[i].numItems;
    newRow = $("<div>")
      .addClass("row")
      .attr("item-id", myCart[i].id);
    pName = $("<div>")
      .addClass("col cart-item-name")
      .text(myCart[i].name);

    if (isCartPage) {
      imgElem = $("<img>")
        .addClass("cart-item-image img-fluid")
        .attr("src", myCart[i].image);
      pImg = $("<div>")
        .addClass("col")
        .append(imgElem);
    }

    pPrice = $("<div>").addClass("col");
    pPrice.append($("<p>").text("$" + myCart[i].price.toLocaleString()));
    pPrice.append(
      $("<p>").text("₿" + (myCart[i].price / bitcoinRate).toFixed(4))
    );

    pUnits = $("<div>").addClass("col");
    pUnits.append($("<p>").text(myCart[i].numItems));
    var pElem = $("<p>").addClass("text-out");
    pElem.attr("id", "text-out" + myCart[i].id);
    pUnits.append(pElem);

    if (isCartPage) {
      btnDelete = $("<button>")
        .addClass("btn-cart-delete")
        .attr("data-productId", myCart[i].id)
        .text("delete");
      pDelete = $("<div>")
        .addClass("col")
        .append(btnDelete);

      newRow.append(pName, pImg, pPrice, pUnits, pDelete);
    } else {
      newRow.append(pName, pPrice, pUnits);
    }
    parentElem.append(newRow, $("<hr>"));
  }
  return total;
}

var bitcoinRate = 0;
function getCart() {
  // if not a shopping cart page, do nothing.
  if (!document.getElementById("cart-page")) {
    return;
  }

  if (myCart.length === 0) {
    // cart empty
    $("#cart-page").append("<h2>Empty Cart<h2>");
    $(".cart-total").hide();
    $("#cart-btn-checkout").hide();

    return;
  }

  $(".cart-total").show();
  $("#cart-btn-checkout").show();

  // Fetch latest bitcoin rate then render shopping cart page in the callback
  fetch("https://bitpay.com/api/rates") // Call the fetch function passing the url of the API as a parameter
    .then(resp => resp.json())
    .then(function(data) {
      // Your code for handling the data you get from the API
      bitcoinRate = data[3].rate;
      total = populateProducts($("#cart-page"), true);

      $(".cart-total").text(
        "Total $" +
          total.toLocaleString() +
          " / ₿" +
          (total / bitcoinRate).toFixed(4)
      );
    }) // End of api call
    .catch(function(error) {
      // This is where you run code if the server returns any errors
      console.log("Sorry there was an error " + error);
    });
}
