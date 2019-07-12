module.exports = {
    calculateBitcoin: function (selected, option) {
        console.log("calculateBitcoin....");
            // async () => {
            // const response = await fetch('https://bitpay.com/api/rates');
            // const myJson = await response.json(); //extract JSON from the http response
            // console.log(JSON.stringify(myJson));
            // var element = document.getElementById("1");
            // element.innerHTML = "Success";
            return selected * global.bitcoinRate;
          }
    }
