import UnifyEmitter from "../src";

declare const emitter: UnifyEmitter<{
  data: null;
  uint: { code: null };
}>;

// @ts-expect-error
emitter.emit("data", true);

emitter.on("data", (_data: null) => {});

emitter.on("uint", (_uint: { code: null }) => {});

// @ts-expect-error
emitter.on("data", (data: null | { code: null }) => {});
// @ts-expect-error
emitter.on("uint", (uint: null) => {});

emitter.emit("data", null);

// @ts-expect-error
emitter.emit("data", false);

emitter.emit("uint", {
  code: null,
});

emitter.emit("uint", {
  // @ts-expect-error
  code: 0,
});

// @ts-expect-error
emitter.emit("uint", null);
