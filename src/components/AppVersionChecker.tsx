import { PropsWithChildren, useEffect } from "react";
import { router } from "~router";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";
import { checkAppVersionAsync } from "~checkAppVersion";

const DEFAULT_STALE_TIME = 10_000;

export const AppVersionChecker = ({
  children,
  staleTime = DEFAULT_STALE_TIME,
}: PropsWithChildren<{
  staleTime?: number;
}>) => {
  useEffect(() => {
    return router.subscribe((state) => {
      if (state.navigation.location) {
        // don't reload during pending navigation
        return;
      }
      if (window.require_reload) {
        NiceModal.show(ModalIDEnum.OutdatedAppWarning);
        //window.location.href = state.location.pathname + state.location.search;
      }
      checkAppVersionAsync(
        () => {
          window.require_reload = true;
        },
        {
          interval: staleTime,
        }
      );
    });
  }, [staleTime]);

  return <>{children}</>;
};
