'use strict';

const React = require('react');
const { shallow } = require('enzyme');
const sinon = require('sinon');

const SearchResults = require('../components/SearchResults');

describe('<SearchResults />', function() {
  it('should render an <ul />', function() {
    const wrapper = shallow(<SearchResults results={[]} />);
    expect(wrapper.type()).toBe('ul');
  });

  it('should have class .search-results', function() {
    const wrapper = shallow(<SearchResults results={[]} />);
    expect(wrapper.hasClass('search-results')).toBe(true);
  });

  it('should render <li /> for each result', function() {
    const results = [{}, {}, {}];
    const wrapper = shallow(<SearchResults results={results} />);
    expect(wrapper.children().length).toBe(3);
  });

  it('should render each description in li > p', function() {
    const results = [
      { description: 'description 0' },
      { description: 'description 1' },
      { description: 'description 2' },
    ];
    const wrapper = shallow(<SearchResults results={results} />);

    expect(wrapper.childAt(0).find('p').text()).toBe('description 0');
    expect(wrapper.childAt(1).find('p').text()).toBe('description 1');
    expect(wrapper.childAt(2).find('p').text()).toBe('description 2');
  });

  it('should render each title and link as href in li > a', function() {
    const results = [
      { title: 'title 0', link: '#0' },
      { title: 'title 1', link: '#1' },
      { title: 'title 2', link: '#2' },
    ];
    const wrapper = shallow(<SearchResults results={results} />);

    expect(wrapper.childAt(0).find('a').text()).toBe('title 0');
    expect(wrapper.childAt(0).find('a').prop('href')).toBe('#0');

    expect(wrapper.childAt(1).find('a').text()).toBe('title 1');
    expect(wrapper.childAt(1).find('a').prop('href')).toBe('#1');

    expect(wrapper.childAt(2).find('a').text()).toBe('title 2');
    expect(wrapper.childAt(2).find('a').prop('href')).toBe('#2');
  });
});
