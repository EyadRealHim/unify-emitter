# Unify Emitter

Unify Emitter is a lightweight event emitter package that provides a simple and unified API for managing and emitting events. It works seamlessly in both Node.js and browser environments, allowing easy communication between components, modules, or different parts of your application.

[![npm version](https://badge.fury.io/js/unify-emitter.svg)](https://www.npmjs.com/package/unify-emitter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **Cross-Platform**: Works in both Node.js and browser environments.
- **Simple API**: Provides a straightforward and intuitive API for event handling.

- **Lightweight**: Aims to be lightweight and minimal, without unnecessary dependencies.
- **TypeScript Support**: Built with TypeScript and includes type definitions.

## Installation

You can install Unify Emitter via npm:

```shell
npm install unify-emitter
```

## Usage

Here's a basic example demonstrating how to use Unify Emitter:

```typescript
// Import the createUnifyEmitter class
import UnifyEmitter from "unify-emitter";

// Create an instance of UnifyEmitter
const emitter = new UnifyEmitter<{
  myEvent: string;
}>();

// Subscribe to the 'myEvent' event
emitter.on("myEvent", (data) => {
  console.log("Event emitted:", data);
});

// Emit the 'myEvent' event
emitter.emit("myEvent", "Hello, world!"); // Output: `Event emitted: Hello, world!`
emitter.emit("myEvent", "Hello, world!"); // Output: `Event emitted: Hello, world!`
emitter.emit("myEvent", "Hello, world!"); // Output: `Event emitted: Hello, world!`
```

# Inheritance

In certain situations, you may encounter a scenario where you need to inherit a class that already extends `UnifyEmitter`. The API provides a simple technique to achieve inheritance from classes that already extend `UnifyEmitter` using generics.

Here is a basic example that demonstrates this concept:

```typescript
import UnifyEmitter, { EventsObject } from "unify-emitter";

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
```

## Examples

This repository includes examples showcasing the usage of the `UnifyEmitter` package. You can find these examples in the [examples](examples) folder.

## API

### `on(event: E, listener: Callback<ExtractEvent<T>>): typeof listener`

Subscribes to an event.

- `event` (required): The event to subscribe to.
- `listener` (required): The event listener callback.
- Returns: The provided listener.

### `once(event: E, listener: Callback<ExtractEvent<T>>): void`

Subscribes to an event once. The listener will be automatically unsubscribed after it's called.

- `event` (required): The event to subscribe to.
- `listener` (required): The event listener callback.

### `off(event: E, listener: Callback<ExtractEvent<T>>): void`

Unsubscribes from an event.

- `event` (required): The event to unsubscribe from.
- `listener` (required): The event listener callback to remove.

### `emit(event: E, data: ExtractEvent<T>, doCopy?: boolean): void`

Emits an event.

- `event` (required): The event to emit.
- `data` (required): The data to pass to the event listeners.
- `doCopy` (optional): Whether to perform a shallow copy of the data before passing it to the listeners.

### `listeners(event: E): Callback<ExtractEvent<T>>[]`

Retrieves an array of all listeners subscribed to a specific event.

- `event` (required): The event to retrieve listeners for.
- Returns: An array of listeners for the specified event.

### `listenerCount(event: E): number`

Retrieves the number of listeners subscribed to a specific event.

- `event` (required): The event to count listeners for.
- Returns: The number of listeners for the specified event.

### `prependOn(event: E, listener: Callback<ExtractEvent<T>>): typeof listener`

Subscribes to an event and adds the listener to the beginning of the listeners array.

- `event` (required): The event to subscribe to.
- `listener` (required): The event listener callback.
- Returns: The provided listener.

### `removeAllListeners(event?: E): void`

Removes all listeners for a specific event or for all events.

- `event` (optional): The event to remove listeners for. If not provided, all listeners for all events will be removed.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request in the [GitHub repository](https://github.com/EyadRealHim/unify-emitter).

## License

This project is licensed under the MIT License. See the [MIT LICENSE](https://opensource.org/licenses/MIT)
