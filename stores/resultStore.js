'use strict';

import Store from './Store';

class ResultStore {
  isOutdated(updated) {
    return this.getState().updated > updated;
  }
}

const resultStore = new ResultStore();

export default resultStore;
