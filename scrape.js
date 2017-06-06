'use strict';

const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


function scrapeResults() {
  const url = 'http://www.redheart.com/yarn?q=AdateOnlineArelevance%3AdateOnline%3Atype%3AClearance&text=AdateOnlineArelevance&pageViewMode=grid&newArrivals=false&privateSales=false&sort=dateOnline';

  request(url, function (error, response, body) {
    if (error) { throw new Error(error) };

    const $ = cheerio.load(body);
    const products = [];

    $('div.price').each(function (i, element) {
      const item = $(this).text();

      products.push(item);
    });

    fs.writeFileSync('products.txt', products.join('\n'));
  });
};


scrapeResults();
