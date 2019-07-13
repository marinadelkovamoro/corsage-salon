module.exports = {
    calculateBitcoin: function (selected, option) {
        console.log("calculateBitcoin.... "+ global.bitcoinRate);
        return (selected / global.bitcoinRate).toFixed(4);
    }
}
