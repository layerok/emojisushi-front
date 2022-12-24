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
            limit: ProductsStore.step,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [])


    const handleLoadMore = () => {
        const settings = {
            limit: ProductsStore.items.length + ProductsStore.step,
        }
        ProductsStore.fetchItems(settings);
    }

    return (
        <Layout
          withBanner={false}
          withRestaurantClosedModal={true}
          withSpotsModal={true}
        >
            <ProductsGrid
                loadable={ProductsStore.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
                handleLoadMore={handleLoadMore}
            />
        </Layout>
    );
}

export const Home = inject('ProductsStore', 'AppStore', 'CategoriesStore')(observer(HomeRaw))
