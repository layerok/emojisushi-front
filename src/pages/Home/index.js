import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";

export const HomeRaw = (
    {
        ProductsStore,
        AppStore
    }
) => {
    useEffect(() => {
        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            offset: 0,
            limit: 25
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [])

    const handleLoadMore = () => {
        const settings = {
            offset: 0,
            limit: ProductsStore.items.length + ProductsStore.offset,
        }
        ProductsStore.fetchItems(settings);
    }

    return (
        <Layout withBanner={true}>
            <ProductsGrid
                loadable={ProductsStore.meta.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
                handleLoadMore={handleLoadMore}
            />
        </Layout>
    );
}

export const Home = inject('ProductsStore', 'AppStore')(observer(HomeRaw))