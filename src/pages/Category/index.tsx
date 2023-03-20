import {Layout} from "~layout/Layout";
import {ProductsGrid} from "~components/ProductsGrid";
import { observer} from "mobx-react";
import {Navigate, useLoaderData, useParams} from "react-router-dom";
import {useProductsStore} from "~hooks/use-categories-store";

export const CategoryRaw = () => {
    const ProductsStore = useProductsStore();
    const { categorySlug } = useParams();
    const {categories, products} = useLoaderData();
    const selectedCategory = categories.find((category) => {
      return category.slug === categorySlug;
    });
    const title = selectedCategory?.name;

    const handleLoadMore = () => {
        const settings = {
            limit: ProductsStore.items.length + ProductsStore.step,
            category_slug: categorySlug
        }
        ProductsStore.fetchItems(settings);
    }

    if (!categories.length) {
        return <>...loading categories</>
    }

    if (!selectedCategory && categories.length > 0) {
      return <Navigate to={categories[0].slug} />;
    }

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
