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
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div>{title}</div>
          <div>Click or drag a file</div>
        </div>
      )}
    </Dropzone>
  );
}
