import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useSpot, useSpotSlug } from "~hooks";
import WishlistApi from "~api/wishlist.api";
import { defer, useLoaderData } from "react-router-dom";
import MenuApi from "~api/menu.api";
import { Product } from "~models/Product";

// todo: fix layout for wishlist

export const Wishlist = observer(() => {
  const { t } = useTranslation();
  const spotSlug = useSpotSlug();

  const handleLoadMore = () => {
    // todo: implement load more
  };

  const { products, wishlists } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  const items = products.data.data
    .map((json) => new Product(json))
    .filter((product) => !product.isHiddenInSpot(spotSlug));

  return (
    <ProductsGrid
      loadable={products.data.total > products.data.data.length}
      loading={false}
      items={items}
      handleLoadMore={handleLoadMore}
      title={t("common.favorite")}
    />
  );
});

export const Component = Wishlist;
Object.assign(Component, {
  displayName: "LazyWishlist",
});

export const wishlistLoader = async () => {
  return {
    wishlists: await WishlistApi.getList(),
    products: await MenuApi.getProducts(),
  };
};

export const loader = wishlistLoader;
