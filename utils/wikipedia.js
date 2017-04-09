'use strict';

// This is a tiny wrapper around the Wikipedia Search API. We can't use the
// browser's native #fetch() function here, since only JSONP can be used in
// order to circumvent CORS issues here.
// The search API is documented here: https://www.mediawiki.org/wiki/API:Search

import jsonp from 'jsonp';

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

export default wikipedia;
