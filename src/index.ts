type ExtractEvent<T, E extends keyof T = keyof T> = T[Extract<E, string | symbol>];
type Callback<T> = (data: T) => void;

/**
 * @template T - The event type definition.
 */
export default class UnifyEmitter<T extends Record<PropertyKey, unknown>> {
  /**
   * @protected
   * @private
   */
  protected readonly eventsMetadata = new Map<
    keyof T,
    {
      maxListeners: number;
    }
  >();
  /**
   * @protected
   * @private
   */
  protected readonly events = new Map<keyof T, Callback<ExtractEvent<T>>[]>();

  /**
   * Subscribes to an event and adds the listener to the beginning of the listeners array.
   *
   * @template E - The event name.
   * @param event - The event to subscribe to.
   * @param listener - The event listener callback.
   * @returns The provided listener.
   */
  prependOn<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T>>): typeof listener {
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
  prependOnce<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T>>): void {
    const listeners = this.events.get(event) || [];

    const wrapper: Callback<ExtractEvent<T>> = (data) => {
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
  on<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T>>): typeof listener {
    const listeners = this.events.get(event) || [];
    const metadata = this.eventsMetadata.get(event);

    if (metadata && metadata.maxListeners >= this.listenerCount(event)) {
      console.warn(
        `Maximum listener count (${
          metadata.maxListeners
        }) exceeded for event '${event.toString()}'. Listener not added.`
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
  once<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T>>) {
    const listeners = this.events.get(event) || [];

    const wrapper = (data: ExtractEvent<T>) => {
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
  off<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T>>) {
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
  emit<E extends keyof T>(event: E, data: ExtractEvent<T>, doCopy: boolean = false) {
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
  listeners<E extends keyof T>(event: E): Callback<ExtractEvent<T>>[] {
    return this.events.get(event) || [];
  }

  /**
   * Retrieves the number of listeners subscribed to a specific event.
   *
   * @template E - The event name.
   * @param event - The event to count listeners for.
   * @returns The number of listeners for the specified event.
   */
  listenerCount<E extends keyof T>(event: E): number {
    return this.listeners(event).length;
  }

  /**
   * Removes all listeners for a specific event or for all events.
   *
   * @template The event name. If not provided, all listeners for all events will be removed.
   * @param [event] - The event to remove listeners for.
   */
  removeListeners<E extends keyof T>(event?: E): void {
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
  setMaxListeners<E extends keyof T>(event: E, maxListeners: number): void {
    const metadata = this.eventsMetadata.get(event) || {
      maxListeners,
    };

    this.eventsMetadata.set(event, metadata);
  }
}
