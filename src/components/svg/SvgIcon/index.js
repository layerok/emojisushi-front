import * as S from "./styled";


export const SvgIcon = ({children,color="white", width,style={}}) => {
    return (
        <S.Parent style={{
            color,
            width,
            ...style
        }}>
            {children}
        </S.Parent>
    )
}