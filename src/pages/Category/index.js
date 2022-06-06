import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

export const CategoryRaw = (
    {
        ProductsStore
    }
) => {

    const {categorySlug} = useParams();

    useEffect(() => {
        ProductsStore.fetchItems({
            category_slug: categorySlug
        });
    }, [categorySlug])
    return (
        <Layout withBanner={true}>
            <ProductsGrid/>
        </Layout>
    );
}

export const Category = inject('ProductsStore')(observer(CategoryRaw))