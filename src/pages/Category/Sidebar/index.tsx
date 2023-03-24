import * as S from "./styled";
import { VerticalMenu } from "../VerticalMenu";
import { useBreakpoint } from "~common/hooks/useBreakpoint";
import { HorizontalMenu } from "../HorizontalMenu";
import { FlexBox } from "~components/FlexBox";
import { UnderVerticalMenu } from "../UnderVerticalMenu";
import { SortingPopover } from "~components/popovers/SortingPopover";
import { observer } from "mobx-react";
import { useDebounce } from "~common/hooks/useDebounce";
import { useProductsStore } from "~hooks/use-categories-store";
import { useCategoriesStore } from "~hooks/use-products-store";

export const Sidebar = observer(() => {
  const ProductsStore = useProductsStore();
  const CategoriesStore = useCategoriesStore();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  const debouncedFetch = useDebounce((e) => {
    let filter =
      "&category_id=" + CategoriesStore.items.map((_) => _.id).join(".");
    if (ProductsStore.search.length === 0) {
      filter = "";
    }
    ProductsStore.fetchItems({
      ...ProductsStore.lastParams,
      filter,
    });
  }, 500);

  return (
    <S.Sidebar>
      <FlexBox
        style={{ width: "100%" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={isMobile ? "column" : "row"}
      >
        <S.SearchInput
          handleInput={(e) => {
            ProductsStore.setSearch(e.target.value);
            debouncedFetch();
          }}
          value={ProductsStore.search}
        />

        {breakpoint !== "pc" && (
          <FlexBox
            justifyContent={isMobile ? "space-between" : "flex-end"}
            style={{
              width: "100%",
            }}
          >
            {/*             <FiltersModal>
                            <FiltersButton text={t('common.filters')} />
                        </FiltersModal>*/}
            <div
              style={{
                marginLeft: "30px",
              }}
            >
              <SortingPopover />
            </div>
          </FlexBox>
        )}
      </FlexBox>
      {breakpoint === "pc" ? (
        <>
          <VerticalMenu categories={CategoriesStore.items} />
          <UnderVerticalMenu />
        </>
      ) : (
        <HorizontalMenu categories={CategoriesStore.items} />
      )}
    </S.Sidebar>
  );
});
