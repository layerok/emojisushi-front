import { CSSProperties, ReactNode, useId, useState } from "react";
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  FloatingPortal,
  FloatingOverlay,
} from "@floating-ui/react";

export type IBaseModalProps = {
  open?: boolean;
  overlayStyles: CSSProperties;
  children:
    | ReactNode
    | {
        (props: {
          close: () => void;
          labelId: string;
          descriptionId: string;
        }): ReactNode;
      };
  onClose?: () => void;
};

export const BaseModal = ({
  children,
  overlayStyles,
  open: passedOpen = false,
  onClose,
}: IBaseModalProps) => {
  const [open, baseSetOpen] = useState(passedOpen);
  const [allowDismiss, setAllowDismiss] = useState(true);

  const setOpen = (state: boolean) => {
    if (!state) {
      onClose?.();
    }
    baseSetOpen(state);
  };

  const { context, refs } = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, {
      enabled: allowDismiss,
    }),
  ]);

  return (
    <FloatingPortal>
      {open && (
        <FloatingOverlay lockScroll style={{ ...overlayStyles }}>
          <div
            {...getFloatingProps({
              ref: refs.setFloating,
              "aria-labelledby": labelId,
              "aria-describedby": descriptionId,
            })}
          >
            {typeof children === "function"
              ? children({
                  close: () => setOpen(false),
                  labelId,
                  descriptionId,
                })
              : children}
          </div>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};
