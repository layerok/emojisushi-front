import * as S from "./styled";
import { SortingPopover } from "~components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

type THeaderProps = {
  title: string;
  loading?: boolean;
};

export const Header = ({ title, loading = false }: THeaderProps) => {
  const search = ""; // todo: here must be react value
  const { t } = useTranslation();
  const titleOrSearch = search
    ? `${t("search.everywhere")} "${search}"`
    : title;
  return (
    <S.Header>
      <S.Title>
        {loading ? <Skeleton width={260} height={22} /> : titleOrSearch}
      </S.Title>
      <S.Controls style={{ marginLeft: "67px" }}>
        <SortingPopover loading={loading} />
      </S.Controls>
    </S.Header>
  );
};
