import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "normalize.css";
import { theme } from "~theme";
import { ThemeProvider } from "styled-components";
import { observer } from "mobx-react";
import { routes } from "~routes";
import { Preloader } from "~layout/Preloader";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

const router = createBrowserRouter(routes);

const FallbackElement = () => {
  return <Preloader />;
};

export const App = observer(() => {
  return (
    <ThemeProvider theme={theme}>
      <SkeletonTheme baseColor="#1F1F1F" highlightColor="#2F2F2F">
        <div className="App">
          <RouterProvider
            fallbackElement={<FallbackElement />}
            router={router}
          />
        </div>
      </SkeletonTheme>
    </ThemeProvider>
  );
});
