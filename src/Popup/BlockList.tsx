import React from "react";
import { useBlockListActions, useBlockLists } from "../services/blockListStore";

export function BlockList() {
  const blockLists = useBlockLists();
  const actions = useBlockListActions();
  return (
    <div>
      <h1>Block List</h1>
      {blockLists.map((blockList, index) => (
        <div key={blockList.infos.url || blockList.infos.title || index}>
          <button onClick={() => actions.removeBlockList(index)}>Remove</button>
          <h2>{blockList.infos.title}</h2>
          <p>{blockList.infos.description}</p>
          <p>{blockList.infos.numUsers} users</p>
          <ul>
            {blockList.users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
