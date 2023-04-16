import { useBreakpoint, useDebounce } from "~common/hooks";
import { EqualHeight } from "react-equal-height";
import { observer } from "mobx-react";
import { Loader } from "~components";
import { Product } from "~models";
import { Footer, Items, Header } from "./components";

// todo: fix design at 1280px breakpoing

type TProductsGridProps = {
  title?: string;
  items?: Product[];
  handleLoadMore?: () => void;
  loadingMore?: boolean;
  loadable?: boolean;
  loading?: boolean;
};

export const ProductsGrid = observer(
  ({
    title = "Меню",
    items = [],
    handleLoadMore,
    loading = false,
    loadingMore = false,
    loadable = false,
  }: TProductsGridProps) => {
    const breakpoint = useBreakpoint();

    const debouncedBreakpoint = useDebounce(() => {
      return breakpoint;
    }, 300);

    return (
      <div style={{ position: "relative", width: "100%" }}>
        {/* show loader or skeleton when adding to favorites */}
        <Loader loading={false} />
        <Header loading={loading} title={title} />
        <EqualHeight updateOnChange={debouncedBreakpoint}>
          <Items loading={loading} items={items} />
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
  }
);
