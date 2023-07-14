import UnifyEmitter from "../dist";

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
