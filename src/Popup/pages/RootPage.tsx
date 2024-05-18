import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { StorageValue } from "zustand/middleware";
import { NavigationBar } from "@/Popup/components";
import { chromeStorage } from "@/services/chromeStorage";

export default function RootPage() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const lastVisited = await chromeStorage<string>()?.getItem("lastVisited");
      if (lastVisited) {
        navigate(`${lastVisited}`);
      }
    })();
  }, [navigate]);

  const location = useLocation();
  useEffect(() => {
    chromeStorage<string>()?.setItem(
      "lastVisited",
      location.pathname as unknown as StorageValue<string>
    );
  }, [location]);

  return (
    <div className="w-[500px] h-[500px]">
      <header className="sticky top-0 bg-background z-10 shadow-md">
        <NavigationBar />
      </header>
      <Outlet />
    </div>
  );
}
