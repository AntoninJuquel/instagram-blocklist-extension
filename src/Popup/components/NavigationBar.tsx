import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/Popup/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar() {
  const location = useLocation();
  return (
    <Tabs
      defaultValue={location.pathname === "/" ? "blockLists" : "builder"}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="blockLists" asChild>
          <Link to="/" replace>
            Block List
          </Link>
        </TabsTrigger>
        <TabsTrigger value="builder" asChild>
          <Link to="/builder" replace>
            Builder
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="blockLists" />
      <TabsContent value="builder" />
    </Tabs>
  );
}
