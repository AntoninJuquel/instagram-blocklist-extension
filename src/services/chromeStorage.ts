import { createJSONStorage, StateStorage } from "zustand/middleware";

const chromeStateStorage: StateStorage = {
  getItem: async (name: string) => {
    console.log("chromeStateStorage.getItem", name);
    return new Promise((resolve) => {
      chrome.storage.sync.get(name, (result) => {
        resolve(result[name]);
      });
    });
  },
  setItem: async (name: string, value: any) => {
    console.log("chromeStateStorage.setItem", name, value);
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [name]: value }, () => {
        resolve(true);
      });
    });
  },
  removeItem: async (name: string) => {
    console.log("chromeStateStorage.removeItem", name);
    return new Promise((resolve) => {
      chrome.storage.sync.remove(name, () => {
        resolve(true);
      });
    });
  }
};

export const chromeStorage = createJSONStorage(() => chromeStateStorage);
