import {
  useBlockListBuilderInfos,
  useBlockListBuilderActions
} from "../../../services/blockListBuilderStore";

export default function Infos() {
  const infos = useBlockListBuilderInfos();
  const blockListBuilderActions = useBlockListBuilderActions();
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={infos.title}
          onChange={(e) =>
            blockListBuilderActions.setInfo({ title: e.target.value })
          }
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={infos.description}
          onChange={(e) =>
            blockListBuilderActions.setInfo({ description: e.target.value })
          }
        />
      </div>
      <p>Number of users: {infos.numUsers}</p>
    </div>
  );
}
