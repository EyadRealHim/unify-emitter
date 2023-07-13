import { createUnifyEmitter } from "../dist";

// Create an instance of UnifyEmitter
const emitter = createUnifyEmitter<{ myEvent: string }>();

// Subscribe to the 'myEvent' event + Define an event listener function
const eventListener = emitter.on("myEvent", (data) => {
  console.log("Event emitted:", data);
});

// Emit the 'myEvent' event
emitter.emit("myEvent", "Hello, world!"); // Output: `Event emitted: Hello, world!`
emitter.emit("myEvent", "Hello, world!"); // Output: `Event emitted: Hello, world!`

// Unsubscribe from the 'myEvent' event
emitter.off("myEvent", eventListener);

// Emit the 'myEvent' event again
emitter.emit("myEvent", "Hello again!"); // No output, as the listener was unsubscribed
