import {makeAutoObservable, transaction} from "mobx";
import CartApi from "../api/cart.api";
import {RootStore} from "~stores/stores";
import {ICartProduct} from "~api/cart.api.types";
import {Product, Variant} from "~stores/products.store";

export class CartProduct {
    json: ICartProduct;
    constructor(json) {
        makeAutoObservable(this);
        this.json = json;
    }

    get quantity() {
        return this.json.quantity;
    }

    get product() {
        return new Product(this.json.product);
    }

    get id() {
        return this.json.id;
    }

    get variant() {
        return this.json.variant ? new Variant(this.json.variant): undefined;
    }

    get productId() {
        return this.json.product_id;
    }

    get variantId() {
        return this.json.variant_id
    }

}

export class CartStore {
    rootStore: RootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }
    items: CartProduct[] = [];
    loading = false;
    total = 0;
    totalQuantity = 0;
    pending = [];
    name: string = ""

    setName = (name: string) => {
        this.name = name;
    }

    setItems = (cartProducts: CartProduct[]) => {
        this.items = cartProducts;
    }

    setLoading = (state) => {
        this.loading = state;
    }

    setPending = (value) => {
        this.pending = value;
    }

    setTotal = (value) => {
        this.total = value;
    }

    setTotalQuantity = (value) => {
        this.totalQuantity = value;
    }

    clearCart = () => {
        return CartApi.clearCart().then((res) => {
            transaction(() => {
                const instances = res.data.data.map((cartProduct) => new CartProduct(cartProduct))
                this.setItems(instances);
                this.setTotal(res.data.total);
                this.setTotalQuantity(res.data.totalQuantity)
            })

        })
    }

    fetchItems() {
        this.setLoading(true);
        return CartApi.getProducts().then(res => {
            transaction(() => {
                const instances = res.data.data.map((cartProduct) => new CartProduct(cartProduct))
                this.setItems(instances);
                this.setTotal(res.data.total)
                this.setTotalQuantity(res.data.totalQuantity);
            })
        }).catch(() => {
            this.setLoading(false);
        }).finally(() => {
            this.setLoading(false);
        });
    }

    addProduct(params: {
        product_id: number;
        variant_id?: number;
        quantity?: number;
    }) {
        const {product_id} = params;

        this.setLoading(true);
        this.setPending([...this.pending, product_id]);
        return CartApi.addProduct(params).then((res) => {
            transaction(() => {
                const instances = res.data.data.map((cartProduct) => new CartProduct(cartProduct))
                this.setItems(instances);
                this.setTotal(res.data.total);
                this.setTotalQuantity(res.data.totalQuantity);
            })
        }).finally(() => {
            transaction(() => {
                this.setLoading(false);
                this.setPending(this.pending.filter(id=> id !== product_id));
            })

        }).catch(() => {
            transaction(() => {
                this.setLoading(false);
                this.setPending(this.pending.filter(id=> id !== product_id));
            })

        });
    }

    removeCartProduct(cart_product_id) {
        this.setLoading(true);
        return CartApi.removeCartProduct(cart_product_id).then((res) => {
            transaction(() => {
                this.setItems(res.data.data);
                this.setTotal(res.data.total);
                this.setTotalQuantity(res.data.totalQuantity);
            })

        }).finally(() => {
            this.setLoading(false);
        }).catch(() => {
            this.setLoading(false);
        });
    }


}
