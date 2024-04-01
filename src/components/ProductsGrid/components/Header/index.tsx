import * as S from "./styled";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { UIButton } from "~common/ui-components/UIButton/UIButton";
import { DropdownPopover, SkeletonWrap, SortOrderSvg } from "~components";
import {
  SEARCH_QUERY_SEARCH_PARAM,
  SORT_MODE_KEYS,
  SORT_MODE_SEARCH_PARAM,
  SortModeEnum,
} from "~common/constants";
import { SortKey } from "~api/menu/menu.api.types";
import { useSearchParams, useSubmit } from "react-router-dom";

type THeaderProps = {
  title: string;
  loading?: boolean;
};

export const Header = ({ title, loading = false }: THeaderProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const q = searchParams.get(SEARCH_QUERY_SEARCH_PARAM);

  const titleOrSearch = q ? `${t("search.everywhere")} "${q}"` : title;

  const sorters = SORT_MODE_KEYS.map((key) => ({
    name: t(`sort.${key}`),
    id: key,
  }));

  const sortFromUrl = searchParams.get(SORT_MODE_SEARCH_PARAM) as SortKey;

  // todo: validate provided search params from url
  const initialSelectedIndex = SORT_MODE_KEYS.indexOf(
    sortFromUrl ? sortFromUrl : SortModeEnum.Default
  );

  const handleSorterChange = ({ option, index }) => {
    const fd = new FormData();

    Array.from(searchParams.entries())
      .filter(([key]) => key !== SORT_MODE_SEARCH_PARAM)
      .forEach(([key, val]) => {
        fd.append(key, val);
      });

    fd.append(SORT_MODE_SEARCH_PARAM, option.id);

    submit(fd);
  };
  return (
    <S.Header>
      <S.Title>
        {loading ? <Skeleton width={260} height={22} /> : titleOrSearch}
      </S.Title>
      <S.Controls style={{ marginLeft: "67px" }}>
        <DropdownPopover
          options={sorters}
          selectedIndex={initialSelectedIndex}
          onSelect={handleSorterChange}
        >
          {({ selectedOption }) => (
            <SkeletonWrap loading={loading}>
              <UIButton text={selectedOption.name}>
                <SortOrderSvg />
              </UIButton>
            </SkeletonWrap>
          )}
        </DropdownPopover>
      </S.Controls>
    </S.Header>
  );
};
