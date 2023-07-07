import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "normalize.css";
import { theme } from "~theme";
import { ThemeProvider } from "styled-components";
import { routes } from "~routes";
import { Preloader } from "~layout/Preloader";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "~query-client";
import { Suspense } from "react";
import { Loader } from "~components";

const router = createBrowserRouter(routes);

const FallbackElement = () => {
  return <Preloader />;
};

export const App = () => {
  return (
    <Suspense fallback={<Loader loading={true} />}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SkeletonTheme baseColor="#1F1F1F" highlightColor="#2F2F2F">
            <RouterProvider
              fallbackElement={<FallbackElement />}
              router={router}
            />
          </SkeletonTheme>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </Suspense>
  );
};
