'use strict';

const sinon = require('sinon');

const actions = require('../actions');
const resultStore = require('../stores/resultStore');

describe('actions', function() {
  const sandbox = sinon.sandbox.create();

  beforeEach(function() {
    sandbox.useFakeTimers();
    resultStore.setState({
      results: [],
      updated: new Date(),
    });
  });

  afterEach(function() {
    sandbox.restore();
    resultStore.setState({
      results: [],
      updated: new Date(),
    });
  });

  describe('#search', function() {
    it('should be a function', function() {
      expect(actions.search).toBeA(Function);
    });

    it('should update resultStore', function(done) {
      const prevState = resultStore.getState();

      const removeListener = resultStore.addListener((state) => {
        removeListener();
        done();
      });
      actions.search('test');
    });
  });
});
