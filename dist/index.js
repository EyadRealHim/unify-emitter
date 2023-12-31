"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  default: () => UnifyEmitter
});
module.exports = __toCommonJS(src_exports);
var UnifyEmitter = class {
  constructor() {
    this.events = /* @__PURE__ */ new Map();
    this.eventsMetadata = /* @__PURE__ */ new Map();
  }
  /**
   * Subscribes to an event and adds the listener to the beginning of the listeners array.
   *
   * @template E - The event name.
   * @param event - The event to subscribe to.
   * @param listener - The event listener callback.
   * @returns The provided listener.
   */
  prependOn(event, listener) {
    const listeners = this.events.get(event) || [];
    listeners.unshift(listener);
    this.events.set(event, listeners);
    return listener;
  }
  /**
   * Subscribes to an event once and adds the listener to the beginning of the listeners array.
   * The listener will be automatically unsubscribed after it's called.
   *
   * @template E - The event name.
   * @param event - The event to subscribe to.
   * @param listener - The event listener callback.
   */
  prependOnce(event, listener) {
    const listeners = this.events.get(event) || [];
    const wrapper = (data) => {
      this.off(event, wrapper);
      listener(data);
    };
    listeners.unshift(wrapper);
    this.events.set(event, listeners);
  }
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
    const listeners = this.events.get(event) || [];
    const metadata = this.eventsMetadata.get(event);
    if (metadata && metadata.maxListeners >= this.listenerCount(event)) {
      console.warn(
        `Maximum listener count (${metadata.maxListeners}) exceeded for event '${event.toString()}'. Listener not added.`
      );
      return listener;
    }
    listeners.push(listener);
    this.events.set(event, listeners);
    return listener;
  }
  /**
   * Subscribes to an event once. The listener will be automatically unsubscribed after it's called.
   *
   * @template E - The event name.
   * @param event - The event to subscribe to.
   * @param listener - The event listener callback.
   */
  once(event, listener) {
    const listeners = this.events.get(event) || [];
    const wrapper = (data) => {
      this.off(event, wrapper);
      listener(data);
    };
    listeners.push(wrapper);
    this.events.set(event, listeners);
  }
  /**
   * Unsubscribes from an event.
   *
   * @template E - The event name.
   * @param event - The event to unsubscribe from.
   * @param listener - The event listener callback to remove.
   */
  off(event, listener) {
    const listeners = this.events.get(event) || [];
    this.events.set(
      event,
      listeners.filter((l) => l != listener)
    );
  }
  /**
   * Emits an event.
   *
   * @template E - The event name.
   * @param  event - The event to emit.
   * @param data - The data to pass to the event listeners.
   * @param [doCopy=false] - Whether to perform a deep copy of the data before passing it to the listeners.
   */
  emit(event, data, doCopy = false) {
    const listeners = this.events.get(event) || [];
    for (let listener of listeners) {
      listener(doCopy ? structuredClone(data) : data);
    }
  }
  /**
   * Retrieves an array of all listeners subscribed to a specific event.
   *
   * @template E - The event name.
   * @param event - The event to retrieve listeners for.
   * @returns An array of listeners for the specified event.
   */
  listeners(event) {
    return this.events.get(event) || [];
  }
  /**
   * Retrieves the number of listeners subscribed to a specific event.
   *
   * @template E - The event name.
   * @param event - The event to count listeners for.
   * @returns The number of listeners for the specified event.
   */
  listenerCount(event) {
    return this.listeners(event).length;
  }
  /**
   * Removes all listeners for a specific event or for all events.
   *
   * @template The event name. If not provided, all listeners for all events will be removed.
   * @param [event] - The event to remove listeners for.
   */
  removeListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
  /**
   * Sets the maximum number of listeners allowed for an event.
   *
   * @template E - The event name.
   * @param {E} event - The event to set the maximum number of listeners for.
   * @param {number} maxListeners - The maximum number of listeners allowed for the specified event.
   */
  setMaxListeners(event, maxListeners) {
    const metadata = this.eventsMetadata.get(event) || {
      maxListeners
    };
    this.eventsMetadata.set(event, metadata);
  }
};
