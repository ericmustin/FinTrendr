'use strict';
const loadcsv = require('./utility/csvtojson');
const db = require('./server/db/db-model');
const stockData = require('./setup/stockData/stockData.js');
const request  = require('request');

//loadcsv.loadCSV('./setup/goldenticket.csv')
// loadcsv.loadCSV('./setup/Cashtags.csv')
//   .then((data) => {
//     for(var i =0; i<data.length; i++) {
//       db.saveKeyword(data[i]).then((node)=> {console.log('done!');}).catch((err)=> {console.log(err);});
//     }
//   })
//   .catch(() => {
//     console.log('failed to parse data');
//   });

// let SPX = stockData.SPX;
// let etfData = [];
// let mult = 0;
// SPX.forEach((symbol) => {
//   console.log('hey hey');
//   var promise = new Promise((resolve, reject) => {
//     console.log('promise in');
//     console.log(symbol);
//     mult++;
//     // setTimeout(function() {
//     request.get('https://www.quandl.com/api/v3/datasets/WIKI/' + symbol.Symbol + '/data.json?column_index=4&api_key=fiuzUjysoMY6y1FMEbBE&start_date=2014-03-31&end_date=2016-02-29&order=asc&collapse=monthly',
//       (err, response, body) => {
//         console.log('request response');
//         console.log("BODY:", body);
//         var parsedBody = JSON.parse(body);
//         if (err) {
//           reject(err);
//         } else {
//           let returnObj = {};
//           returnObj.data = parsedBody['dataset_data'].data.map((closingPrice) => {
//             return closingPrice[1];
//           });
//           returnObj.Stock = symbol.Symbol;
//           returnObj.Sector = symbol.Sector;
//           returnObj.Name = symbol.Name;
//           resolve(returnObj);
//         }
//       });
//     // }, 400 * mult);

//   });

//   etfData.push(promise);
// });

// Promise.all(etfData).then((results) => {
//   results.forEach((stock) => {
//     // setTimeout(function() {  
//       stock.data = JSON.stringify(stock.data);

//     db.saveStock( stock ).then((node) => {
//         console.log('done!');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // },400);
//   });
// });
