import { useBreakpoint, useDebounce } from "~common/hooks";
import { EqualHeight } from "react-equal-height";
import { observer } from "mobx-react";
import { Loader } from "~components";
import { Product } from "~models";
import { Footer, Items, Header } from "./components";
import { IGetCartRes } from "~api/types";

// todo: fix design at 1280px breakpoing

type TProductsGridProps = {
  title?: string;
  items?: Product[];
  handleLoadMore?: () => void;
  loadingMore?: boolean;
  loadable?: boolean;
  loading?: boolean;
  cart?: IGetCartRes;
};

export const ProductsGrid = ({
  title = "Меню",
  items = [],
  handleLoadMore,
  loading = false,
  loadingMore = false,
  loadable = false,
  cart,
}: TProductsGridProps) => {
  const breakpoint = useBreakpoint();

  const debouncedBreakpoint = useDebounce(() => {
    return breakpoint;
  }, 300);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Header loading={loading} title={title} />
      <EqualHeight updateOnChange={debouncedBreakpoint}>
        <Items cart={cart} loading={loading} items={items} />
      </EqualHeight>
      {loadable && (
        <Footer
          loading={loading}
          loadingMore={loadingMore}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};
