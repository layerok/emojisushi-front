import * as S from "./styled";

export const Heading = ({children,...style}) => {
    return (
        <S.Text {
            ...style
                }>
            {children}
        </S.Text>
    )
}