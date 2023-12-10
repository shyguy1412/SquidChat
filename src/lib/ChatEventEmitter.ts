import EventEmitter from "events";

export const ChatEventEmitter = new EventEmitter();

ChatEventEmitter.setMaxListeners(0);