import { isChunkLoadError } from "~utils/error.utils";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";

export const lazy =
  <V>(importComponent: () => Promise<V>) =>
  async () => {
    try {
      return await importComponent();
    } catch (e) {
      if (isChunkLoadError(e)) {
        NiceModal.show(ModalIDEnum.OutdatedAppWarning);
        // or we could auto reload window.location.reload
      }
      throw e;
    }
  };
