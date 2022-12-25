import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {observer} from "mobx-react";
import {useEffect} from "react";
import {useProductsStore} from "~hooks/use-categories-store";
import {useAppStore} from "~hooks/use-app-store";

export const HomeRaw = () => {
    const ProductsStore = useProductsStore();
    const AppStore = useAppStore();

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

export const Home = observer(HomeRaw)
