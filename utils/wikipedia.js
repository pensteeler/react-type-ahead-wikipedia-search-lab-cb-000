'use strict';

const jsonp = require('jsonp');

const wikipedia = {
  baseUrl: 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json',
  search: query =>
    new Promise((resolve, reject) => {
      jsonp(`${wikipedia.baseUrl}&search=${query}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
};

module.exports = wikipedia;
