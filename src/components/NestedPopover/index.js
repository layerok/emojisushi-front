import React from "react";
import {
    FloatingTree,
    useFloatingParentNodeId
} from "@floating-ui/react-dom-interactions";
import {Popover} from "../Popover";

export const NestedPopover = (props) => {
    const parentId = useFloatingParentNodeId();

    if (parentId == null) {
        return (
            <FloatingTree>
                <Popover {...props} />
            </FloatingTree>
        );
    }

    return <Popover {...props} />;
};
