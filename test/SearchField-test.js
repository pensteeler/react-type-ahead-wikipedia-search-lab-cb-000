'use strict';

const React = require('react');
const { shallow } = require('enzyme');
const sinon = require('sinon');

const SearchField = require('../components/SearchField');

describe('<SearchField />', function() {
  it('should render an <input />', function() {
    const wrapper = shallow(<SearchField />);
    expect(wrapper.type()).toBe('input');
  });

  it('should have class .search-field', function() {
    const wrapper = shallow(<SearchField />);
    expect(wrapper.hasClass('search-field')).toBe(true);
  });

  context('when value changes', function() {
    it('should call onChange', function() {
      const onChange = sinon.spy();
      const wrapper = shallow(<SearchField onChange={onChange} />);
      wrapper.simulate('change', 'some change');
      sinon.assert.calledOnce(onChange);
    });
  });

  it('should set value prop as input value', function() {
    const value = 'some value';
    const wrapper = shallow(<SearchField value={value} />);
    expect(wrapper.find('input').prop('value')).toBe(value);
  });
});
