import * as S from "./styled";
import { LoadMoreButton } from "~components";
import { useTranslation } from "react-i18next";

type TFooterProps = {
  loadingMore?: boolean;
  loading?: boolean;
  handleLoadMore: () => void;
};

export const Footer = ({
  loadingMore = false,
  handleLoadMore,
  loading = false,
}: TFooterProps) => {
  const { t } = useTranslation();
  if (loading) {
    return null;
  }
  return (
    <S.Footer>
      <LoadMoreButton
        loading={loadingMore}
        style={{ cursor: "pointer" }}
        text={t("common.show_more")}
        onClick={handleLoadMore}
      />
    </S.Footer>
  );
};
