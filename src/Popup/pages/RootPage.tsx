import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavigationBar } from "../components";
import { chromeStorage } from "../../services/chromeStorage";
import { StorageValue } from "zustand/middleware";

export default function RootPage() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const lastVisited = await chromeStorage<string>()?.getItem("lastVisited");
      if (lastVisited) {
        console.log("lastVisited", lastVisited);
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
    <div id="root-page">
      <NavigationBar />
      <Outlet />
    </div>
  );
}
