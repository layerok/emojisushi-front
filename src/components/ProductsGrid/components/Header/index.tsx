import * as S from "./styled";
import { FlexBox } from "~components/FlexBox";
import { useIsDesktop } from "~common/hooks/useBreakpoint";
import { SortingPopover } from "~components/popovers/SortingPopover";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

type THeaderProps = {
  title: string;
  loading?: boolean;
};

export const Header = ({ title, loading = false }: THeaderProps) => {
  const search = ""; // todo: here must be react value
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const titleOrSearch = search
    ? `${t("search.everywhere")} "${search}"`
    : title;
  return (
    <S.Header>
      <S.Title>
        {loading ? <Skeleton width={260} height={22} /> : titleOrSearch}
      </S.Title>
      {isDesktop && (
        <FlexBox>
          {/*                   <FiltersModal>
                        <FiltersButton text={t('common.filters')}/>
                    </FiltersModal>*/}
          <div style={{ marginLeft: "67px" }}>
            <SortingPopover loading={loading} />
          </div>
        </FlexBox>
      )}
    </S.Header>
  );
};
