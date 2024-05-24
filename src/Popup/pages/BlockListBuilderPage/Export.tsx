import { blockListDownload, blockListExport } from "@/lib/blockListBuilder";
import {
  useBlockListBuilderUsers,
  useBlockListBuilderInfos,
} from "@/services/blockListBuilderStore";
import { Button } from "@/Popup/components/ui/button";

function Export() {
  const users = useBlockListBuilderUsers();
  const infos = useBlockListBuilderInfos();

  function exportBlockLists() {
    blockListDownload(blockListExport({ users, infos, id: "" }), infos.title);
  }

  const disabled = users.length === 0 || !infos.title;

  return (
    <Button onClick={exportBlockLists} className="m-auto" disabled={disabled}>
      Export
    </Button>
  );
}

export default Export;
