type ExtractEvent<T, E extends keyof T> = T[Extract<E, PropertyKey>];
type Callback<T> = (data: T) => void;
declare function createUnifyEmitter<T extends {
    [k: PropertyKey]: unknown;
}>(): {
    __events_type<E extends keyof T>(_record: { [k in E]: T[k]; }): void;
    /**
     * Subscribes to an event and adds the listener to the beginning of the listeners array.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     * @returns The provided listener.
     */
    prependOn<E_1 extends keyof T>(event: E_1, listener: Callback<ExtractEvent<T, E_1>>): Callback<ExtractEvent<T, E_1>>;
    /**
     * Subscribes to an event once and adds the listener to the beginning of the listeners array.
     * The listener will be automatically unsubscribed after it's called.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     */
    prependOnce<E_2 extends keyof T>(event: E_2, listener: Callback<ExtractEvent<T, E_2>>): void;
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
    on<E_3 extends keyof T>(event: E_3, listener: Callback<ExtractEvent<T, E_3>>): Callback<ExtractEvent<T, E_3>>;
    /**
     * Subscribes to an event once. The listener will be automatically unsubscribed after it's called.
     *
     * @template E - The event name.
     * @param event - The event to subscribe to.
     * @param listener - The event listener callback.
     */
    once<E_4 extends keyof T>(event: E_4, listener: Callback<ExtractEvent<T, E_4>>): void;
    /**
     * Unsubscribes from an event.
     *
     * @template E - The event name.
     * @param event - The event to unsubscribe from.
     * @param listener - The event listener callback to remove.
     */
    off<E_5 extends keyof T>(event: E_5, listener: Callback<ExtractEvent<T, E_5>>): void;
    /**
     * Emits an event.
     *
     * @template E - The event name.
     * @param  event - The event to emit.
     * @param data - The data to pass to the event listeners.
     * @param [doCopy=false] - Whether to perform a deep copy of the data before passing it to the listeners.
     */
    emit<E_6 extends keyof T>(event: E_6, data: ExtractEvent<T, E_6>, doCopy?: boolean): void;
    /**
     * Retrieves an array of all listeners subscribed to a specific event.
     *
     * @template E - The event name.
     * @param event - The event to retrieve listeners for.
     * @returns An array of listeners for the specified event.
     */
    listeners<E_7 extends keyof T>(event: E_7): Callback<ExtractEvent<T, E_7>>[];
    /**
     * Retrieves a subscribed events.
     * @returns a subscribed events.
     *
     * @remarks ITS NOT SAFE. DO NOT USE THIS PROPERTY!
     */
    events(): Map<keyof T, Callback<ExtractEvent<T, keyof T>>[]>;
    /**
     * Retrieves a subscribed events metadata.
     * @returns a subscribed events metadata.
     *
     * @remarks ITS NOT SAFE. DO NOT USE THIS PROPERTY!
     */
    eventsMetadata(): Map<keyof T, {
        maxListeners: number;
    }>;
    /**
     * Retrieves the number of listeners subscribed to a specific event.
     *
     * @template E - The event name.
     * @param event - The event to count listeners for.
     * @returns The number of listeners for the specified event.
     */
    listenerCount<E_8 extends keyof T>(event: E_8): number;
    /**
     * Removes all listeners for a specific event or for all events.
     *
     * @template The event name. If not provided, all listeners for all events will be removed.
     * @param [event] - The event to remove listeners for.
     */
    removeListeners<E_9 extends keyof T>(event?: E_9 | undefined): void;
    /**
     * Sets the maximum number of listeners allowed for an event.
     *
     * @template E - The event name.
     * @param {E} event - The event to set the maximum number of listeners for.
     * @param {number} maxListeners - The maximum number of listeners allowed for the specified event.
     */
    setMaxListeners<E_10 extends keyof T>(event: E_10, maxListeners: number): void;
};

type Merge<TLow, THigh> = Omit<THigh, keyof TLow> & Omit<TLow, keyof THigh>;
type MergeUnifyEmitter<T extends object, A extends UnifyEmitter<any>, B extends UnifyEmitter<any>> = ReturnType<typeof mergeUnifyEmitter<T, A, B>>;
declare function mergeUnifyEmitter<T extends object, A extends UnifyEmitter<any>, B extends UnifyEmitter<any> & Object>(parent: T, a: A, b: B): T & UnifyEmitter<Merge<UnifyEmitterEventsOf<A>, UnifyEmitterEventsOf<B>>>;

type UnifyEmitter<T extends Record<PropertyKey, unknown>> = ReturnType<typeof createUnifyEmitter<T>>;
type UnifyEmitterEventsOf<T extends UnifyEmitter<any>> = T["__events_type"] extends (...args: [infer R]) => void ? R : never;

export { MergeUnifyEmitter, UnifyEmitter, UnifyEmitterEventsOf, createUnifyEmitter, mergeUnifyEmitter };
