import { BlockLists } from "./BlockLists";
import { NewBlockList } from "./NewBlockList";

export default function BlockListPage() {
  return (
    <>
      <main className="my-auto">
        <BlockLists />
      </main>
      <footer className="sticky bottom-0 bg-background z-50 shadow-md-t px-2">
        <NewBlockList />
      </footer>
    </>
  );
}
