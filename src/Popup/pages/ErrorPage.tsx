import { useRouteError, ErrorResponse } from "react-router-dom";
import { NavigationBar } from "../components";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

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
