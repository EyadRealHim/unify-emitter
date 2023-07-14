type ExtractEvent<T, E extends keyof T> = T[Extract<E, PropertyKey>];
type Callback<T> = (data: T) => void;
/**
 * @template TBase The events that base class have and should not be overwritten
 * @template TExtends The events subclass have and cans be ignored if one of its properties matches TBase properties
 */
type EventsObject<TBase, TExtends> = {
    [k in Exclude<keyof TExtends, keyof TBase>]: TExtends[k];
} & TBase;
type NoSharedProperties<T, U> = Extract<keyof T, keyof U> extends never ? T : never;
declare class UnifyEmitter<T extends {}> {
    protected readonly events: Map<keyof T, Callback<ExtractEvent<T, keyof T>>[]>;
    protected readonly eventsMetadata: Map<keyof T, {
        maxListeners: number;
    }>;
    /**
     * Subscribes to an event and adds the listener to the beginning of the listeners array.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     * @returns The provided listener.
     */
    prependOn<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>): typeof listener;
    /**
     * Subscribes to an event once and adds the listener to the beginning of the listeners array.
     * The listener will be automatically unsubscribed after it's called.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     */
    prependOnce<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>): void;
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
    on<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>): typeof listener;
    /**
     * Subscribes to an event once. The listener will be automatically unsubscribed after it's called.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     */
    once<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>): void;
    /**
     * Unsubscribes from an event.
     *
     * @template E - The event name.
     * @param event - The event to unsubscribe from.
     * @param listener - The event listener callback to remove.
     */
    off<E extends keyof T>(event: E, listener: Callback<ExtractEvent<T, E>>): void;
    /**
     * Emits an event.
     *
     * @template E - The event name.
     * @param  event - The event to emit.
     * @param data - The data to pass to the event listeners.
     * @param [doCopy=false] - Whether to perform a deep copy of the data before passing it to the listeners.
     */
    emit<E extends keyof T>(event: E, data: ExtractEvent<T, E>, doCopy?: boolean): void;
    /**
     * Retrieves an array of all listeners subscribed to a specific event.
     *
     * @template E - The event name.
     * @param event - The event to retrieve listeners for.
     * @returns An array of listeners for the specified event.
     */
    listeners<E extends keyof T>(event: E): Callback<ExtractEvent<T, E>>[];
    /**
     * Retrieves the number of listeners subscribed to a specific event.
     *
     * @template E - The event name.
     * @param event - The event to count listeners for.
     * @returns The number of listeners for the specified event.
     */
    listenerCount<E extends keyof T>(event: E): number;
    /**
     * Removes all listeners for a specific event or for all events.
     *
     * @template The event name. If not provided, all listeners for all events will be removed.
     * @param [event] - The event to remove listeners for.
     */
    removeListeners<E extends keyof T>(event?: E): void;
    /**
     * Sets the maximum number of listeners allowed for an event.
     *
     * @template E - The event name.
     * @param {E} event - The event to set the maximum number of listeners for.
     * @param {number} maxListeners - The maximum number of listeners allowed for the specified event.
     */
    setMaxListeners<E extends keyof T>(event: E, maxListeners: number): void;
}

export { Callback, EventsObject, ExtractEvent, NoSharedProperties, UnifyEmitter as default };
