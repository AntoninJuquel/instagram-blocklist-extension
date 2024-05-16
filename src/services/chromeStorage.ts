import { createJSONStorage, StateStorage } from "zustand/middleware";
import { infoLog } from "@/utils/log";

const chromeStateStorage: StateStorage = {
  getItem: async (name: string) => {
    return new Promise((resolve) => {
      chrome.storage.sync.get(name, (result) => {
        infoLog("chromeStateStorage.getItem", name, result[name]);
        resolve(result[name]);
      });
    });
  },
  setItem: async (name: string, value: string) => {
    infoLog("chromeStateStorage.setItem", name, value);
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [name]: value }, () => {
        resolve(true);
      });
    });
  },
  removeItem: async (name: string) => {
    infoLog("chromeStateStorage.removeItem", name);
    return new Promise((resolve) => {
      chrome.storage.sync.remove(name, () => {
        resolve(true);
      });
    });
  },
};

export function chromeStorage<T>() {
  return createJSONStorage<T>(() => chromeStateStorage);
}
