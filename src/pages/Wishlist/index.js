import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import { observer} from "mobx-react";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useProductsStore} from "../../hooks/use-categories-store";
import {useAppStore} from "../../hooks/use-app-store";

export const WishlistRaw = () => {
    const ProductsStore = useProductsStore();
    const AppStore = useAppStore();
    useEffect(() => {
        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            limit: ProductsStore.step,
            wishlist: true,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [])

    const {t} = useTranslation();

    const handleLoadMore = () => {
        const settings = {
            limit: ProductsStore.items.length + ProductsStore.step,
            wishlist: true,
        }
        ProductsStore.fetchItems(settings);
    }

    return (
        <Layout
          withRestaurantClosedModal={true}
          withBanner={false}
          withSpotsModal={true}
        >
            <ProductsGrid
                loadable={ProductsStore.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
                handleLoadMore={handleLoadMore}
                title={t('common.favorite')}
            />
        </Layout>
    );
}

export const Wishlist = observer(WishlistRaw)
