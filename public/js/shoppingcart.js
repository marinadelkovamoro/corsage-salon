var myCart = JSON.parse(localStorage.getItem("mycart"));
if (!myCart) {
  myCart = [];
}

var currentRate;

function fetchBitcoin() {
  $.get("https://bitpay.com/api/rates")
    .then(data => {
      console.log("====================================================");
      currentRate = data[2].rate;
      // BITCOIN = $11,622;
      // DOLLAR = 1 / 11622
      console.log(data[2].rate);
    })
    .catch(error => {
      console.log(error);
    });
}
fetchBitcoin();
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
  console.log(myCart);
  $.ajax("/api/orders", {
    type: "POST",
    data: {
      order: myCart
    }
  })
    .then(function (data) {
      // Reload the page to get the updated list
      console.log(data);
    })
    .catch(function (error) {
      if (error.status === 401) {
        // user not log in yet
        window.location.replace("/login");
      }
    });
});

$("#cart-btn-continue").on("click", function(event) {
  window.location.replace("/");
});

function getCart() {
  // if not a shopping cart page, do nothing.
  if (!document.getElementById("cart-page")) {
    return;
  }

  console.log(myCart);
  // Fetch latest bitcoin rate then render shopping cart page in the callback
  fetch("https://bitpay.com/api/rates") // Call the fetch function passing the url of the API as a parameter
    .then(resp => resp.json())
    .then(function(data) {
      // Your code for handling the data you get from the API
      console.log("Received data!");
      let bitcoinRate = data[3].rate;
      console.log(bitcoinRate);

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

        bPrice = $("<div>").addClass("col");
        bPrice.append(
          $("<p>").text("₿" + (myCart[i].price / bitcoinRate).toFixed(4))
        );
        // pPrice.append($("<p>").text("₿" + calculateBitcoin(myCart[i].price)));

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

        newRow.append(pName, pImg, pPrice, bPrice, pUnits, pDelete);
        cartPage.append(newRow, $("<hr>"));
      }
      $(".cart-total").text(
        "Total $" +
          total.toLocaleString() +
          " / ₿" +
          (total / bitcoinRate).toFixed(4)
      );
    }) // End of api call
    .catch(function (error) {
      // This is where you run code if the server returns any errors
      console.log("Sorry there was an error " + error);
    });
}
