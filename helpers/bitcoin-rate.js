const axios = require('axios');
global.bitcoinRate = .003;

// Retrieves Current Bitcoin Rate
axios.get('https://bitpay.com/api/rates')
  .then(response => {
    console.log(" ");
        console.log(" ");
        console.log(" ");
        console.log("====================================================");
        console.log("Bitcoin Received data!");
        global.bitcoinRate =  response.data[2].rate;
        console.log(response.data[2].rate);
        console.log("====================================================");
        console.log(" ");
        console.log(" ");
        console.log(" ");
    
  })
  .catch(error => {
    console.log(error);
  });

// https.get('https://bitpay.com/api/rates', (resp) => {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(" ");
//     console.log(" ");
//     console.log(" ");
//     console.log("====================================================");
//     console.log("Received data!");
//     console.log(JSON.parse(data));
//     // console.log(resp);
//     console.log("====================================================");
//     // console.log(data[0]);
//     // console.log(data);
//     console.log(" ");
//     console.log(" ");
//     console.log(" ");
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });


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


  // var options = {
  //   host: url,
  //   port: 80,
  //   path: 'https://bitpay.com/api/rates',
  //   method: 'GET'
  // };
  
  // http.request(options, function(res) {
  //   console.log('STATUS: ' + res.statusCode);
  //   console.log('HEADERS: ' + JSON.stringify(res.headers));
  //   res.setEncoding('utf8');
  //   res.on('data', function (chunk) {
  //     console.log('BODY: ' + chunk);
  //   });
  // }).end();