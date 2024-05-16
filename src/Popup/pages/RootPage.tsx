import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { NavigationBar } from "../components";
import { chromeStorage } from "../../services/chromeStorage";

export default function RootPage() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const lastVisited = await chromeStorage?.getItem("lastVisited");
      if (lastVisited) {
        console.log("lastVisited", lastVisited);
        navigate(`${lastVisited}`);
      }
    })();
  }, []);

  const location = useLocation();
  useEffect(() => {
    chromeStorage?.setItem("lastVisited", location.pathname as any);
  }, [location]);

  return (
    <div id="root-page">
      <NavigationBar />
      <Outlet />
    </div>
  );
}
