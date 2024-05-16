import React from "react";
import { getCurrentTab } from "../../../lib/tabs";
import { BlockListUser } from "../../../lib/types";
import { getUserId, getUserName } from "../../../lib/blockListBuilder";
import {
  useBlockListBuilderUsers,
  useBlockListBuilderActions
} from "../../../services/blockListBuilderStore";

export default function Users() {
  const users = useBlockListBuilderUsers();
  const blockListBuilderActions = useBlockListBuilderActions();
  async function addCurrentUser() {
    const tab = await getCurrentTab();
    if (!tab || !tab.url) {
      return;
    }
    const user: BlockListUser = {
      id: (await getUserId(tab.url)) || "",
      name: await getUserName(tab.url)
    };
    blockListBuilderActions.addUser(user);
  }
  return (
    <div>
      {users.map((user, i) => (
        <div key={i}>
          <span>{user.id}</span>
          <span>{user.name}</span>
          <button onClick={() => blockListBuilderActions.removeUser(i)}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={addCurrentUser}>Add Current User</button>
    </div>
  );
}
