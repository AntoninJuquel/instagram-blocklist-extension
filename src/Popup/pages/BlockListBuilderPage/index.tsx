import Users from "./Users";
import Infos from "./Infos";
import Export from "./Export";

export default function BlockListBuilderPage() {
  return (
    <div className="flex flex-col h-full justify-between">
      <main className="mb-auto">
        <Infos />
        <Users />
      </main>
      <footer className="flex sticky bottom-0 z-10">
        <Export />
      </footer>
    </div>
  );
}
