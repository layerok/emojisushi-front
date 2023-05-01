import * as S from "./styled";
import { useBreakpoint2 } from "~common/hooks";
import { SortingPopover, FlexBox } from "~components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

type THeaderProps = {
  title: string;
  loading?: boolean;
};

export const Header = ({ title, loading = false }: THeaderProps) => {
  const search = ""; // todo: here must be react value
  const { t } = useTranslation();
  const breakpoint = useBreakpoint2();
  const titleOrSearch = search
    ? `${t("search.everywhere")} "${search}"`
    : title;
  return (
    <S.Header>
      <S.Title>
        {loading ? <Skeleton width={260} height={22} /> : titleOrSearch}
      </S.Title>
      {breakpoint.isDesktop && (
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
