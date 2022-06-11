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

    const handleLoadMore = () => {
        const settings = {
            offset: 0,
            limit: ProductsStore.items.length + ProductsStore.step,
            category_slug: categorySlug,
            sort: ProductsStore.sort
        }
        ProductsStore.fetchItems(settings);
    }

    useEffect(() => {
        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            category_slug: categorySlug,
            offset: 0,
            limit: ProductsStore.step,
            sort: ProductsStore.sort
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [categorySlug])

    return (
        <Layout withBanner={true}>
            <ProductsGrid
                handleLoadMore={handleLoadMore}
                title={title}
                loadable={ProductsStore.meta.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
            />
        </Layout>
    );
}

export const Category = inject('ProductsStore', 'AppStore', 'CategoriesStore')(observer(CategoryRaw))