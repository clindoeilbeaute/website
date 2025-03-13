class Delegate {
  constructor(root) {
    this.listenerMap = [{}, {}];
    if (root) {
      this.root(root);
    }
    this.handle = this.handle.bind(this); // Cache of event listeners removed during an event cycle
    this._removedListeners = [];
  }

  root(root) {
    let listenerMap = this.listenerMap;
    let eventType;

    if (this.rootElement) {
      for (eventType in listenerMap[1]) {
        if (listenerMap[1].hasOwnProperty(eventType)) {
          this.rootElement.removeEventListener(eventType, this.handle, true);
        }
      }

      for (eventType in listenerMap[0]) {
        if (listenerMap[0].hasOwnProperty(eventType)) {
          this.rootElement.removeEventListener(eventType, this.handle, false);
        }
      }
    }

    if (!root || !root.addEventListener) {
      if (this.rootElement) {
        delete this.rootElement;
      }
      return this;
    }

    this.rootElement = root;

    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.addEventListener(eventType, this.handle, true);
      }
    }

    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.addEventListener(eventType, this.handle, false);
      }
    }

    return this;
  }

  captureForType(eventType) {
    return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
  }

  on(eventType, selector, handler, useCapture) {
    if (!eventType) {
      throw new TypeError('Invalid event type: ' + eventType);
    }

    if (typeof selector === 'function') {
      useCapture = handler;
      handler = selector;
      selector = null;
    }

    if (useCapture === undefined) {
      useCapture = this.captureForType(eventType);
    }

    if (typeof handler !== 'function') {
      throw new TypeError('Handler must be a type of Function');
    }

    let root = this.rootElement;
    let listenerMap = this.listenerMap[useCapture ? 1 : 0];

    if (!listenerMap[eventType]) {
      if (root) {
        root.addEventListener(eventType, this.handle, useCapture);
      }
      listenerMap[eventType] = [];
    }

    let matcher;
    let matcherParam;
    if (!selector) {
      matcherParam = null;
      matcher = matchesRoot.bind(this);
    } else if (/^[a-z]+$/i.test(selector)) {
      matcherParam = selector;
      matcher = matchesTag;
    } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
      matcherParam = selector.slice(1);
      matcher = matchesId;
    } else {
      matcherParam = selector;
      matcher = Element.prototype.matches;
    }

    listenerMap[eventType].push({
      selector,
      handler,
      matcher,
      matcherParam
    });

    return this;
  }

  off(eventType, selector, handler, useCapture) {
    // Same code here
  }

  handle(event) {
    // Same code here
  }

  fire(event, target, listener) {
    return listener.handler.call(target, event, target);
  }
}

export default Delegate;
