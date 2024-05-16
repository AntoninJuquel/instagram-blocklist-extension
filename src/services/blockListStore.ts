import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chromeStorage } from "./chromeStorage";
import { BlockList } from "../lib/types";

interface BlockListState {
  blockLists: Array<BlockList>;
}

interface BlockListActions {
  addBlockList: (...blockList: BlockList[]) => void;
  removeBlockList: (index: number) => void;
}

interface BlockListStore extends BlockListState {
  actions: BlockListActions;
}

const useBlockListStore = create<BlockListStore>()(
  persist(
    (set) => ({
      blockLists: [],
      actions: {
        addBlockList: (...blockList) =>
          set((state) => ({ blockLists: [...state.blockLists, ...blockList] })),
        removeBlockList: (index) =>
          set((state) => ({
            blockLists: state.blockLists.filter((_, i) => i !== index)
          }))
      }
    }),
    {
      name: "blockLists",
      storage: chromeStorage,
      partialize: (state) => ({ blockLists: state.blockLists })
    }
  )
);

export const useBlockLists = () =>
  useBlockListStore((state) => state.blockLists);

export const useBlockListActions = () =>
  useBlockListStore((state) => state.actions);
