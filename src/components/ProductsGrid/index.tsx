import { useBreakpoint, useDebounce } from "~common/hooks";
import { EqualHeight } from "react-equal-height";
import { Product } from "~models";
import { Items, Header } from "./components";
import { IGetCartRes, IGetWishlistRes } from "~api/types";
// todo: fix design at 1280px breakpoing

type TProductsGridProps = {
  title?: string;
  items?: Product[];
  loading?: boolean;
  cart?: IGetCartRes;
  wishlists?: IGetWishlistRes;
};

export const ProductsGrid = ({
  title = "Меню",
  items = [],
  loading = false,
  cart,
  wishlists,
}: TProductsGridProps) => {
  const breakpoint = useBreakpoint();

  const debouncedBreakpoint = useDebounce(() => {
    return breakpoint;
  }, 300);

  // todo: change title when searching

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Header loading={loading} title={title} />
      <EqualHeight updateOnChange={debouncedBreakpoint}>
        <Items
          wishlists={wishlists}
          cart={cart}
          loading={loading}
          items={items}
        />
      </EqualHeight>
    </div>
  );
};
