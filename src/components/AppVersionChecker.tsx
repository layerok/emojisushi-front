import { PropsWithChildren, useEffect } from "react";
import { router } from "~router";
import { ModalIDEnum } from "~common/modal.constants";
import { checkAppVersionAsync } from "~checkAppVersion";
import { useModal, useShowModal } from "~modal";

const DEFAULT_STALE_TIME = 10_000;

export const AppVersionChecker = ({
  children,
  staleTime = DEFAULT_STALE_TIME,
}: PropsWithChildren<{
  staleTime?: number;
}>) => {
  const modal = useModal(ModalIDEnum.OutdatedAppWarning);
  useEffect(() => {
    return router.subscribe((state) => {
      if (state.navigation.location) {
        // don't reload during pending navigation
        return;
      }
      if (window.require_reload) {
        modal.show();
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
