global.bitcoinRate = .003;

// const response = await fetch('https://bitpay.com/api/rates');
// const myJson = await response.json(); //extract JSON from the http response
// console.log(JSON.stringify(myJson));

// async function getUserAsync() 
// {
//   let response = await fetch(`https://bitpay.com/api/rates`);
//   let data = await response.json()
//   return data;
// }
 
// getUserAsync()
//   .then(function (data) { 
//     console.log("====================================================");
//     console.log("Done: " + data)
//   });


  var options = {
    host: url,
    port: 80,
    path: 'https://bitpay.com/api/rates',
    method: 'GET'
  };
  
  http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  }).end();