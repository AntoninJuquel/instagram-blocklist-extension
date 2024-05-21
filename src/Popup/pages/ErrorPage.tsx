import { useRouteError, ErrorResponse } from "react-router-dom";
import { errorLog } from "@/utils/log";
import NavigationBar from "@/Popup/components/NavigationBar";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  errorLog("ErrorPage", error);

  return (
    <div id="error-page">
      <NavigationBar />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.data}</i>
      </p>
    </div>
  );
}
