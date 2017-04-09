require('./test/index-test.js');

import Autocomplete from './components/Autocomplete';
import React from 'react';
import ReactDOM from 'react-dom';

const $main = document.getElementById('main');
ReactDOM.render(<Autocomplete />, $main);
