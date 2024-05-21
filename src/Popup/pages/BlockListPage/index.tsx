import { BlockLists } from "./BlockLists";
import { NewBlockList } from "./NewBlockList";

export default function BlockListPage() {
  return (
    <div className="flex flex-col h-full justify-between">
      <main className="mb-auto">
        <BlockLists />
      </main>
      <footer className="sticky bottom-0 bg-background z-10 shadow-md-t">
        <NewBlockList />
      </footer>
    </div>
  );
}
