import * as S from "./styled";
import {
  Chip,
  FlexBox,
  Input,
  MagnifierSvg,
  SortingPopover,
  SvgIcon,
} from "~components";
import { ICategory } from "~api/types";
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
import { EndAdornment } from "~common/ui/EndAdornment";

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
  const q = searchParams.get("q");

  const debouncedFetch = useDebounce((form) => {
    const isFirstSearch = q == null;
    submit(form, {
      replace: !isFirstSearch,
    });
  }, 500);

  const handleChange = (event) => {
    debouncedFetch(event.currentTarget.form);
  };
  return (
    <S.Sidebar>
      <S.Controls>
        <S.SearchContainer>
          <Form role="search">
            {Array.from(searchParams.entries())
              .filter(([k]) => k !== "q")
              .map(([k, v], idx) => (
                <input type="hidden" name={k} defaultValue={v} key={idx} />
              ))}
            <Input
              // I'm changing key to reset input value
              key={location.pathname}
              onChange={handleChange}
              name="q"
              defaultValue={q}
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
          <SortingPopover loading={loading} />
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
