import { createUnifyEmitter } from "../dist";

// Create an instance of UnifyEmitter
const emitter = createUnifyEmitter<{ myEvent: string }>();

// Subscribe to the 'myEvent' event once
emitter.once("myEvent", (data) => {
  console.log("Event emitted:", data);
});

// Emit the 'myEvent' event
emitter.emit("myEvent", "Hello, world!"); // Output: `Event emitted: Hello, world!`

// Emit the 'myEvent' event again
emitter.emit("myEvent", "Hello again!"); // No output, as the listener was automatically unsubscribed
