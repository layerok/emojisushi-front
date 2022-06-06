import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

export const CategoryRaw = (
    {
        ProductsStore,
        AppStore
    }
) => {

    const {categorySlug} = useParams();

    useEffect(() => {
        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            category_slug: categorySlug
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [categorySlug])
    return (
        <Layout withBanner={true}>
            <ProductsGrid/>
        </Layout>
    );
}

export const Category = inject('ProductsStore', 'AppStore')(observer(CategoryRaw))