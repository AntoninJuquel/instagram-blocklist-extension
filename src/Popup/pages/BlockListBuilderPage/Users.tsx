import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { BlockListUser } from "@/lib/types";
import { getCurrentUser } from "@/lib/blockListBuilder";
import {
  useBlockListBuilderUsers,
  useBlockListBuilderActions,
} from "@/services/blockListBuilderStore";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/Popup/components/ui/table";
import { Button } from "@/Popup/components/ui/button";

export default function Users() {
  const [currentUser, setCurrentUser] = useState<BlockListUser | null | false>(
    null
  );
  const users = useBlockListBuilderUsers();
  const blockListBuilderActions = useBlockListBuilderActions();

  async function addCurrentUser() {
    if (currentUser && !alreadyAdded()) {
      blockListBuilderActions.addUser(currentUser);
    }
  }

  useEffect(() => {
    async function handleTabUpdate() {
      try {
        setCurrentUser(null);
        setCurrentUser(await getCurrentUser());
      } catch (e) {
        setCurrentUser(false);
      }
    }

    handleTabUpdate();

    chrome.tabs.onUpdated.addListener(handleTabUpdate);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    };
  }, []);

  function alreadyAdded() {
    if (currentUser)
      return users.find((user) => user.id === currentUser.id) !== undefined;

    return false;
  }

  function buttonMessage() {
    if (currentUser) {
      if (alreadyAdded()) {
        return "User already added";
      }
      return `Add ${currentUser.name}`;
    } else if (currentUser === false) {
      return "Not on Instagram Profile";
    } else {
      return "Loading...";
    }
  }
  return (
    <Table className="caption-top">
      <TableCaption>
        <Button
          onClick={addCurrentUser}
          disabled={!currentUser || alreadyAdded()}
        >
          {buttonMessage()}
        </Button>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Id</TableHead>
          <TableHead className="text-right">
            <Button
              size="icon"
              variant="destructive"
              onClick={blockListBuilderActions.removeAllUsers}
              title={`Remove all users`}
              disabled={users.length === 0}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...users].reverse().map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell className="text-right">
              <Button
                size="icon"
                variant="destructive"
                onClick={() => blockListBuilderActions.removeUser(user.id)}
                title={`Remove ${user.name}`}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
