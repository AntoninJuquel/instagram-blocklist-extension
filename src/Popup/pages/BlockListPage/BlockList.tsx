import { useBlockLists } from "@/services/blockListStore";
import { exportBlockLists } from "@/lib/blockListBuilder";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyInlineCode,
} from "@/Popup/components/ui/typography";
import { Button } from "@/Popup/components/ui/button";
import BlockListItem from "./BlockListItem";

export function BlockList() {
  const blockLists = useBlockLists();
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
              href="https://blockout-porusdev-67ac7a714795659fa1e213cc69bbf8f42378a551a3231.gitlab.io/blocklists/"
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

      {blockLists.map((blockList, index) => (
        <BlockListItem
          key={blockList.infos.url || blockList.infos.title || index}
          blockList={blockList}
          index={index}
        />
      ))}
    </div>
  );
}
