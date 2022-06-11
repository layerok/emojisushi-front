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
            offset: 0,
            limit: 25,
            wishlist: true,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [])

    const handleLoadMore = () => {
        const settings = {
            offset: 0,
            limit: ProductsStore.items.length + ProductsStore.offset,
            wishlist: true,
        }
        ProductsStore.fetchItems(settings);
    }

    return (
        <Layout withBanner={false}>
            <ProductsGrid
                loadable={ProductsStore.meta.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
                handleLoadMore={handleLoadMore}
                title={"Любимые"}
            />
        </Layout>
    );
}

export const Wishlist = inject('ProductsStore', 'AppStore')(observer(WishlistRaw))