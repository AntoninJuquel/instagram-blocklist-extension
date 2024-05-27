import { useState } from "react";
import { Plus } from "lucide-react";
import { BlockList } from "@/lib/types";
import { fetchBlockListURLs, validateBlockListURLs } from "@/lib/blockListUrl";
import { useBlockLists } from "@/services/blockListStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewBlockListURLProps {
  onAddBlockLists: (blockLists: BlockList[]) => Promise<void>;
}

export function NewBlockListURL({ onAddBlockLists }: NewBlockListURLProps) {
  const blockLists = useBlockLists();
  const [newBlocklistUrl, setNewBlocklistUrl] = useState("");

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
    return "";
  }

  async function onAddBlocklistURLs(url: string) {
    const newUrls = validateBlockListURLs(url);
    const blockLists = await fetchBlockListURLs(newUrls.join("|"));
    await onAddBlockLists(blockLists);
    setNewBlocklistUrl("");
  }

  const canAddError = addUrlDisabled(newBlocklistUrl);
  return (
    <div className="flex w-full items-center justify-between my-2">
      <Input
        id="blocklist-url"
        type="text"
        value={newBlocklistUrl}
        onChange={(e) => setNewBlocklistUrl(e.target.value)}
        placeholder="Paste block list URL here"
        className="w-[90%]"
      />
      <Button
        type="button"
        variant="default"
        size="icon"
        title={canAddError || "Add block list"}
        disabled={Boolean(canAddError)}
        onClick={() => onAddBlocklistURLs(newBlocklistUrl)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
