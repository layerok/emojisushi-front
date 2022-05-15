import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {products} from "../../common/mock/data/products";

export const Home = () => {
    return (
        <Layout withBanner={true}>
            <ProductsGrid products={products}/>
        </Layout>
    );
}