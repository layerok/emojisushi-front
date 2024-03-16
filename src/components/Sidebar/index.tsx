import { ICategory } from "~api/types";
import { SidebarMenu, Socials, WishlistsMenuItem } from "./components";
import styled from "styled-components";
import { media } from "~common/custom-media";
import { useRef } from "react";
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDebounce } from "~common/hooks";
import { Input, inputClasses, MagnifierSvg, SvgIcon } from "~components";
import { EndAdornment } from "~common/ui/EndAdornment";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

const STICKY_SIDEBAR_CONTAINER_OFFSET = 30;

const SEARCH_QUERY_SEARCH_PARAM = "q";

export const Sidebar = ({ loading = false, categories = [] }: SidebarProps) => {
  const rootRef = useRef<null | HTMLDivElement>(null);
  const submit = useSubmit();
  const location = useLocation();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const q = searchParams.get(SEARCH_QUERY_SEARCH_PARAM);

  const goUp = () => {
    let top = rootRef.current.offsetTop - STICKY_SIDEBAR_CONTAINER_OFFSET;

    window.scrollTo({
      top,
      behavior: "auto",
    });
  };

  const debouncedFetch = useDebounce((form) => {
    const isFirstSearch = q == null;
    submit(form, {
      replace: !isFirstSearch,
    });
    // don't scroll up immediately, wait for the products to update and then scroll up
    setTimeout(() => {
      goUp();
    });
  }, 500);

  const handleChange = (event) => {
    debouncedFetch(event.currentTarget.form);
  };

  const handleCategoryChange = () => {
    setTimeout(() => {
      goUp();
    });
  };

  const searchParamsInputs = Array.from(searchParams.entries())
    .filter(([k]) => k !== SEARCH_QUERY_SEARCH_PARAM)
    .map(([k, v], idx) => (
      <input type="hidden" name={k} defaultValue={v} key={idx} />
    ));

  return (
    <Root ref={rootRef}>
      <StickyContainer>
        <SearchBarContainer>
          <Form role="search">
            {searchParamsInputs}
            <StyledInput
              // I'm changing key to reset input value
              key={location.pathname}
              onChange={handleChange}
              name={SEARCH_QUERY_SEARCH_PARAM}
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
        </SearchBarContainer>
        <SidebarMenu
          onNavigate={handleCategoryChange}
          categories={categories}
          loading={loading}
        />
        <WishlistsMenuItem
          onNavigate={handleCategoryChange}
          loading={loading}
        />
        <Socials loading={loading} />
      </StickyContainer>
    </Root>
  );
};

const StyledInput = styled(Input)`
  // remove the input outline, otherwise it will be chopped off by the sidebar container
  // which is not nice
  .${inputClasses.input}:focus {
    outline: none;
  }
`;

const StickyContainer = styled.div`
  position: sticky;
  top: ${STICKY_SIDEBAR_CONTAINER_OFFSET}px;
  overflow: auto;
  max-height: calc(100vh - ${STICKY_SIDEBAR_CONTAINER_OFFSET * 2}px);
`;

const Root = styled.aside`
  margin-bottom: 30px;
  flex-shrink: 0;
  ${media.lessThan("pc")`
    display: none;
  `}

  margin-right: 30px;
  width: 255px;
`;

const SearchBarContainer = styled.div`
  margin-bottom: 0;
`;
