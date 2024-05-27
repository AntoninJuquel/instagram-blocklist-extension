import Dropzone from "react-dropzone";
import { FileInput } from "lucide-react";
import { BlockList } from "@/lib/types";
import { readBlockListFiles } from "@/lib/blockListFile";
import { Button } from "@/Popup/components/ui/button";
import * as Typography from "@/Popup/components/ui/typography";

interface NewBlockListFileProps {
  onAddBlockLists: (blockLists: BlockList[]) => Promise<void>;
}

export function NewBlockListFile({ onAddBlockLists }: NewBlockListFileProps) {
  async function onDrop(files: File[]) {
    const blockLists = await readBlockListFiles(files);
    await onAddBlockLists(blockLists);
  }

  return (
    <Dropzone
      onDrop={onDrop}
      accept={{ "text/plain": [".txt"] }}
      useFsAccessApi={false}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className="grid w-full items-center text-center gap-1.5 p-4 border border-dashed border-gray-300 rounded-md cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Button className="m-auto">
            <FileInput className="mr-2 h-4 w-4" />
            Load Block List
          </Button>
          <Typography.Lead>Click or drag files</Typography.Lead>
        </div>
      )}
    </Dropzone>
  );
}
