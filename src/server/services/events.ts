/**
 * Event Service for Discworld.
 */
let queue: { eventName: string; sender: any; args: any[]; }[] = [];
let events: { [eventName: string]: Function[] } = {};

export function on (eventName: string, callback: (data?: any) => void) {
  if (!events[eventName]) events[eventName] = [];
  events[eventName].push(callback);
}
export function emit (eventName: string, sender: any, ...args: any[]) {
  queue.push({
    eventName: eventName,
    sender: sender,
    args: args
  });
}
export function process () {
  // processes all the events queued
  // each queued event calls the listener with
  // the data given to it
  while (queue.length > 0) {
    // dequeue first event
    const event = queue.shift()!;
    const callbacks = events[event.eventName];

    if (!callbacks || callbacks.length === 0) {
      console.log(`No handlers for event "${event.eventName}".`);
      return;
    }

    for (let cb of callbacks) {
      cb(...event.args);
    }
  }
}