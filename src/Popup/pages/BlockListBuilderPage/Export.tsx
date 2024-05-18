import { blockListDownload, blockListExport } from "@/lib/blockListBuilder";
import { Button } from "@/Popup/components/ui/button";
import {
  useBlockListBuilderUsers,
  useBlockListBuilderInfos,
} from "@/services/blockListBuilderStore";

function Export() {
  const users = useBlockListBuilderUsers();
  const infos = useBlockListBuilderInfos();

  function exportBlockLists() {
    blockListDownload(blockListExport({ users, infos }), infos.title);
  }
  return (
    <Button onClick={exportBlockLists} className="m-auto">
      Export
    </Button>
  );
}

export default Export;
