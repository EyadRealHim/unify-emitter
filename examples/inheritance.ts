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

// Create a generic class that extends UnifyEmitter and incorporates the EntityEvents
class Entity<T extends EventsObject> extends UnifyEmitter<T & EntityEvents> {}

// Create a specific class for the player that extends the Entity class and incorporates the PlayerEvents
class Player extends Entity<PlayerEvents> {}

// Instantiate an instance of the Entity class
const entity = new Entity();

// Instantiate an instance of the Player class
const player = new Player();

// Emit a "move" event on the entity with the provided coordinates (x: 5, y: 5)
entity.emit("move", { x: 5, y: 5 }); // Works fine!

// Emit a "move" event on the player with the provided coordinates (x: 5, y: 5)
player.emit("move", { x: 5, y: 5 }); // Works fine!

// Emit a "punch" event on the player with the provided direction and force
player.emit("punch", {
  direction: [0, 1, 0],
  force: 3,
}); // Works fine!

// The following line will result in a compile-time error (not runtime). Please keep that in mind.
// entity.emit("punch", {
//   direction: [0, 1, 0],
//   force: 3,
// });
