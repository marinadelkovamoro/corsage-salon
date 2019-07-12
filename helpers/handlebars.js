module.exports = {
    calculateBitcoin: function (selected, option) {
        console.log("calculateBitcoin....");
            return (selected / global.bitcoinRate).toFixed(4);
          }
    }
