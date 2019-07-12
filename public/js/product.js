// retrieve shopping cart form local storage;
var myCart = JSON.parse(localStorage.getItem("mycart"));
if (!myCart) {
  myCart = [];
}

function handlePurchaseButton(e) {
  e.preventDefault();
  var transaction = {
    id: parseInt($(this).attr("productid")),
    name: $(this)
      .parent()
      .children("h2.card-title")
      .text(),
    image: $(this)
      .parent()
      .children("img")
      .attr("src"),
    price: parseInt(
      $(this)
        .parent()
        .children("p.price")
        .attr("value")
    ),
    numItems: parseInt(
      $(this)
        .parent()
        .find("#num-items").val())
  };
  myCart.push(transaction);
  localStorage.setItem("mycart", JSON.stringify(myCart));
}

// Add event listeners to the submit and delete buttons
$(".btn-purchase").on("click", handlePurchaseButton);
