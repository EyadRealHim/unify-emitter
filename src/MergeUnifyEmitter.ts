import { createUnifyEmitter, UnifyEmitter, UnifyEmitterEventsOf } from ".";

type Merge<TLow, THigh> = Omit<THigh, keyof TLow> & Omit<TLow, keyof THigh>;

export type MergeUnifyEmitter<
  T extends object,
  A extends UnifyEmitter<any>,
  B extends UnifyEmitter<any>
> = ReturnType<typeof mergeUnifyEmitter<T, A, B>>;

export default function mergeUnifyEmitter<
  T extends object,
  A extends UnifyEmitter<any>,
  B extends UnifyEmitter<any> & Object
>(
  parent: T,
  a: A,
  b: B
): T & UnifyEmitter<Merge<UnifyEmitterEventsOf<A>, UnifyEmitterEventsOf<B>>> {
  const emitter = createUnifyEmitter<Merge<UnifyEmitterEventsOf<A>, UnifyEmitterEventsOf<B>>>();
  const myMetadata = emitter.eventsMetadata();
  const myEvents = emitter.events();

  // TODO: Remove unsafe code with safer implementation

  // some unsafe code.
  for (let someEmitter of [a, b]) {
    const metadata = someEmitter.eventsMetadata();
    const events = someEmitter.events();

    metadata.forEach((metadata, eventName) => {
      myMetadata.set(
        // @ts-ignore
        eventName,
        {
          ...(myMetadata.get(
            // @ts-ignore
            eventName
          ) || {}),
          ...metadata,
        }
      );
    });

    events.forEach((callback, eventName) => {
      myEvents.set(
        // @ts-ignore
        eventName,
        [
          ...(myEvents.get(
            // @ts-ignore
            eventName
          ) || []),
          ...callback,
        ]
      );
    });
    events.clear();
  }

  for (let key in emitter) {
    // @ts-ignore
    a[key] = b[key] = emitter[key];
  }

  return {
    ...parent,
    ...emitter,
  };
}
