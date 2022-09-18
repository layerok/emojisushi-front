import MenuApi from "../api/menu.api";
import {stores} from "../stores/stores";
const { ProductsStore } = stores;

class ProductsService {
    fetchItems(params = {}) {
        ProductsStore.setLoading(true);
        ProductsStore.setLastParams(params);

        const filter = ProductsStore.selectedFilters.reduce((acc, slug) => {
            return acc + `&${slug}=${slug}`;
        }, "")

        return MenuApi.getProducts({
            filter: filter,
            category_slug: "menu",
            search: ProductsStore.search,
            sort: ProductsStore.sort,
            offset: ProductsStore.offset,
            limit: ProductsStore.limit,
            ...params,
        }).then(res => {
            ProductsStore.setItems(res.data.data);
            ProductsStore.setFilters(res.data.filters);
            ProductsStore.setSortOptions(res.data.sort_options)
            ProductsStore.setTotal(res.data.total);

        }).finally(() => {
            ProductsStore.setLoading(false);
        }).catch(() => {
            ProductsStore.setLoading(false);
        });
    }

    refresh() {
        return this.fetchItems(ProductsStore.lastParams)
    }
}


export const productsService = new ProductsService();