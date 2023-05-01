import * as S from "./styled";
import { SvgIcon, MagnifierSvg, Input } from "~components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

export const SearchInput = ({ loading, ...rest }: any) => {
  const { t } = useTranslation();
  if (loading) {
    return <Skeleton width="100%" height={40} />;
  }
  return (
    <S.Search>
      <Input placeholder={t("search.input_search")} {...rest} />
      <S.IconBtn>
        <SvgIcon color={"white"} width={"25px"} height={"25px"}>
          <MagnifierSvg />
        </SvgIcon>
      </S.IconBtn>
    </S.Search>
  );
};
