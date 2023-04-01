import { ProductCard } from "../ProductCard";
import * as S from "./styled";
import { FlexBox } from "../FlexBox";
import { LoadMoreButton } from "../buttons/LoadMoreButton";
import { useBreakpoint, useIsDesktop } from "~common/hooks/useBreakpoint";
import { EqualHeight } from "react-equal-height";
import { SortingPopover } from "../popovers/SortingPopover";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "~common/hooks/useDebounce";
import { Loader } from "../Loader";
import { useProductsStore } from "~hooks/use-categories-store";
import { Product } from "~models/Product";
import Skeleton from "react-loading-skeleton";

// todo: fix design at 1280px breakpoing

type ProductsGridProps = {
  title?: string;
  items?: Product[];
  handleLoadMore?: () => void;
  loading?: boolean;
  loadable?: boolean;
  showSkeleton?: boolean;
};

export const ProductsGrid = observer(
  ({
    title = "Меню",
    items = [],
    handleLoadMore,
    loading = false,
    loadable = false,
    showSkeleton = false,
  }: ProductsGridProps) => {
    const breakpoint = useBreakpoint();

    const debouncedBreakpoint = useDebounce(() => {
      return breakpoint;
    }, 300);

    return (
      <div style={{ position: "relative", width: "100%" }}>
        {/* <Loader loading={ProductsStore.loading} /> */}
        <Header showSkeleton={showSkeleton} title={title} />
        <EqualHeight updateOnChange={debouncedBreakpoint}>
          <Items showSkeleton={showSkeleton} items={items} />
        </EqualHeight>
        {loadable && (
          <Footer
            showSkeleton={showSkeleton}
            loading={loading}
            handleLoadMore={handleLoadMore}
          />
        )}
      </div>
    );
  }
);

const Items = ({
  loading = false,
  items = [],
  showSkeleton = false,
}: {
  loading?: boolean;
  items: Product[];
  showSkeleton?: boolean;
}) => {
  const { t } = useTranslation();

  if (showSkeleton) {
    return (
      <S.Grid>
        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />

        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />
        <ProductCard showSkeleton={showSkeleton} />
      </S.Grid>
    );
  }

  return (
    <>
      {items.length !== 0 ? (
        <S.Grid>
          {items.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </S.Grid>
      ) : loading ? (
        t("products.loading")
      ) : (
        t("common.not_found")
      )}
    </>
  );
};

const Footer = ({
  loading = false,
  handleLoadMore,
  showSkeleton = false,
}: {
  loading?: boolean;
  handleLoadMore: () => void;

  showSkeleton?: boolean;
}) => {
  const { t } = useTranslation();
  if (showSkeleton) {
    return null;
  }
  return (
    <S.Footer>
      <LoadMoreButton
        loading={loading}
        style={{ cursor: "pointer" }}
        text={t("common.show_more")}
        onClick={handleLoadMore}
      />
    </S.Footer>
  );
};

const Header = ({
  title,
  showSkeleton = false,
}: {
  title: string;
  showSkeleton?: boolean;
}) => {
  const ProductsStore = useProductsStore();
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const titleOrSearch = ProductsStore.search
    ? `${t("search.everywhere")} "${ProductsStore.search}"`
    : title;
  return (
    <S.Header>
      <S.Title>
        {showSkeleton ? <Skeleton width={260} height={22} /> : titleOrSearch}
      </S.Title>
      {isDesktop && (
        <FlexBox>
          {/*                   <FiltersModal>
                        <FiltersButton text={t('common.filters')}/>
                    </FiltersModal>*/}
          <div style={{ marginLeft: "67px" }}>
            <SortingPopover showSkeleton={showSkeleton} />
          </div>
        </FlexBox>
      )}
    </S.Header>
  );
};
