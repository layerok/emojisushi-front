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
import { Suspense } from "react";
import { Loader } from "~components";
import NiceModal from "@ebay/nice-modal-react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { router } from "~router";
import { ModalIDEnum } from "~common/modal.constants";
import { AppUpdateModal } from "~components/modals/AppUpdateModal";

export const App = () => {
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
