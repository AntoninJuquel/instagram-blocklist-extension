import { create } from "zustand";
import { BlockList } from "@/lib/types";
import { MessageType, sendMessage } from "./chrome/messaging";

interface BlockListState {
  blockLists: BlockList[];
}

interface BlockListActions {
  getBlockLists: () => void;
  addBlockLists: (blockList: BlockList[]) => void;
  removeBlockList: (blockListsIDs: string[]) => void;
  updateBlockList: (indices: number[], blockLists: BlockList[]) => void;
}

interface BlockListStore extends BlockListState {
  actions: BlockListActions;
}

const useBlockListStore = create<BlockListStore>((set) => ({
  blockLists: [],
  actions: {
    async getBlockLists() {
      const res = await sendMessage({
        type: MessageType.GET_BLOCKLISTS,
        payload: null,
      });

      set(() => ({
        blockLists: res,
      }));
    },
    async addBlockLists(blockLists) {
      const res = await sendMessage({
        type: MessageType.ADD_BLOCKLISTS,
        payload: blockLists,
      });

      set(() => ({
        blockLists: res,
      }));
    },
    async removeBlockList(blockListsIDs) {
      const res = await sendMessage({
        type: MessageType.REMOVE_BLOCKLIST,
        payload: blockListsIDs,
      });

      set(() => ({
        blockLists: res,
      }));
    },
    updateBlockList(indices, blockLists) {
      set((state) => {
        const updatedBlockLists = [...state.blockLists];
        indices.forEach((index, i) => {
          updatedBlockLists[index] = blockLists[i];
        });

        return {
          blockLists: updatedBlockLists,
        };
      });
    },
  },
}));

export const useBlockLists = () =>
  useBlockListStore((state) => state.blockLists);

export const useBlockListActions = () =>
  useBlockListStore((state) => state.actions);
