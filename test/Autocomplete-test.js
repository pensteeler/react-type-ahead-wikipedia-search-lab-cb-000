'use strict';

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import actions from '../actions';
import resultStore from '../stores/resultStore';
import Autocomplete from '../components/Autocomplete';

import SearchField from '../components/SearchField';
import SearchResults from '../components/SearchResults';

describe('<Autocomplete />', function() {
  const sandbox = sinon.sandbox.create();

  beforeEach(function() {
    sandbox.stub(resultStore, 'addListener');
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('when component did mount', function() {
    it('should add listener', function() {
      const wrapper = mount(<Autocomplete />);
      sinon.assert.calledOnce(resultStore.addListener);
      sinon.assert.calledWithMatch(resultStore.addListener, sinon.match.func);
    });
  });

  describe('when resultStore updates', function() {
    it('should update .results state', function() {
      const wrapper = mount(<Autocomplete />);
      const listener = resultStore.addListener.getCall(0).args[0];
      const results = ['query', [], [], []];
      listener({ results });
      expect(wrapper.state('results')).toBe(results);
    });
  });

  describe('when component will unmount', function () {
    it('should remove the registered listener', function () {
      const removeListener = sinon.spy();
      resultStore.addListener.returns(removeListener);

      const wrapper = mount(<Autocomplete />);
      sinon.assert.notCalled(removeListener);

      wrapper.unmount();
      sinon.assert.calledOnce(removeListener);
    });
  });

  it('should get initial "results" state from resultStore', function() {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper.state('results')).toBe(resultStore.getState().results);
  });

  it('should have an empty string as initial "query" state', function() {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper.state('query')).toBe('');
  });

  it('should render an <div />', function() {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper.type()).toBe('div');
  });

  it('should have class .autocomplete', function() {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper.hasClass('autocomplete')).toBe(true);
  });

  it('should render a <SearchField />', function() {
    const wrapper = shallow(<Autocomplete />);
    expect(wrapper.find(SearchField)).toNotBe(null);
  });

  it('should pass "query" state as "value" prop to <SearchField />', function() {
    const wrapper = shallow(<Autocomplete />);
    wrapper.setState({ query: 'some query' });
    expect(wrapper.find(SearchField).prop('value')).toBe('some query');
  });

  it('should render <SearchResults />', function() {
    const wrapper = shallow(<Autocomplete />);
    const results = [[], [], []];
    wrapper.setState({ results });
    expect(wrapper.find(SearchResults)).toNotBe(null);
    expect(wrapper.find(SearchResults).prop('results')).toBe(results);
  });

  context('when <SearchField /> value changes', function() {
    it('should update "query" state', function() {
      const wrapper = shallow(<Autocomplete />);
      wrapper.find(SearchField).simulate('change', {
        target: {
          value: '12',
        },
      });
      expect(wrapper.state('query')).toBe('12');
    });

    context('when query is longer than 2 chars', function() {
      it('should dispatch "search" action', function() {
        sandbox.stub(actions, 'search');

        const wrapper = shallow(<Autocomplete />);
        wrapper.find(SearchField).simulate('change', {
          target: {
            value: '123',
          },
        });
        expect(wrapper.state('query')).toBe('123');
        sinon.assert.calledOnce(actions.search);
        sinon.assert.calledWith(actions.search, '123');
      });
    });
  });
});
