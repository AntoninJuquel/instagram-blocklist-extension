import { infoLog } from "@/utils/log";
import { BlockList } from "@/lib/types";
import { Message, MessageType, sendMessage } from "@/services/chrome/messaging";
import * as chromStorage from "@/services/chrome/storage";
import { toggleBlockLists } from "@/lib/blockList";
import Queue from "queue";

infoLog("background", "background script is running");

const q = new Queue({ concurrency: 1, autostart: true });

async function isPopupOpen() {
  return (
    (
      await chrome.runtime.getContexts({
        contextTypes: [chrome.runtime.ContextType.POPUP],
      })
    ).length > 0
  );
}

async function onGetBlockLists() {
  infoLog("background", "getting blocklists");
  return (await chromStorage.getItem<BlockList[]>("blockLists")) || [];
}

async function onAddBlockLists(newBlockLists: BlockList[]) {
  infoLog("background", "adding blocklists", newBlockLists);
  const blockLists =
    (await chromStorage.getItem<BlockList[]>("blockLists")) || [];
  const updatedBlockLists = blockLists.concat(newBlockLists);
  await chromStorage.setItem("blockLists", updatedBlockLists);
  onToggleBlockList(
    newBlockLists.map((blockList) => blockList.id),
    true
  );
  return updatedBlockLists;
}

async function onRemoveBlockLists(blockListsIDs: string[]) {
  infoLog("background", "removing blocklists", blockListsIDs);
  const blockLists = await chromStorage.getItem<BlockList[]>("blockLists");
  if (!blockLists) {
    return [];
  }
  const updatedBlockLists = blockLists.filter(
    (blockList) => !blockListsIDs.includes(blockList.id)
  );
  await chromStorage.setItem("blockLists", updatedBlockLists);
  return updatedBlockLists;
}

async function onToggleBlockList(blockListsIDs: string[], enable: boolean) {
  infoLog("background", "toggling blocklist", blockListsIDs);

  q.push(async () => {
    const blockLists = await chromStorage.getItem<BlockList[]>("blockLists");
    if (!blockLists) {
      return [];
    }
    const blockListsToToggle = blockLists.filter((blockList) =>
      blockListsIDs.includes(blockList.id)
    );
    await toggleBlockLists(
      blockListsToToggle,
      enable,
      async (blockListID, userIndex) => {
        const blockLists =
          (await chromStorage.getItem<BlockList[]>("blockLists")) || [];
        const updatedBlockLists = [...blockLists];
        const index = updatedBlockLists.findIndex(
          (blockList) => blockList.id === blockListID
        );

        if (index === -1) {
          infoLog("background", "blocklist not found", blockListID);
          return false;
        }

        updatedBlockLists[index].users[userIndex].blocked = enable;
        await chromStorage.setItem("blockLists", updatedBlockLists);
        if (await isPopupOpen()) {
          sendMessage({
            type: MessageType.BLOCKLITS_UPDATED,
            payload: [[index], [updatedBlockLists[index]]],
          });
        }

        return true;
      }
    );
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  infoLog("background", "received message", sender, message);
  const { type, payload } = message as Message<unknown>;
  (async () => {
    switch (type) {
      case MessageType.GET_BLOCKLISTS:
        sendResponse(await onGetBlockLists());
        break;
      case MessageType.ADD_BLOCKLISTS:
        sendResponse(await onAddBlockLists(payload as BlockList[]));
        break;
      case MessageType.REMOVE_BLOCKLIST:
        sendResponse(await onRemoveBlockLists(payload as string[]));
        break;
      case MessageType.TOGGLE_BLOCKLIST:
        onToggleBlockList(...(payload as [string[], boolean]));
        sendResponse(true);
        break;
      default:
        break;
    }
  })();

  return true;
});