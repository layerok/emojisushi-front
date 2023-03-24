import React, { cloneElement, ReactElement, useEffect, useState } from "react";
import {
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
  FloatingNode,
  useFloatingNodeId,
  Placement,
} from "@floating-ui/react-dom-interactions";

export const Popover = ({
  children,
  render,
  placement,
  offset: passedOffset = 0,
  open: passedOpen = false,
}: {
  children: ReactElement;
  render: (props: {
    labelId: string;
    descriptionId: string;
    close: () => void;
  }) => ReactElement;
  placement?: Placement;
  offset?: number;
  open?: boolean;
}) => {
  const [open, setOpen] = useState(passedOpen);
  const nodeId = useFloatingNodeId();

  const { x, y, reference, floating, strategy, refs, update, context } =
    useFloating({
      open,
      onOpenChange: setOpen,
      middleware: [offset(passedOffset), flip(), shift()],
      placement,
    });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

  return (
    <FloatingNode id={nodeId}>
      {cloneElement(
        children,
        getReferenceProps({ ref: reference, ...children.props })
      )}
      {open && (
        <FloatingFocusManager
          context={context}
          modal={false}
          order={["reference", "content"]}
          returnFocus={false}
        >
          <div
            {...getFloatingProps({
              className: "Popover",
              ref: floating,
              style: {
                position: strategy,
                top: y ?? "",
                left: x ?? "",
                zIndex: 999,
              },
              "aria-labelledby": labelId,
              "aria-describedby": descriptionId,
            })}
          >
            {render({
              labelId,
              descriptionId,
              close: () => {
                setOpen(false);
              },
            })}
          </div>
        </FloatingFocusManager>
      )}
    </FloatingNode>
  );
};
