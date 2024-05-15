import { create } from "zustand";
import { BlockList } from "../lib/types";

interface BlockListActions {
  addBlockList: (...blockList: BlockList[]) => void;
  removeBlockList: (index: number) => void;
}

interface BlockListState {
  blockLists: Array<BlockList>;
}

interface BlockListStore extends BlockListState {
  actions: BlockListActions;
}

const useBlockListStore = create<BlockListStore>((set) => ({
  blockLists: [],
  actions: {
    addBlockList: (...blockList) =>
      set((state) => ({ blockLists: [...state.blockLists, ...blockList] })),
    removeBlockList: (index) =>
      set((state) => ({
        blockLists: state.blockLists.filter((_, i) => i !== index)
      }))
  }
}));

export const useBlockLists = () =>
  useBlockListStore((state) => state.blockLists);

export const useBlockListActions = () =>
  useBlockListStore((state) => state.actions);
