import {Layout} from "../../layout/Layout";
import {ProductsGrid} from "../../components/ProductsGrid";
import { observer} from "mobx-react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useProductsStore} from "../../hooks/use-categories-store";
import {useCategoriesStore} from "../../hooks/use-products-store";
import {useAppStore} from "../../hooks/use-app-store";

export const CategoryRaw = () => {
    const ProductsStore = useProductsStore();
    const CategoriesStore = useCategoriesStore();
    const AppStore = useAppStore();
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
        ProductsStore.fetchItems(settings);
    }

    useEffect(() => {
        AppStore.setLoading(true);
        ProductsStore.fetchItems({
            category_slug: categorySlug,
            limit: ProductsStore.step,
        }).then(() => {
            AppStore.setLoading(false);
        });
    }, [categorySlug])

    return (
        <Layout
          withRestaurantClosedModal={true}
          withSpotsModal={true}
          withBanner={false}
        >
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

export const Category = observer(CategoryRaw)
