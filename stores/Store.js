'use strict';

export default class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = [];
  }

  addListener(listener) {
    // TODO
  }

  setState(state) {
    this.state = state;
    for (const listener of this.listeners) {
      listener.call(this, state);
    }
  }

  getState() {
    return this.state;
  }
}
