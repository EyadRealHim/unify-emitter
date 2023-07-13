// so in real world. you may want to merge two objects that contains unify emitters
// that can be done using mergeUnifyEmitter

import { createUnifyEmitter, mergeUnifyEmitter } from "../dist";

const A = {
  _propA: 0,
  get propA(): number {
    return this._propA;
  },
  set propA(value: number) {
    this.emit("propAChange", {
      value: this.propA,
      lastValue: value,
    });
    this._propA = value;
  },

  ...createUnifyEmitter<{
    propAChange: {
      value: number;
      lastValue: number;
    };
  }>(),
};

const B = {
  _propB: 0,
  get propB(): number {
    return this._propB;
  },
  set propB(value: number) {
    this.emit("propBChange", {
      value: this.propB,
      lastValue: value,
    });
    this._propB = value;
  },

  ...createUnifyEmitter<{
    propBChange: {
      value: number;
      lastValue: number;
    };
  }>(),
};

const C = mergeUnifyEmitter({ ...A, ...B }, A, B);

C._propA == A.propA;
C._propB == B.propB;

C.on("propAChange", console.log);
C.on("propBChange", console.log);
