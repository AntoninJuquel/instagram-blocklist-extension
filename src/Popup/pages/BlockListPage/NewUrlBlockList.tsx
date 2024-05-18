import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/Popup/components/ui/button";
import { Input } from "@/Popup/components/ui/input";

interface NewUrlBlocklistProps {
  addUrlDisabled: (url: string) => string;
  onAddBlocklistURLs: (url: string) => void;
}

export function NewUrlBlocklist({
  addUrlDisabled,
  onAddBlocklistURLs,
}: NewUrlBlocklistProps) {
  const [newBlocklistUrl, setNewBlocklistUrl] = useState("");
  const canAddError = addUrlDisabled(newBlocklistUrl);
  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        id="blocklist-url"
        type="text"
        value={newBlocklistUrl}
        onChange={(e) => setNewBlocklistUrl(e.target.value)}
        placeholder="Paste block list URL here"
      />
      <Button
        type="button"
        variant="default"
        size="icon"
        title={canAddError || "Add block list"}
        disabled={Boolean(canAddError)}
        onClick={() => {
          onAddBlocklistURLs(newBlocklistUrl);
          setNewBlocklistUrl("");
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
