import { DropzoneOptions } from "react-dropzone";
import { fetchBlockListURLs, validateBlockListURLs } from "@/lib/blockListUrl";
import { toBlockList } from "@/lib/blockListFile";
import { useBlockLists, useBlockListActions } from "@/services/blockListStore";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/Popup/components/ui/accordion";
import { NewUrlBlocklist } from "./NewUrlBlockList";
import { NewFileBlockList } from "./NewFileBlockList";

export function NewBlockList() {
  const blockLists = useBlockLists();
  const blockListActions = useBlockListActions();
  const activeBlockListUrls = blockLists
    .map((blockList) => blockList.infos.url)
    .filter((url) => url !== undefined);

  function addUrlDisabled(url: string) {
    const urls = validateBlockListURLs(url);
    if (!urls.length) {
      return "Please enter a valid URL for your external block list source.";
    }
    if (!urls.some((url) => !activeBlockListUrls.includes(url))) {
      return "This block list is already active.";
    }
    return false;
  }

  async function changeUrl(url: string, enabled: boolean) {
    const toAddOrRemove = validateBlockListURLs(url);
    const newUrls = enabled
      ? [
          ...activeBlockListUrls,
          ...toAddOrRemove.filter((url) => !activeBlockListUrls.includes(url)),
        ]
      : [
          ...activeBlockListUrls.filter(
            (url) => !toAddOrRemove.includes(url as string)
          ),
        ];

    const blockLists = await fetchBlockListURLs(newUrls.join("|"));

    blockListActions.addBlockList(...blockLists);
  }

  const loadBlockList: DropzoneOptions["onDrop"] = (files) => {
    let index = 0;
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.result && typeof reader.result === "string") {
        const blockList = toBlockList([undefined, reader.result]);
        blockListActions.addBlockList(...blockList);
      }
      if (++index < files.length) {
        reader.readAsText(files[index]);
      }
    };
    reader.readAsText(files[index]);
    return false;
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Add another block list</AccordionTrigger>
        <AccordionContent className="mt-2 pb-0">
          <NewUrlBlocklist
            addBlocklistDisabled={addUrlDisabled}
            onAddBlocklist={(url) => changeUrl(url, true)}
          />
          <NewFileBlockList title="Load Block List" onDrop={loadBlockList} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
