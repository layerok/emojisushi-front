import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

export const CategoryRaw = (
    {
        ProductsStore,
        CategoriesStore,
        AppStore
    }
) => {

    const {categorySlug} = useParams();
    const selectedCategory = CategoriesStore.items.find((category) => {
        return category.slug === categorySlug;
    })
    const title = selectedCategory?.name;

    useEffect(() => {
        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            category_slug: categorySlug,
            offset: 0,
            limit: ProductsStore.offset,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [categorySlug])
    return (
        <Layout withBanner={true}>
            <ProductsGrid
                categorySlug={categorySlug}
                title={title}
            />
        </Layout>
    );
}

export const Category = inject('ProductsStore', 'AppStore', 'CategoriesStore')(observer(CategoryRaw))