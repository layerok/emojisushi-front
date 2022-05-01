import * as S from "./styled";


export const SvgIcon = ({children,color="white", width, height, style={}}) => {
    return (
        <S.Parent style={{
            color,
            width,
            height,
            ...style
        }}>
            {children}
        </S.Parent>
    )
}