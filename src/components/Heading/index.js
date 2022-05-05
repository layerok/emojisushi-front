import * as S from "./styled";

export const Heading = ({children,...style}) => {
    return (
        <S.text {
            ...style
                }>
            {children}
        </S.text>

    )
}