import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/Popup/components/ui/button";
import { Input } from "@/Popup/components/ui/input";

interface NewUrlBlocklistProps {
  addBlocklistDisabled: (url: string) => string | false;
  onAddBlocklist: (url: string) => void;
}

export function NewUrlBlocklist({
  addBlocklistDisabled,
  onAddBlocklist,
}: NewUrlBlocklistProps) {
  const [newBlocklistUrl, setNewBlocklistUrl] = useState("");
  const canAddError = addBlocklistDisabled(newBlocklistUrl);
  const disabled = canAddError !== false;
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
        title={canAddError !== undefined ? canAddError.toString() : undefined}
        disabled={disabled}
        onClick={() => {
          onAddBlocklist(newBlocklistUrl);
          setNewBlocklistUrl("");
        }}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
