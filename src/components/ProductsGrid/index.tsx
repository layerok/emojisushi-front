import { useBreakpoint, useDebounce } from "~common/hooks";
import { EqualHeight } from "react-equal-height";
import { Product } from "~models";
import { Items, Header } from "./components";
import { IGetCartRes, IGetWishlistRes } from "@layerok/emojisushi-js-sdk";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const search = searchParams.get("q");
  const resultantTitle = search
    ? `${t("search.everywhere")}: ${search}`
    : title;

  return (
    <div style={{ position: "relative" }}>
      <Header loading={loading} title={resultantTitle} />
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
