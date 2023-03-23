import {Layout} from "~layout/Layout";
import {ProductsGrid} from "~components/ProductsGrid";
import { observer} from "mobx-react";
import {Navigate, useLoaderData, useParams} from "react-router-dom";
import { useProductsStore } from "~hooks/use-categories-store";

import { ProductsStore, CategoriesStore, } from "~stores";
import { toJS } from "mobx";

export const Category = observer(() => {
    const ProductsStore = useProductsStore();
    const { categorySlug } = useParams();
    const { categories } = useLoaderData() as any;
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
})

export const Component = Category;

Object.assign(Component, {
    displayName: 'LazyCategoryPage'
})

export const loader = async ({params}) => {
    await ProductsStore.fetchItems({
      category_slug: params.categorySlug,
      limit: ProductsStore.step,
      spot_id_or_slug: params.spotSlug,
    });

    await CategoriesStore.fetchItems({
      spot_id_or_slug: params.spotSlug,
    });

    return {
      products: toJS(ProductsStore.items),
      categories: toJS(CategoriesStore.items),
    };
}
