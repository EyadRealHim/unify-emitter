import UnifyEmitter from "../dist";

// Create an instance of UnifyEmitter
const emitter = new UnifyEmitter<{ myEvent: string }>();

// Define event listeners
const listener1 = (data: string) => {
  console.log("Listener 1:", data);
};

const listener2 = (data: string) => {
  console.log("Listener 2:", data);
};

// Subscribe to the 'myEvent' event
emitter.on("myEvent", listener1);
emitter.on("myEvent", listener2);

// Emit the 'myEvent' event
emitter.emit("myEvent", "Hello, world!"); // Output: Listener 1: Hello, world! and Listener 2: Hello, world!

// Remove all listeners for the 'myEvent' event
emitter.removeListeners("myEvent");

// Emit the 'myEvent' event again
emitter.emit("myEvent", "Hello again!"); // No output, as all listeners were removed

// Bonus Tip: Remove all listeners in all events
emitter.removeListeners(); // Will remove all the listeners in all events
