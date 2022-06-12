import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const HomeRaw = (
    {
        ProductsStore,
        CategoriesStore,
        AppStore
    }
) => {
    const navigate = useNavigate();
    useEffect(() => {
/*        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            offset: 0,
            limit: ProductsStore.step,
            sort: ProductsStore.sort
        }).then(() => {
            AppStore.setLoading(false);
        });*/
    }, [])


    useEffect(() => {
        navigate('category/' + CategoriesStore.items[0].slug);
    }, [CategoriesStore.items])

    const handleLoadMore = () => {
        const settings = {
            offset: 0,
            limit: ProductsStore.items.length + ProductsStore.step,
            sort: ProductsStore.sort
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

export const Home = inject('ProductsStore', 'AppStore', 'CategoriesStore')(observer(HomeRaw))