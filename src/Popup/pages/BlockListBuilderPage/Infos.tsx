import {
  useBlockListBuilderInfos,
  useBlockListBuilderActions,
} from "@/services/blockListBuilderStore";
import * as Typography from "@/Popup/components/ui/typography";
import { Input } from "@/Popup/components/ui/input";
import { Textarea } from "@/Popup/components/ui/textarea";

export default function Infos() {
  const infos = useBlockListBuilderInfos();
  const blockListBuilderActions = useBlockListBuilderActions();
  return (
    <div>
      <div>
        <Input
          type="text"
          placeholder="Title"
          value={infos.title}
          onChange={(e) =>
            blockListBuilderActions.setInfo({ title: e.target.value })
          }
        />
      </div>
      <div>
        <Textarea
          placeholder="Description"
          value={infos.description}
          onChange={(e) =>
            blockListBuilderActions.setInfo({ description: e.target.value })
          }
        />
      </div>
      <Typography.Code>Number of users: {infos.numUsers}</Typography.Code>
    </div>
  );
}
