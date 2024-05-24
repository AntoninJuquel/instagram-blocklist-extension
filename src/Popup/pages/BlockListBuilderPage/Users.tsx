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
    if (currentUser) {
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

  return (
    <Table className="caption-top">
      <TableCaption>
        <Button onClick={addCurrentUser} disabled={!currentUser}>
          {currentUser
            ? `Add ${currentUser.name}`
            : currentUser === false
            ? "Not on Instagram Profile"
            : "Loading..."}
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
            >
              <Trash className="h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...users].reverse().map((user, i) => (
          <TableRow key={i}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.id}</TableCell>
            <TableCell className="text-right">
              <Button
                size="icon"
                variant="destructive"
                onClick={() =>
                  blockListBuilderActions.removeUser(users.length - 1 - i)
                }
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
