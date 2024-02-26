import { RouterProvider } from "react-router-dom";
import "normalize.css";
import { theme } from "~theme";
import { ThemeProvider } from "styled-components";
import { Preloader } from "~layout/Preloader";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "~query-client";
import { Suspense, useEffect } from "react";
import { Loader } from "~components";
import NiceModal from "@ebay/nice-modal-react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { router } from "~router";
import { ModalIDEnum } from "~common/modal.constants";
import { AppUpdateModal } from "~components/modals/AppUpdateModal";
import { appVersionQuery } from "~queries/app-version.query";
import { appConfig } from "~config/app";

console.log("app version", appConfig.version);

export const App = () => {
  useEffect(() => {
    return router.subscribe((state) => {
      if (window.require_reload) {
        const { location } = state;
        const { search, pathname } = location;
        window.location.href = pathname + search;
      }

      if (queryClient.getQueryData(appVersionQuery.queryKey)) {
        return;
      }

      queryClient
        .fetchQuery({
          ...appVersionQuery,
          staleTime: 5 * 60 * 1000, // check every 5 minutes
        })
        .then((res) => {
          if (appConfig.version !== res.version) {
            // versions doesn't match, user has old version of application
            // set a flag and reload the page when user navigates to the different url
            window.require_reload = true;
          }
        });
    });
  }, []);

  return (
    <Suspense fallback={<Loader loading={true} />}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <SkeletonTheme baseColor="#1F1F1F" highlightColor="#2F2F2F">
              <NiceModal.Provider>
                <RouterProvider
                  fallbackElement={<Preloader />}
                  router={router}
                />
                <AppUpdateModal id={ModalIDEnum.OutdatedAppWarning} />
              </NiceModal.Provider>
            </SkeletonTheme>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </I18nextProvider>
    </Suspense>
  );
};
