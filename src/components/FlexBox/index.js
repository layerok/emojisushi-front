import * as S from "./styled";
import {withResponsive} from "../../common/hoc/withResponsive";

const FlexBoxRaw = (
    {
        alignItems = "start",
        flexDirection = "row",
        justifyContent = "start",
        mobileFirst = true,
        responsive = [],
        children,
        ...rest
    }
) => {
    return (
        <S.Flex
            alignItems={alignItems}
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            mobileFirst={mobileFirst}
            responsive={responsive}
            {...rest}
        >{children}</S.Flex>
    )
}

export const FlexBox = withResponsive(FlexBoxRaw);