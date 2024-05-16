import { DropzoneOptions } from "react-dropzone";
import {
  fetchBlockListURLs,
  validateBlockListURLs,
} from "../../../lib/blockListUrl";
import { toBlockList } from "../../../lib/blockListFile";
import {
  useBlockLists,
  useBlockListActions,
} from "../../../services/blockListStore";
import { enableBlockLists } from "../../../lib/blockList";
import {
  blockListDownload,
  blockListExport,
  blockListMerge,
} from "../../../lib/blockListBuilder";
import { NewUrlBlocklist } from "./NewUrlBlockList";
import { NewFileBlockList } from "./NewFileBlockList";
import { BlockList } from "./BlockList";

export default function BlockListPage() {
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
      : [...activeBlockListUrls.filter((url) => !toAddOrRemove.includes(url as string))];

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

  function exportBlockLists() {
    blockListDownload(blockListExport(blockListMerge(blockLists)));
  }

  return (
    <div>
      <button onClick={() => enableBlockLists(blockLists)}>Block Users</button>
      <BlockList />
      <NewUrlBlocklist
        addBlocklistDisabled={addUrlDisabled}
        onAddBlocklist={(url) => changeUrl(url, true)}
      />
      <NewFileBlockList title="Load Block List" onDrop={loadBlockList} />
      <button onClick={exportBlockLists}>Export</button>
    </div>
  );
}
