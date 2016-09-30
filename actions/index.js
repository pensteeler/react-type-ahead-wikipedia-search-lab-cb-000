'use strict';

const jsonp = require('jsonp');
const resultStore = require('../stores/resultStore');

const baseUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json';

const search = (query) => {
  const requested = new Date();

  jsonp(`${baseUrl}&search=${query}`, (err, data) => {
    if (err) {
      console.error('Uppps! Something went wrong', err);
      return;
    }

    if (resultStore.isOutdated(requested)) {
      return;
    }

    const [query, titles, descriptions, links] = data;
    const results = titles.map((title, i) => ({
      title,
      description: descriptions[i],
      link: links[i],
    }));

    resultStore.setState({
      results,
      updated: requested,
    });
  });
};

module.exports = { search };
