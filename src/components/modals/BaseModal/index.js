import {cloneElement, forwardRef, useEffect, useId, useLayoutEffect, useRef, useState} from "react";
import {
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    FloatingPortal,
    FloatingNode,
    FloatingTree,
    useFloatingNodeId,
    useFloatingTree,
    FloatingOverlay, useFloatingParentNodeId,
} from "@floating-ui/react-dom-interactions";

function getChildren(tree, id) {
    let allChildren =
        tree?.nodesRef.current.filter(
            (node) => node.parentId === id && node?.context?.open
        ) ?? [];
    let currentChildren = allChildren;

    while (currentChildren.length) {
        currentChildren =
            tree?.nodesRef.current.filter((node) =>
                currentChildren?.some(
                    (n) => node.parentId === n.id && node?.context?.open
                )
            ) ?? [];

        allChildren = allChildren.concat(currentChildren);
    }

    return allChildren;
}


export const BaseModalComponent = forwardRef((
    {
        render,
        overlayStyles,
        open: passedOpen = false,
        children,
        onClick
    }, ref
) => {
    const [open, setOpen] = useState(passedOpen);
    const [allowDismiss, setAllowDismiss] = useState(true);
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();

    const { reference, floating, context, refs } = useFloating({
        open,
        onOpenChange: setOpen
    });

    const id = useId();
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useClick(context),
        useRole(context),
        useDismiss(context, {
            enabled: allowDismiss,
        })
    ]);

    const tree = useFloatingTree();

    useEffect(() => {

        function onTreeOpenChange(
            {
                open,
                reference,
                parentId: dataParentId,
                nodeId: dataNodeId
            }
        ) {
            if (nodeId === dataParentId) {
                // если открылка дочерний модал, то запрещаем закрывать родительский пока не закрыли дочерний
                setAllowDismiss(!open);
            }

        }

        tree?.events.on("openChange", onTreeOpenChange);

        return () => {
            tree?.events.off("openChange", onTreeOpenChange);
        };
    }, [nodeId, open, parentId, tree, refs.reference]);

    useEffect(() => {
        tree?.events.emit("openChange", {
            open,
            parentId,
            nodeId,
            reference: refs.reference.current
        });
    }, [nodeId, parentId, tree, open, refs.reference]);

    const close = () => setOpen(false);

    return (
        <FloatingNode id={nodeId}>
            <div style={{cursor: 'pointer', display: 'flex'}}>
                {cloneElement(
                    children,
                    getReferenceProps({ ref: reference, ...children.props })
                )}
            </div>
            <FloatingPortal>
                {open && (
                    <FloatingOverlay
                        lockScroll
                        style={{...overlayStyles}}
                    >
                        <div
                            {...getFloatingProps({
                                ref: floating,
                                "aria-labelledby": labelId,
                                "aria-describedby": descriptionId
                            })}
                        >
                            {render({
                                close,
                                labelId,
                                descriptionId
                            })}
                        </div>
                    </FloatingOverlay>
                )}
            </FloatingPortal>
        </FloatingNode>
    );
});

export const BaseModal = forwardRef((props, ref) => {
    const parentId = useFloatingParentNodeId();

    if (parentId == null) {
        return (
            <FloatingTree >
                <BaseModalComponent {...props} ref={ref}/>
            </FloatingTree>
        )
    }

    return <BaseModalComponent {...props} ref={ref}/>

})