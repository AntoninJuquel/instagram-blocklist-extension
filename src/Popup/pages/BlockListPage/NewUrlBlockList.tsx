import { useState } from "react";

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
    <div>
      <h2>Add another block list</h2>
      <div>
        <input
          type="text"
          value={newBlocklistUrl}
          onChange={(e) => setNewBlocklistUrl(e.target.value)}
          placeholder="Paste block list URL here"
        />
      </div>
      <div>
        <button
          type="button"
          title={canAddError !== undefined ? canAddError.toString() : undefined}
          disabled={disabled}
          onClick={() => {
            onAddBlocklist(newBlocklistUrl);
            setNewBlocklistUrl("");
          }}
        >
          + Add Block List
        </button>
      </div>
    </div>
  );
}
