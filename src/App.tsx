import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "normalize.css";
import { theme } from "~theme";
import { ThemeProvider } from "styled-components";
import { observer } from "mobx-react";
import { routes } from "~routes";
import { Preloader } from "~layout/Preloader";

const router = createBrowserRouter(routes);

const FallbackElement = () => {
  return <Preloader />;
};

export const App = observer(() => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterProvider fallbackElement={<FallbackElement />} router={router} />
      </div>
    </ThemeProvider>
  );
});
