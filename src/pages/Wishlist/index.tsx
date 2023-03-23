import { Layout } from "~layout/Layout";
import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useProductsStore } from "~hooks/use-categories-store";

export const Wishlist = observer(() => {
  const ProductsStore = useProductsStore();
  useEffect(() => {
    ProductsStore.fetchItems({
      limit: ProductsStore.step,
      wishlist: true,
    });
  }, []);

  const { t } = useTranslation();

  const handleLoadMore = () => {
    const settings = {
      limit: ProductsStore.items.length + ProductsStore.step,
      wishlist: true,
    };
    ProductsStore.fetchItems(settings);
  };

  return (
    <Layout withRestaurantClosedModal={true}>
      <ProductsGrid
        loadable={ProductsStore.total > ProductsStore.items.length}
        loading={ProductsStore.loading}
        items={ProductsStore.items}
        handleLoadMore={handleLoadMore}
        title={t("common.favorite")}
      />
    </Layout>
  );
});

export const Component = Wishlist;

Object.assign(Component, {
  displayName: "LazyWishlist",
});
