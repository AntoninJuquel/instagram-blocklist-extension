import { useEffect, useState } from "react";
import { checkUserConnection } from "@/services/instagram";
import * as Typography from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlockListsPage, BlockListBuilderPage } from "@/Popup/pages";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";

export default function App() {
  const [connected, setConnected] = useState(false);

  useTheme();

  useEffect(() => {
    chrome.storage.local.get("activeTab", (data) => {
      setActiveTab(data.activeTab || "blockLists");
    });

    (async () => {
      try {
        await checkUserConnection();
        setConnected(true)
      } catch (error) {
        setConnected(false)
      }
    })();
  }, []);

  const [activeTab, setActiveTab] = useState<string>("blockLists");

  async function onTabChange(tab: string) {
    await chrome.storage.local.set({ activeTab: tab });
    setActiveTab(tab);
  }

  return (
    <div className="w-[500px] h-full flex flex-col justify-between bg-background">

      <Tabs value={activeTab} onValueChange={onTabChange}>
        <header className="sticky top-0 z-50 shadow-md pt-2 bg-background">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blockLists">Block Lists</TabsTrigger>
            <TabsTrigger value="builder">Builder</TabsTrigger>
          </TabsList>
        </header>
        <TabsContent value="blockLists">
          {!connected && <div className="text-center">
            <Typography.Lead className="text-destructive">Failed to connect to Instagram</Typography.Lead>
            <Typography.Lead className="text-destructive">You won't be able to block users if you are not logged in</Typography.Lead>
            <Button asChild variant='link' className="text-destructive font-bold">
              <a href="https://www.instagram.com" target="_blank" >Open Instagram</a>
            </Button>
          </div>}
          <BlockListsPage />
        </TabsContent>
        <TabsContent value="builder">
          <BlockListBuilderPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
