import { useEffect } from "react";
import { useBlockLists, useBlockListActions } from "@/services/blockListStore";
import { exportBlockLists } from "@/lib/blockListBuilder";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyInlineCode,
} from "@/Popup/components/ui/typography";
import { Button } from "@/Popup/components/ui/button";
import BlockListItem from "./BlockListItem";
import { Message, MessageType } from "@/services/chrome/messaging";
import { BlockList as BlockListType } from "@/lib/types";

export function BlockList() {
  const blockLists = useBlockLists();
  const blockListActions = useBlockListActions();

  useEffect(() => {
    blockListActions.getBlockLists();

    const onUpdateMessage = (message: Message<[number[], BlockListType[]]>) => {
      if (message.type === MessageType.BLOCKLITS_UPDATED) {
        blockListActions.updateBlockList(...message.payload);
      }
    };

    chrome.runtime.onMessage.addListener(onUpdateMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(onUpdateMessage);
    };
  }, [blockListActions]);

  return (
    <div>
      <TypographyH1>Block Lists</TypographyH1>
      <Button onClick={() => exportBlockLists(blockLists)}>Export</Button>

      {blockLists.length === 0 && (
        <TypographyBlockquote>
          You don't have any block lists yet.
          <br />
          You can start by choosing a block list{" "}
          <TypographyInlineCode>
            <a
              href="https://blockout.lol/blocklists/"
              target="_blank"
              rel="noreferrer"
              title="Go to blockout block lists"
            >
              here
            </a>
          </TypographyInlineCode>
          .
        </TypographyBlockquote>
      )}

      {blockLists.map((blockList) => (
        <BlockListItem key={blockList.id} blockList={blockList} />
      ))}
    </div>
  );
}
