import createUnifyEmitter from "./createUnifyEmitter";
import mergeUnifyEmitter, { MergeUnifyEmitter } from "./MergeUnifyEmitter";

type UnifyEmitter<T extends Record<PropertyKey, unknown>> = ReturnType<
  typeof createUnifyEmitter<T>
>;
type UnifyEmitterEventsOf<T extends UnifyEmitter<any>> = T["__events_type"] extends (
  ...args: [infer R]
) => void
  ? R
  : never;

export { MergeUnifyEmitter, UnifyEmitter, UnifyEmitterEventsOf };
export { createUnifyEmitter, mergeUnifyEmitter };
