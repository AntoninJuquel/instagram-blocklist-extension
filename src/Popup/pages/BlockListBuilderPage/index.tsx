import Infos from "./Infos";
import Users from "./Users";
import Export from "./Export";

export default function BlockListBuilderPage() {
  return (
    <>
      <main className="my-auto">
        <Infos />
        <Users />
      </main>
      <footer className="flex sticky bottom-0 bg-background z-50 shadow-md-t p-2">
        <Export />
      </footer>
    </>
  );
}
