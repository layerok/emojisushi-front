import { ICategory, IProduct, IWishlist } from "@layerok/emojisushi-js-sdk";
import { fuzzySearch as fuzzySearchBase } from "~utils/fuzzySearch";
import { PRODUCT_SORTERS } from "~domains/product/product.constants";
import { isProductInWishlists } from "~domains/product/product.utils";

export const processCatalog = ({
  products,
  categories,
  categorySlug,
  query,
  sort,
  wishlists,
}: {
  categorySlug?: string;
  query: string;
  sort: string;
  products: IProduct[];
  categories: ICategory[];
  wishlists?: IWishlist[];
}) => {
  const belongsToCategory = (product: IProduct) => {
    if (!categorySlug) {
      return true;
    }
    const categoryExists = categories.find(
      (category) => category.slug === categorySlug
    );
    if (!categoryExists) {
      // category is hidden, do not show this product
      return false;
    }
    return !!product.categories.find(
      (category) => category.slug === categorySlug
    );
  };

  const filterProductsFromHiddenCategories = (product: IProduct) => {
    if (!categorySlug) {
      return true;
    }
    return product.categories.some((category) => {
      const categoryExists = categories.find(
        (categoryInner) => categoryInner.slug === category.slug
      );
      return categoryExists;
    });
  };

  const rawItems = (products || []).filter(
    query ? filterProductsFromHiddenCategories : belongsToCategory
  );

  const searchedItems = query
    ? fuzzySearchBase(rawItems, query, (el) => el.name, {
        maxAllowedModifications: 1,
      })
    : rawItems;

  // todo: implement 'bestseller' and 'rating' sorters
  const sorter = PRODUCT_SORTERS[sort];

  const sortedProducts = sorter ? searchedItems.sort(sorter) : searchedItems;

  const items = wishlists?.length
    ? sortedProducts.filter((product) =>
        isProductInWishlists(product, wishlists)
      )
    : sortedProducts;

  return items;
};
