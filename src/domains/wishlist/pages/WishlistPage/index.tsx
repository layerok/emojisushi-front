import { ProductsGrid } from "~components";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import {
  IGetCartRes,
  IGetProductsRes,
  IGetWishlistRes,
  SortKey,
} from "src/api/types";
import { Product } from "src/models";
import {
  cartQuery,
  categoriesQuery,
  productsQuery,
  wishlistsQuery,
} from "src/queries";
import { MenuLayout } from "~domains/product/components/MenuLayout";
import { useQuery } from "@tanstack/react-query";

// todo: fix layout for wishlist
// todo: optimisticly filter out wishlisted products

export const WishlistPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const sort = searchParams.get("sort") as SortKey;

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    categoriesQuery()
  );
  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);
  const { data: products, isLoading: isProductsLoading } = useQuery(
    productsQuery({
      category_slug: "menu",
      search: q,
      limit: 2000,
      sort: sort,
    })
  );

  return (
    <MenuLayout categories={categories}>
      {isCartLoading ||
      isProductsLoading ||
      isCategoriesLoading ||
      isWishlistLoading ? (
        <ProductsGrid loading />
      ) : (
        <Wishlist cart={cart} products={products} wishlists={wishlists} />
      )}
    </MenuLayout>
  );
};

const Wishlist = ({
  products,
  wishlists,
  cart,
}: {
  products: IGetProductsRes;
  wishlists: IGetWishlistRes;
  cart: IGetCartRes;
}) => {
  const { t } = useTranslation();

  const handleLoadMore = () => {
    // todo: implement load more
  };
  const { spotSlug } = useParams();

  const items = products.data
    .map((json) => new Product(json))
    .filter((product) => !product.isHiddenInSpot(spotSlug))
    .filter((product) => {
      return product.isInWishlists(wishlists);
    });
  return (
    <ProductsGrid
      wishlists={wishlists}
      loadable={false}
      cart={cart}
      items={items}
      handleLoadMore={handleLoadMore}
      title={t("common.favorite")}
    />
  );
};

export const Component = WishlistPage;

Object.assign(Component, {
  displayName: "LazyWishlistPage",
});
