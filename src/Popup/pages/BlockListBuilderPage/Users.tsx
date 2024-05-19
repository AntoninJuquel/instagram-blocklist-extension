import { getCurrentTab } from "@/services/chrome/tabs";
import { BlockListUser } from "@/lib/types";
import { getUserId, getUserName } from "@/lib/blockListBuilder";
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
import { Trash } from "lucide-react";

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
      name: await getUserName(tab.url),
      blocked: false,
    };
    blockListBuilderActions.addUser(user);
  }
  return (
    <Table className="caption-top">
      <TableCaption>
        <Button onClick={addCurrentUser}>Add Current User</Button>
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
