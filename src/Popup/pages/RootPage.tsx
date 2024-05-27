import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import * as chromeStorage from "@/services/chrome/storage";
import NavigationBar from "@/Popup/components/NavigationBar";

export default function RootPage() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const lastVisited = await chromeStorage.getItem("lastVisited");
      if (lastVisited) {
        navigate(`${lastVisited}`);
      }
    })();
  }, [navigate]);

  const location = useLocation();
  useEffect(() => {
    chromeStorage.setItem("lastVisited", location.pathname);
  }, [location]);

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    console.log("dark", dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  return (
    <div className="w-[500px] h-[500px] flex flex-col h-full justify-between bg-background">
      <header className="sticky top-0 bg-background z-50 shadow-md">
        <NavigationBar />
      </header>
      <Outlet />
    </div>
  );
}
