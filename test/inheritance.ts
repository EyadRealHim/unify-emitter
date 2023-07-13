import { createUnifyEmitter, mergeUnifyEmitter } from "../dist";

let a = {
  a: 1,
  ...createUnifyEmitter<{
    a: "A";
  }>(),
};

let b = {
  b: 2,
  ...createUnifyEmitter<{
    b: "B";
  }>(),
};

let c = mergeUnifyEmitter({ ...a, ...b }, a, b);

c.a == a.a;
c.b == b.b;

// @ts-expect-error
c.d;
// @ts-expect-error
b.a;
// @ts-expect-error
a.b;

c.emit("a", "A");
c.emit("b", "B");

c.on("a", (_data: "A") => {});
c.on("b", (_data: "B") => {});

// @ts-expect-error
c.emit("b", "A");
// @ts-expect-error
c.emit("a", "B");

// @ts-expect-error
c.on("b", (_data: "A") => {});
// @ts-expect-error
c.on("a", (_data: "B") => {});
