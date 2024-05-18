import { createHashRouter, RouterProvider } from "react-router-dom";
import {
  RootPage,
  ErrorPage,
  BlockListPage,
  BlockListBuilderPage,
} from "@/Popup/pages";

const router = createHashRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <BlockListPage />,
      },
      {
        path: "/builder",
        element: <BlockListBuilderPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
