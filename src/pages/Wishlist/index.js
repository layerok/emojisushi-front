import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";

export const WishlistRaw = (
    {
        ProductsStore,
        AppStore
    }
) => {
    useEffect(() => {
        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            limit: ProductsStore.step,
            wishlist: true,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [])

    const handleLoadMore = () => {
        const settings = {
            limit: ProductsStore.items.length + ProductsStore.step,
            wishlist: true,
        }
        ProductsStore.fetchItems(settings);
    }

    return (
        <Layout withBanner={false}>
            <ProductsGrid
                loadable={ProductsStore.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
                handleLoadMore={handleLoadMore}
                title={"Любимые"}
            />
        </Layout>
    );
}

export const Wishlist = inject('ProductsStore', 'AppStore')(observer(WishlistRaw))