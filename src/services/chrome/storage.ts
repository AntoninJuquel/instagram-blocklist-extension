import { infoLog } from "@/utils/log";

export async function getItem<T>(key: string) {
  const result = await chrome.storage.local.get(key);
  const value = result[key];
  infoLog("chrome.storage.local.get", key, value);
  if (value === undefined) {
    return null;
  }
  return value as T;
}

export async function setItem<T>(key: string, value: T) {
  infoLog("chrome.storage.local.set", key, value);
  await chrome.storage.local.set({ [key]: value });
}

export async function removeItem(key: string) {
  infoLog("chrome.storage.local.remove", key);
  await chrome.storage.local.remove(key);
}

export async function clear() {
  infoLog("chrome.storage.local.clear", "");
  await chrome.storage.local.clear();
}
