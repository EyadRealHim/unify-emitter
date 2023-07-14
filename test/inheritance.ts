import UnifyEmitter, { EventsObject } from "../dist";

// Define the events specific to the entity
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

// Define the events specific to the player
type PlayerEvents = EventsObject<
  EntityEvents,
  {
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
>;

// Create a generic class that extends UnifyEmitter and incorporates the EntityEvents
class Entity<T extends EntityEvents> extends UnifyEmitter<T> {
  constructor() {
    super();

    this.emit("move", {
      x: 0,
      y: 5,
    });
  }
}

// Create a specific class for the player that extends the Entity class and incorporates the PlayerEvents
class Player extends Entity<PlayerEvents> {}

// Instantiate an instance of the Entity class
const entity = new Entity();

// Instantiate an instance of the Player class
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
