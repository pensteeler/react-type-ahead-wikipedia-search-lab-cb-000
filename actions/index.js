'use strict';

const jsonp = require('jsonp');
const resultStore = require('../stores/resultStore');

// Wikipedia search API
const baseUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json';

const search = (query) => {
  jsonp(`${baseUrl}&search=${query}`, (err, data) => {
    const results = [];

    resultStore.setState({
      results,
    });
  });
};

module.exports = { search };
