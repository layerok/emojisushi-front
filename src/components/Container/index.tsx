import * as S from "./styled";

export const Container = ({ children, ...rest }) => {
  return <S.Container {...rest}>{children}</S.Container>;
};
