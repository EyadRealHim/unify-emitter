import UnifyEmitter from "../dist";

// Create an instance of UnifyEmitter
const emitter = new UnifyEmitter<{ myEvent: string }>();

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
