import { createUnifyEmitter } from "../dist";

// Create an instance of UnifyEmitter
const emitter = createUnifyEmitter<{ myEvent: string }>();

// Subscribe to the 'myEvent' event
emitter.on("myEvent", (data: string) => {
  console.log("Listener 1:", data);
});
emitter.on("myEvent", (data: string) => {
  console.log("Listener 2:", data);
});

// Get the count of listeners for the 'myEvent' event
const count = emitter.listenerCount("myEvent");
console.log("Number of listeners:", count); // Output:` Number of listeners: 2`
