import * as S from "./styled";
import { VerticalMenu } from "./VerticalMenu";
import {
  useIsDesktop,
  useIsMobile,
  useIsTablet,
} from "~common/hooks/useBreakpoint";
import { HorizontalMenu } from "./HorizontalMenu";
import { FlexBox } from "~components/FlexBox";
import { UnderVerticalMenu } from "./UnderVerticalMenu";
import { SortingPopover } from "~components/popovers/SortingPopover";
import { observer } from "mobx-react";
import { useDebounce } from "~common/hooks/useDebounce";
import { useProductsStore } from "~hooks/use-categories-store";
import { useCategoriesStore } from "~hooks/use-products-store";
import { ICategory } from "~api/menu.api.types";
import Skeleton from "react-loading-skeleton";

type SidebarProps = { showSkeleton?: boolean; categories?: ICategory[] };

export const Sidebar = observer(
  ({ showSkeleton = false, categories = [] }: SidebarProps) => {
    const isMobile = useIsMobile();
    const isDesktop = useIsDesktop();

    return (
      <S.Sidebar>
        <FlexBox
          style={{ width: "100%" }}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={isMobile ? "column" : "row"}
        >
          <Search showSkeleton={showSkeleton} />

          {!isDesktop && <NotDesktopView showSkeleton={showSkeleton} />}
        </FlexBox>
        {isDesktop ? (
          <>
            <VerticalMenu categories={categories} showSkeleton={showSkeleton} />
            <UnderVerticalMenu showSkeleton={showSkeleton} />
          </>
        ) : (
          <HorizontalMenu showSkeleton={showSkeleton} categories={categories} />
        )}
      </S.Sidebar>
    );
  }
);

const Search = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  const ProductsStore = useProductsStore();
  const CategoriesStore = useCategoriesStore();
  const isTablet = useIsTablet();

  const debouncedFetch = useDebounce((e) => {
    let filter =
      "&category_id=" +
      CategoriesStore.publishedCategories.map((_) => _.id).join(".");
    if (ProductsStore.search.length === 0) {
      filter = "";
    }
    ProductsStore.fetchItems({
      ...ProductsStore.lastParams,
      filter,
    });
  }, 500);

  if (showSkeleton) {
    return (
      <S.SearchContainer
        style={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Skeleton
          borderRadius={10}
          width={isTablet ? 255 : "100%"}
          height={40}
        />
      </S.SearchContainer>
    );
  }

  return (
    <S.SearchContainer>
      <S.SearchInput
        handleInput={(e) => {
          ProductsStore.setSearch(e.target.value);
          debouncedFetch();
        }}
        value={ProductsStore.search}
      />
    </S.SearchContainer>
  );
};

const NotDesktopView = ({
  showSkeleton = false,
}: {
  showSkeleton?: boolean;
}) => {
  const isMobile = useIsMobile();
  return (
    <FlexBox
      justifyContent={isMobile ? "space-between" : "flex-end"}
      style={{
        width: "100%",
      }}
    >
      {/* <FiltersModal>
        <FiltersButton text={t("common.filters")} />
      </FiltersModal> */}
      <div
        style={{
          marginLeft: "30px",
        }}
      >
        <SortingPopover showSkeleton={showSkeleton} />
      </div>
    </FlexBox>
  );
};
