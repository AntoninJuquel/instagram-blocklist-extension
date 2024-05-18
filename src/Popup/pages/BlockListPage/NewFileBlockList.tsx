import { Button } from "@/Popup/components/ui/button";
import { TypographyLead } from "@/Popup/components/ui/typography";
import Dropzone, { DropzoneOptions } from "react-dropzone";

export function NewFileBlockList({
  accept,
  title,
  onDrop,
}: {
  accept?: DropzoneOptions["accept"];
  title: string;
  onDrop: DropzoneOptions["onDrop"];
}) {
  return (
    <Dropzone onDrop={onDrop} accept={accept} useFsAccessApi={false}>
      {({ getRootProps, getInputProps }) => (
        <div
          className="grid w-full items-center text-center gap-1.5 p-4 border border-dashed border-gray-300 rounded-md cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Button className="m-auto">{title}</Button>
          <TypographyLead>Click or drag files</TypographyLead>
        </div>
      )}
    </Dropzone>
  );
}
