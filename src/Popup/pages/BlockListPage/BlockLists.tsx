import { useEffect } from "react";
import { BlockList } from "@/lib/types";
import { exportBlockLists } from "@/lib/blockListBuilder";
import { useBlockLists, useBlockListActions } from "@/services/blockListStore";
import { Message, MessageType } from "@/services/chrome/messaging";
import * as Typography from "@/Popup/components/ui/typography";
import { Button } from "@/Popup/components/ui/button";
import BlockListItem from "./BlockListItem";

export function BlockLists() {
  const blockLists = useBlockLists();
  const blockListActions = useBlockListActions();

  useEffect(() => {
    blockListActions.getBlockLists();

    const onUpdateMessage = (message: Message<[string[], BlockList[]]>) => {
      if (message.type === MessageType.BLOCKLITS_UPDATED) {
        blockListActions.updateBlockLists(...message.payload);
      }
    };

    chrome.runtime.onMessage.addListener(onUpdateMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(onUpdateMessage);
    };
  }, [blockListActions]);

  const totalBlockedUsers = blockLists.reduce(
    (acc, blockList) =>
      acc + blockList.users.filter((user) => user.blocked).length,
    0
  );

  return (
    <div>
      <Typography.Code>
        {blockLists.length} block list{blockLists.length > 1 ? "s" : ""}
      </Typography.Code>
      <br />
      <Typography.Code>
        {totalBlockedUsers} user{totalBlockedUsers > 1 ? "s" : ""} blocked
      </Typography.Code>
      <br />
      <Button onClick={() => exportBlockLists(blockLists)}>Export</Button>

      {blockLists.length === 0 && (
        <Typography.Blockquote>
          You don't have any block lists yet.
          <br />
          You can start by choosing a block list{" "}
          <Typography.Code>
            <a
              href="https://blockout.lol/blocklists/"
              target="_blank"
              rel="noreferrer"
              title="Go to blockout block lists"
            >
              here
            </a>
          </Typography.Code>
          .
        </Typography.Blockquote>
      )}

      {blockLists.map((blockList) => (
        <BlockListItem key={blockList.id} blockList={blockList} />
      ))}
    </div>
  );
}
