export enum MessageType {
  GET_BLOCKLISTS = "GET_BLOCKLISTS",
  ADD_BLOCKLISTS = "ADD_BLOCKLISTS",
  REMOVE_BLOCKLIST = "REMOVE_BLOCKLIST",
  TOGGLE_BLOCKLIST = "TOGGLE_BLOCKLIST",
  BLOCKLITS_UPDATED = "BLOCKLITS_UPDATED",
}

export interface Message<T> {
  type: MessageType;
  payload: T;
}

export async function sendMessage<T>(message: Message<T>) {
  return chrome.runtime.sendMessage(message);
}
