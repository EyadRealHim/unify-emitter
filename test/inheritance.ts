import UnifyEmitter, { EventsObject } from "../dist";

interface EntityEvents {
  move: {
    /**
     * The entity's position on the y-axis.
     */
    x: number;
    /**
     * The entity's position on the x-axis.
     */
    y: number;
  };
}

interface PlayerEvents {
  punch: {
    /**
     * The direction of the player's punch represented in a 3D coordinate system (x, y, z).
     * The values represent the direction along each axis.
     */
    direction: [number, number, number];
    /**
     * The strength or force of the punch.
     */
    force: number;
  };
}

class Entity<T extends EventsObject> extends UnifyEmitter<T & EntityEvents> {}

class Player extends Entity<PlayerEvents> {}

const entity = new Entity();
const player = new Player();

// @ts-expect-error
entity.on("punch", () => {});

// @ts-expect-error
entity.on("move", (data: {}) => {});

// @ts-expect-error
entity.emit("punch", {
  direction: [0, 1, 3],
  force: 3,
});

player.emit("punch", {
  direction: [0, 1, 3],
  force: 3,
});

// @ts-expect-error
player.emit("punch", null);

player.emit("move", {
  x: 0,
  y: 0,
});
