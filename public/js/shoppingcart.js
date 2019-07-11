
// retrieve shopping cart form local storage;
var myCart = JSON.parse(localStorage.getItem("mycart"));
if (!myCart) {
    myCart = {};
}

