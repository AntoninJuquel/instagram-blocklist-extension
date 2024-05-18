import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import * as chromeStorage from "./chrome/storage";
import { BlockList, BlockListUser, BlockListInfo } from "@/lib/types";

interface BlockListBuilderState extends BlockList {}

interface BlockListBuilderActions {
  addUser: (user: BlockListUser) => void;
  removeUser: (index: number) => void;
  removeAllUsers: () => void;
  setInfo: (info: Partial<BlockListInfo>) => void;
}

interface BlockListBuilderStore extends BlockListBuilderState {
  actions: BlockListBuilderActions;
}

const useBlockListBuilderStore = create<BlockListBuilderStore>()(
  persist(
    (set) => ({
      id: "",
      users: [],
      infos: {
        title: "",
        description: "",
        url: undefined,
        numUsers: 0,
      },
      actions: {
        addUser: (user) =>
          set((state) => ({
            users: [...state.users, user],
            infos: { ...state.infos, numUsers: state.infos.numUsers + 1 },
          })),
        removeUser: (index) =>
          set((state) => ({
            users: state.users.filter((_, i) => i !== index),
            infos: { ...state.infos, numUsers: state.infos.numUsers - 1 },
          })),
        removeAllUsers: () =>
          set((state) => ({
            users: [],
            infos: { ...state.infos, numUsers: 0 },
          })),
        setInfo: (infos) =>
          set((state) => ({ infos: { ...state.infos, ...infos } })),
      },
    }),
    {
      name: "blockListBuilder",
      storage: createJSONStorage(() => chromeStorage),
      partialize: (state) => ({
        users: state.users,
        infos: state.infos,
      }),
    }
  )
);

export const useBlockListBuilderUsers = () =>
  useBlockListBuilderStore((state) => state.users);

export const useBlockListBuilderInfos = () =>
  useBlockListBuilderStore((state) => state.infos);

export const useBlockListBuilderActions = () =>
  useBlockListBuilderStore((state) => state.actions);
