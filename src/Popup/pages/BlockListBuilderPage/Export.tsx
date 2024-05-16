import React from "react";
import {
  blockListDownload,
  blockListExport
} from "../../../lib/blockListBuilder";
import {
  useBlockListBuilderUsers,
  useBlockListBuilderInfos
} from "../../../services/blockListBuilderStore";

function Export() {
  const users = useBlockListBuilderUsers();
  const infos = useBlockListBuilderInfos();

  function exportBlockLists() {
    blockListDownload(blockListExport({ users, infos }), infos.title);
  }
  return <button onClick={exportBlockLists}>Export</button>;
}

export default Export;
