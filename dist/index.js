"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createUnifyEmitter: () => createUnifyEmitter,
  mergeUnifyEmitter: () => mergeUnifyEmitter
});
module.exports = __toCommonJS(src_exports);

// src/createUnifyEmitter.ts
function createUnifyEmitter() {
  const events = /* @__PURE__ */ new Map();
  const eventsMetadata = /* @__PURE__ */ new Map();
  return {
    __events_type(_record) {
    },
    /**
     * Subscribes to an event and adds the listener to the beginning of the listeners array.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     * @returns The provided listener.
     */
    prependOn(event, listener) {
      const listeners = events.get(event) || [];
      listeners.unshift(listener);
      events.set(event, listeners);
      return listener;
    },
    /**
     * Subscribes to an event once and adds the listener to the beginning of the listeners array.
     * The listener will be automatically unsubscribed after it's called.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     */
    prependOnce(event, listener) {
      const listeners = events.get(event) || [];
      const wrapper = (data) => {
        this.off(event, wrapper);
        listener(data);
      };
      listeners.unshift(wrapper);
      events.set(event, listeners);
    },
    /**
     * Subscribes to an event.
     *
     * @template E - The event name.
     * @param  event - The event to subscribe to.
     * @param listener - The event listener callback.
     * @returns The provided listener.
     *
     * @remarks
     * If a maximum listener count is defined for the event and adding the listener would exceed the limit,
     * a warning is logged and the listener is not added.
     *
     */
    on(event, listener) {
      const listeners = events.get(event) || [];
      const metadata = eventsMetadata.get(event);
      if (metadata && metadata.maxListeners >= this.listenerCount(event)) {
        console.warn(
          `Maximum listener count (${metadata.maxListeners}) exceeded for event '${event.toString()}'. Listener not added.`
        );
        return listener;
      }
      listeners.push(listener);
      events.set(event, listeners);
      return listener;
    },
    /**
     * Subscribes to an event once. The listener will be automatically unsubscribed after it's called.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     */
    once(event, listener) {
      const listeners = events.get(event) || [];
      const wrapper = (data) => {
        this.off(event, wrapper);
        listener(data);
      };
      listeners.push(wrapper);
      events.set(event, listeners);
    },
    /**
     * Unsubscribes from an event.
     *
     * @template E - The event name.
     * @param event - The event to unsubscribe from.
     * @param listener - The event listener callback to remove.
     */
    off(event, listener) {
      const listeners = events.get(event) || [];
      events.set(
        event,
        listeners.filter((l) => l != listener)
      );
    },
    /**
     * Emits an event.
     *
     * @template E - The event name.
     * @param  event - The event to emit.
     * @param data - The data to pass to the event listeners.
     * @param [doCopy=false] - Whether to perform a deep copy of the data before passing it to the listeners.
     */
    emit(event, data, doCopy = false) {
      const listeners = events.get(event) || [];
      for (let listener of listeners) {
        listener(doCopy ? structuredClone(data) : data);
      }
    },
    /**
     * Retrieves an array of all listeners subscribed to a specific event.
     *
     * @template E - The event name.
     * @param event - The event to retrieve listeners for.
     * @returns An array of listeners for the specified event.
     */
    listeners(event) {
      return events.get(event) || [];
    },
    /**
     * Retrieves a subscribed events.
     * @returns a subscribed events.
     *
     * @remarks ITS NOT SAFE. DO NOT USE THIS PROPERTY!
     */
    events() {
      return events;
    },
    /**
     * Retrieves a subscribed events metadata.
     * @returns a subscribed events metadata.
     *
     * @remarks ITS NOT SAFE. DO NOT USE THIS PROPERTY!
     */
    eventsMetadata() {
      return eventsMetadata;
    },
    /**
     * Retrieves the number of listeners subscribed to a specific event.
     *
     * @template E - The event name.
     * @param event - The event to count listeners for.
     * @returns The number of listeners for the specified event.
     */
    listenerCount(event) {
      return this.listeners(event).length;
    },
    /**
     * Removes all listeners for a specific event or for all events.
     *
     * @template The event name. If not provided, all listeners for all events will be removed.
     * @param [event] - The event to remove listeners for.
     */
    removeListeners(event) {
      if (event) {
        events.delete(event);
      } else {
        events.clear();
      }
    },
    /**
     * Sets the maximum number of listeners allowed for an event.
     *
     * @template E - The event name.
     * @param {E} event - The event to set the maximum number of listeners for.
     * @param {number} maxListeners - The maximum number of listeners allowed for the specified event.
     */
    setMaxListeners(event, maxListeners) {
      const metadata = eventsMetadata.get(event) || {
        maxListeners
      };
      eventsMetadata.set(event, metadata);
    }
  };
}

// src/MergeUnifyEmitter.ts
function mergeUnifyEmitter(parent, a, b) {
  const emitter = createUnifyEmitter();
  const myMetadata = emitter.eventsMetadata();
  const myEvents = emitter.events();
  for (let someEmitter of [a, b]) {
    const metadata = someEmitter.eventsMetadata();
    const events = someEmitter.events();
    metadata.forEach((metadata2, eventName) => {
      myMetadata.set(
        // @ts-ignore
        eventName,
        __spreadValues(__spreadValues({}, myMetadata.get(
          // @ts-ignore
          eventName
        ) || {}), metadata2)
      );
    });
    events.forEach((callback, eventName) => {
      myEvents.set(
        // @ts-ignore
        eventName,
        [
          ...myEvents.get(
            // @ts-ignore
            eventName
          ) || [],
          ...callback
        ]
      );
    });
    events.clear();
  }
  for (let key in emitter) {
    a[key] = b[key] = emitter[key];
  }
  return __spreadValues(__spreadValues({}, parent), emitter);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUnifyEmitter,
  mergeUnifyEmitter
});
