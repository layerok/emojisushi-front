import * as S from "./styled";

export const OdessaMap = (
    {
        children,
        width,
        height,
        topLeft,
        topRight,
        bottomRight,
        bottomLeft,
        style
    }) => {
    return (
        <S.Background style={
            {
                width,
                height,
                borderTopRightRadius: topRight,
                borderTopLeftRadius: topLeft,
                borderBottomLeftRadius: bottomLeft,
                borderBottomRightRadius: bottomRight,
                ...style

            }
        }>

            {children}
        </S.Background>

    )
}

OdessaMap.defaultProps = {
    topLeft: "0",
    topRight: "0",
    bottomRight: "0",
    bottomLeft: "0",
}