import {Layout} from "../../layout/Layout";
import productSrc1 from "../../assets/img/products/1.png";
import productSrc2 from "../../assets/img/products/2.png";
import productSrc3 from "../../assets/img/products/3.png";
import {ProductsGrid} from "../../components/ProductsGrid";

const products = [
    {
        name: "Ролл овощной",
        weight: "225г",
        old_price: "90 ₴",
        new_price: "79 ₴",
        is_favorite: true,
        count: 0,
        pending: false,
        image: productSrc1
    },
    {
        name: "Ролл Калифорния с тунцом",
        weight: "240г",
        new_price: "139 ₴",
        is_favorite: false,
        count: 0,
        pending: true,
        image: productSrc2
    },
    {
        name: "Ролл Калифорния с угрём",
        weight: "220г",
        new_price: "169 ₴",
        is_favorite: false,
        count: 1,
        pending: false,
        image: productSrc3
    }
]

export const Home = () => {
    return (
        <Layout withBanner={true}>
            <ProductsGrid products={products}/>
        </Layout>
    );
}