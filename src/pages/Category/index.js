import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {productsService} from "../../services/products.service";

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
            limit: ProductsStore.items.length + ProductsStore.step,
            category_slug: categorySlug
        }
        productsService.fetchItems(settings);
    }

    useEffect(() => {
        AppStore.setLoading(true);
        productsService.fetchItems({
            category_slug: categorySlug,
            limit: ProductsStore.step,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [categorySlug])

    return (
        <Layout withBanner={false}>
            <ProductsGrid
                handleLoadMore={handleLoadMore}
                title={title}
                loadable={ProductsStore.total > ProductsStore.items.length}
                loading={ProductsStore.loading}
                items={ProductsStore.items}
            />
        </Layout>
    );
}

export const Category = inject('ProductsStore', 'AppStore', 'CategoriesStore')(observer(CategoryRaw))