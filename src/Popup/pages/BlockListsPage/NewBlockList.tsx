import { warnLog } from "@/utils/log";
import { BlockList } from "@/lib/types";
import { validateBlockLists } from "@/lib/blockList";
import { useBlockListActions } from "@/services/blockListStore";
import * as Typography from "@/components/ui/typography";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { NewBlockListURL } from "./NewBlockListURL";
import { NewBlockListFile } from "./NewBlockListFile";

export function NewBlockList() {
  const blockListActions = useBlockListActions();
  async function onAddBlockLists(blockLists: BlockList[]) {
    const validBlockLists = validateBlockLists(blockLists);
    const removedBlockLists = blockLists.length - validBlockLists.length;
    if (removedBlockLists) {
      warnLog(
        "NewBlockList",
        `Discarded ${removedBlockLists} block lists with no users.`
      );
    }
    await blockListActions.addBlockLists(validBlockLists);
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Add another block list</AccordionTrigger>
        <AccordionContent className="mt-2 px-2">
          <Typography.Muted className="text-center">
            Get more Block Lists{" "}
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
          </Typography.Muted>
          <NewBlockListURL onAddBlockLists={onAddBlockLists} />
          <NewBlockListFile onAddBlockLists={onAddBlockLists} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
