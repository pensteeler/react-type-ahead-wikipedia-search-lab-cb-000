'use strict';

const jsonp = require('jsonp');
const resultStore = require('../stores/resultStore');
const wikipedia = require('../utils/wikipedia');

const search = (query) => {
  const requested = new Date();

  return wikipedia.search(query).then((data) => {
    // TODO
  });
};

module.exports = { search };
