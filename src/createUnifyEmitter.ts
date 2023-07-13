type ExtractEvent<T, E extends keyof T> = T[Extract<E, PropertyKey>];
type Callback<T> = (data: T) => void;

export default function createUnifyEmitter<
  T extends {
    [k: PropertyKey]: unknown;
  }
>() {
  const events = new Map<keyof T, Callback<ExtractEvent<T, keyof T>>[]>();
  const eventsMetadata = new Map<
    keyof T,
    {
      maxListeners: number;
    }
  >();

  return {
    __events_type<E extends keyof T>(_record: {
      [k in E]: T[k];
    }) {},
    /**
     * Subscribes to an event and adds the listener to the beginning of the listeners array.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     * @returns The provided listener.
     */
    prependOn<E extends keyof T>(
      event: E,
      listener: Callback<ExtractEvent<T, E>>
    ): typeof listener {
      const listeners = events.get(event) || [];

      listeners.unshift(listener as Callback<ExtractEvent<T, keyof T>>);

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
    prependOnce<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>): void {
      const listeners = events.get(event) || [];

      const wrapper: Callback<ExtractEvent<T, E>> = (data) => {
        this.off(event, wrapper);
        listener(data);
      };

      listeners.unshift(wrapper as Callback<ExtractEvent<T, keyof T>>);

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
    on<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>): typeof listener {
      const listeners = events.get(event) || [];
      const metadata = eventsMetadata.get(event);

      if (metadata && metadata.maxListeners >= this.listenerCount(event)) {
        console.warn(
          `Maximum listener count (${
            metadata.maxListeners
          }) exceeded for event '${event.toString()}'. Listener not added.`
        );
        return listener;
      }

      listeners.push(listener as Callback<ExtractEvent<T, keyof T>>);

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
    once<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>) {
      const listeners = events.get(event) || [];

      const wrapper = (data: ExtractEvent<T, E>) => {
        this.off(event, wrapper);
        listener(data);
      };

      listeners.push(wrapper as Callback<ExtractEvent<T, keyof T>>);

      events.set(event, listeners);
    },

    /**
     * Unsubscribes from an event.
     *
     * @template E - The event name.
     * @param event - The event to unsubscribe from.
     * @param listener - The event listener callback to remove.
     */
    off<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>) {
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
    emit<E extends keyof T>(event: E, data: ExtractEvent<T, E>, doCopy: boolean = false) {
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
    listeners<E extends keyof T>(event: E): Callback<ExtractEvent<T, E>>[] {
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
    listenerCount<E extends keyof T>(event: E): number {
      return this.listeners(event).length;
    },

    /**
     * Removes all listeners for a specific event or for all events.
     *
     * @template The event name. If not provided, all listeners for all events will be removed.
     * @param [event] - The event to remove listeners for.
     */
    removeListeners<E extends keyof T>(event?: E): void {
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
    setMaxListeners<E extends keyof T>(event: E, maxListeners: number): void {
      const metadata = eventsMetadata.get(event) || {
        maxListeners,
      };

      eventsMetadata.set(event, metadata);
    },
  };
}
