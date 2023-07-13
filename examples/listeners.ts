import { createUnifyEmitter } from "../dist";

// Create an instance of UnifyEmitter
const emitter = createUnifyEmitter<{ myEvent: string }>();

// Subscribe to the 'myEvent' event
emitter.on("myEvent", (data) => {
  console.log("Listener 1:", data);
});
emitter.on("myEvent", (data) => {
  console.log("Listener 2:", data);
});

// Retrieve listeners for the 'myEvent' event
const listeners = emitter.listeners("myEvent");

console.log(listeners); // Output: `[listener, listener]`
