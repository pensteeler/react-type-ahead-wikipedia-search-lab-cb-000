require('./test/index-test.js');

const Autocomplete = require('./components/Autocomplete');
const React = require('react');
const ReactDOM = require('react-dom');

const $main = document.getElementById('main');
ReactDOM.render(<Autocomplete />, $main);