import UnifyEmitter from "../dist";

// Create an instance of UnifyEmitter
const emitter = new UnifyEmitter<{ myEvent: string }>();

// Set the maximum number of listeners for the 'myEvent' event to 2
emitter.setMaxListeners("myEvent", 2);

// Subscribe to the 'myEvent' event
emitter.on("myEvent", (data: string) => {
  console.log("Listener 1:", data);
});
emitter.on("myEvent", (data: string) => {
  console.log("Listener 2:", data);
});

// Emit the 'myEvent' event
emitter.emit("myEvent", "Hello, world!"); // Output: `Listener 1: Hello, world!` and `Listener 2: Hello, world!`

// Subscribe to the 'myEvent' event with another listener
emitter.on("myEvent", (data: string) => {
  console.log("Listener 3:", data);
}); // This listener will not be called due to the maximum listener limit

// Emit the 'myEvent' event again
emitter.emit("myEvent", "Hello again!"); // Output: `Listener 1: Hello again!` and `Listener 2: Hello again!`
