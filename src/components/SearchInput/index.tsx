import * as S from "./styled";
import { SvgIcon, MagnifierSvg, Input } from "~components";
import { useTranslation } from "react-i18next";

export const SearchInput = ({ ...rest }: any) => {
  const { t } = useTranslation();
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
