import { Trash, Download, Link } from "lucide-react";
import { useBlockListActions } from "@/services/blockListStore";
import {
  TypographyBlockquote,
  TypographyH4,
  TypographyInlineCode,
  TypographyList,
} from "@/Popup/components/ui/typography";
import { Button } from "@/Popup/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/Popup/components/ui/accordion";
import { BlockList } from "@/lib/types";
import { exportBlockLists } from "@/lib/blockListBuilder";
import { errorLog } from "@/utils/log";

export interface BlockListItemProps {
  blockList: BlockList;
  index: number;
}

export default function BlockListItem({
  blockList,
  index,
}: BlockListItemProps) {
  const actions = useBlockListActions();

  async function copyURLToClipboard() {
    if (!blockList.infos.url) {
      return errorLog("copyURLToClipboard", "URL not found");
    }

    await navigator.clipboard.writeText(blockList.infos.url || "");
  }

  return (
    <div>
      <TypographyH4>{blockList.infos.title}</TypographyH4>
      <div className="flex justify-between items-center w-full">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => actions.removeBlockList(index)}
          title="Delete blocklist"
        >
          <Trash className="h-4 w-4" />
        </Button>
        <div>
          <Button
            variant="default"
            size="icon"
            title="Export blocklist"
            onClick={() => exportBlockLists([blockList])}
          >
            <Download className="h-4 w-4" />
          </Button>
          {blockList.infos.url && (
            <Button
              variant="secondary"
              size="icon"
              title="Share blocklist"
              onClick={copyURLToClipboard}
            >
              <Link className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <TypographyBlockquote>{blockList.infos.description}</TypographyBlockquote>
      <TypographyInlineCode>
        {blockList.infos.numUsers} users
      </TypographyInlineCode>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Show</AccordionTrigger>
          <AccordionContent>
            <TypographyList>
              {blockList.users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </TypographyList>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
