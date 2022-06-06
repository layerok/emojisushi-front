import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";

export const HomeRaw = (
    {
        MenuStore: {
            fetchProducts,
            products
        }
    }
) => {
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <Layout withBanner={true}>
            <ProductsGrid products={products}/>
        </Layout>
    );
}

export const Home = inject('MenuStore')(observer(HomeRaw))