import * as S from "./styled";

export const FlexBox = (
    {
        alignItems = "start",
        flexDirection = "row",
        justifyContent = "start",
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
            responsive={responsive}
            {...rest}
        >{children}</S.Flex>
    )
}