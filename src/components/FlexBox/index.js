import * as S from "./styled";
import {forwardRef} from "react";

export const FlexBox = forwardRef((
    {
        alignItems = "start",
        flexDirection = "row",
        justifyContent = "start",
        mobileFirst = true,
        responsive = [],
        children,
        ...rest
    }, ref
) => {
    return (
        <S.Flex
            ref={ref}
            alignItems={alignItems}
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            mobileFirst={mobileFirst}
            {...rest}
        >{children}</S.Flex>
    )
})