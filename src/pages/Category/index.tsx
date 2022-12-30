import {Layout} from "~layout/Layout";
import {ProductsGrid} from "~components/ProductsGrid";
import { observer} from "mobx-react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useProductsStore} from "~hooks/use-categories-store";
import {useCategoriesStore} from "~hooks/use-products-store";
import {useSpotsStore} from "~hooks/use-spots-store";


export const CategoryRaw = () => {
    const ProductsStore = useProductsStore();
    const CategoriesStore = useCategoriesStore();
    const SpotsStore = useSpotsStore();
    const {categorySlug} = useParams();
    const navigate = useNavigate();
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
        ProductsStore.fetchItems({
            category_slug: categorySlug,
            limit: ProductsStore.step,
        })
    }, [categorySlug])

    useEffect(() => {
        // if current category was disabled for the current spot, then redirect user to the first available category
        if(!CategoriesStore.findCategoryBySlug(categorySlug) && CategoriesStore.count > 0) {
            navigate('category/' + CategoriesStore.items[0].slug)
        }
    }, [SpotsStore.selectedIndex, CategoriesStore.count])

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
