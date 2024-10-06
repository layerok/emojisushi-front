import * as S from "./styled";
import {
  Chip,
  DropdownPopover,
  FlexBox,
  Input,
  MagnifierSvg,
  SkeletonWrap,
  SortOrderSvg,
  SvgIcon,
} from "~components";

import { ICategory, SortKey } from "@layerok/emojisushi-js-sdk";
import { ChipCloud } from "~components";
import {
  Form,
  NavLink,
  useLocation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { ROUTES } from "~routes";
import { useTranslation } from "react-i18next";
import { useDebounce } from "~common/hooks";
import { EndAdornment } from "~common/ui-components/EndAdornment";
import {
  SEARCH_QUERY_SEARCH_PARAM,
  SORT_MODE_KEYS,
  SORT_MODE_SEARCH_PARAM,
  SortModeEnum,
} from "~common/constants";
import { UIButton } from "~common/ui-components/UIButton/UIButton";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

export const MobSidebar = ({
  loading = false,
  categories = [],
}: SidebarProps) => {
  // todo: make it sticky
  const submit = useSubmit();
  const location = useLocation();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const query = searchParams.get(SEARCH_QUERY_SEARCH_PARAM);

  const [debouncedSearchChange] = useDebounce((form) => {
    const isFirstSearch = query == null;
    submit(form, {
      replace: !isFirstSearch,
      preventScrollReset: true,
    });
  }, 500);

  const handleSearchChange = (event) => {
    debouncedSearchChange(event.currentTarget.form);
  };

  const options = SORT_MODE_KEYS.map((key) => ({
    name: t(`sort.${key}`),
    id: key,
  }));

  const sortFromUrl = searchParams.get(SORT_MODE_SEARCH_PARAM) as SortKey;

  // todo: validate provided search params from url
  const initialSelectedIndex = SORT_MODE_KEYS.indexOf(
    sortFromUrl ? sortFromUrl : SortModeEnum.Default
  );

  const handleSortModeChange = ({ option, index }) => {
    const fd = new FormData();

    Array.from(searchParams.entries())
      .filter(([key]) => key !== SORT_MODE_SEARCH_PARAM)
      .forEach(([key, val]) => fd.append(key, val));

    fd.append(SORT_MODE_SEARCH_PARAM, option.id);

    submit(fd, {
      action: location.pathname,
      preventScrollReset: true,
    });
  };

  const inputs = Array.from(searchParams.entries())
    .filter(([k]) => k !== SEARCH_QUERY_SEARCH_PARAM)
    .map(([k, v], idx) => (
      <input type="hidden" name={k} defaultValue={v} key={idx} />
    ));

  return (
    <S.Sidebar>
      <S.Controls>
        <S.SearchContainer>
          <Form role="search" action={location.pathname}>
            {inputs}
            <Input
              // I'm changing key to reset input value
              key={location.pathname}
              onChange={handleSearchChange}
              name={SEARCH_QUERY_SEARCH_PARAM}
              defaultValue={query}
              loading={loading}
              endAdornment={
                <EndAdornment>
                  <SvgIcon color={"white"} width={"25px"} height={"25px"}>
                    <MagnifierSvg />
                  </SvgIcon>
                </EndAdornment>
              }
              placeholder={t("search.input_search")}
            />
          </Form>
        </S.SearchContainer>

        <FlexBox justifyContent={"flex-end"}>
          <SkeletonWrap loading={loading}>
            <DropdownPopover
              options={options}
              selectedIndex={initialSelectedIndex}
              onSelect={handleSortModeChange}
            >
              {({ selectedOption }) => (
                <UIButton text={selectedOption.name}>
                  <SortOrderSvg />
                </UIButton>
              )}
            </DropdownPopover>
          </SkeletonWrap>
        </FlexBox>
      </S.Controls>

      <ChipCloud loading={loading}>
        {loading ? (
          <>
            <Chip skeletonWidth={80} loading />
            <Chip skeletonWidth={120} loading />
            <Chip skeletonWidth={90} loading />
            <Chip skeletonWidth={100} loading />
            <Chip skeletonWidth={80} loading />
            <Chip skeletonWidth={80} loading />
            <Chip skeletonWidth={105} loading />
          </>
        ) : (
          categories.map((item) => {
            return (
              <NavLink
                key={item.id}
                style={{ textDecoration: "none", flexShrink: 0 }}
                preventScrollReset
                to={ROUTES.CATEGORY.SHOW.buildPath({
                  categorySlug: item.slug,
                })}
              >
                {({ isActive }) => <Chip isActive={isActive}>{item.name}</Chip>}
              </NavLink>
            );
          })
        )}
      </ChipCloud>
    </S.Sidebar>
  );
};
