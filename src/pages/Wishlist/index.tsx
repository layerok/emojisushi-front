import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProductsStore } from "~hooks/use-categories-store";
import { useSpot } from "~hooks";

// todo: fix layout for wishlist

export const Wishlist = observer(() => {
  const ProductsStore = useProductsStore();
  useEffect(() => {
    ProductsStore.fetchItems({
      limit: ProductsStore.step,
      wishlist: true,
    });
  }, []);

  const { t } = useTranslation();
  const selectedSpot = useSpot();

  const handleLoadMore = () => {
    const settings = {
      limit: ProductsStore.items.length + ProductsStore.step,
      wishlist: true,
    };
    ProductsStore.fetchItems(settings);
  };

  return (
    <ProductsGrid
      loadable={ProductsStore.total > ProductsStore.items.length}
      loading={ProductsStore.loading}
      items={ProductsStore.items.filter(
        (product) => !product.isHiddenInSpot(selectedSpot)
      )}
      handleLoadMore={handleLoadMore}
      title={t("common.favorite")}
    />
  );
});

export const Component = Wishlist;
Object.assign(Component, {
  displayName: "LazyWishlist",
});
