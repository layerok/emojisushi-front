import * as S from "./styled";

export const ButtonOutline = (
    {
        children,
        width
    }) => {
    return <S.Button width={width}>
        {children}
    </S.Button>
}