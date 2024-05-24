import { Trash, Download, Link, Check, X, RefreshCcw } from "lucide-react";
import { errorLog } from "@/utils/log";
import { BlockList } from "@/lib/types";
import { exportBlockLists } from "@/lib/blockListBuilder";
import { useBlockListActions } from "@/services/blockListStore";
import * as Typography from "@/Popup/components/ui/typography";
import { Button } from "@/Popup/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/Popup/components/ui/accordion";
import { Progress } from "@/Popup/components/ui/progress";

export interface BlockListItemProps {
  blockList: BlockList;
}

export default function BlockListItem({ blockList }: BlockListItemProps) {
  const actions = useBlockListActions();

  async function copyURLToClipboard() {
    if (!blockList.infos.url) {
      return errorLog("copyURLToClipboard", "URL not found");
    }

    await navigator.clipboard.writeText(blockList.infos.url);
  }

  const blockedUsers = blockList.users.filter((user) => user.blocked);
  const progress = (blockedUsers.length / blockList.users.length) * 100;

  return (
    <div>
      <Typography.H4>{blockList.infos.title}</Typography.H4>
      <div className="flex justify-between items-center w-full">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => actions.removeBlockList([blockList.id])}
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
            <>
              <Button
                variant="secondary"
                size="icon"
                title="Share blocklist"
                onClick={copyURLToClipboard}
              >
                <Link className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Refresh blocklist"
                onClick={() => actions.checkBlocklistsUpdate([blockList.id])}
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      <Typography.Blockquote>
        {blockList.infos.description}
      </Typography.Blockquote>
      <Typography.Code>
        {progress === 100
          ? `${blockedUsers.length} users blocked`
          : `${blockedUsers.length}/${blockList.users.length} users blocked`}
      </Typography.Code>
      <Progress value={progress} title="Blocked users" />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Show</AccordionTrigger>
          <AccordionContent>
            <Typography.Ul className="my-0 list-none">
              {blockList.users.map((user) => (
                <li key={user.id}>
                  {user.blocked ? (
                    <Check className="h-4 w-4 text-green-500 inline" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 inline" />
                  )}{" "}
                  {user.name}
                </li>
              ))}
            </Typography.Ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
