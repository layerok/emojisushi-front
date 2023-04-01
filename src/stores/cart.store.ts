import { makeAutoObservable, transaction } from "mobx";
import CartApi from "../api/cart.api";
import { RootStore } from "~stores/stores";
import { CartProduct } from "~models/CartProduct";
import { Product } from "~models/Product";
import { Variant } from "~models/Variant";

export class CartStore {
  rootStore: RootStore;
  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
  }
  items: CartProduct[] = [];
  loading = false;
  total = 0;
  totalQuantity = 0;
  pending = [];
  name: string = "";

  setName = (name: string) => {
    this.name = name;
  };

  setItems = (cartProducts: CartProduct[]) => {
    this.items = cartProducts;
  };

  setLoading = (state) => {
    this.loading = state;
  };

  setPending = (value) => {
    this.pending = value;
  };

  setTotal = (value) => {
    this.total = value;
  };

  setTotalQuantity = (value) => {
    this.totalQuantity = value;
  };

  clearCart = async () => {
    const res = await CartApi.clearCart();
    const instances = res.data.data.map(
      (cartProduct) => new CartProduct(cartProduct)
    );
    transaction(() => {
      this.setItems(instances);
      this.setTotal(res.data.total);
      this.setTotalQuantity(res.data.totalQuantity);
    });
    return instances;
  };

  async fetchItems(): Promise<CartProduct[]> {
    this.setLoading(true);

    const res = await CartApi.getProducts();
    const instances = res.data.data.map(
      (cartProduct) => new CartProduct(cartProduct)
    );
    transaction(() => {
      this.setItems(instances);
      this.setTotal(res.data.total);
      this.setTotalQuantity(res.data.totalQuantity);
    });

    this.setLoading(false);
    return instances;
  }

  async addProduct(params: {
    product_id: number;
    variant_id?: number;
    quantity?: number;
  }) {
    const { product_id } = params;

    this.setLoading(true);
    this.setPending([...this.pending, product_id]);

    const res = await CartApi.addProduct(params);

    const instances = res.data.data.map(
      (cartProduct) => new CartProduct(cartProduct)
    );

    transaction(() => {
      this.setItems(instances);
      this.setTotal(res.data.total);
      this.setTotalQuantity(res.data.totalQuantity);
    });

    this.setLoading(false);
    this.setPending(this.pending.filter((id) => id !== product_id));
    return instances;
  }

  async removeCartProduct(cart_product_id) {
    this.setLoading(true);

    const res = await CartApi.removeCartProduct(cart_product_id);
    const instances = res.data.data.map(
      (cartProduct) => new CartProduct(cartProduct)
    );
    transaction(() => {
      this.setItems(instances);
      this.setTotal(res.data.total);
      this.setTotalQuantity(res.data.totalQuantity);
    });

    this.setLoading(false);
    return instances;
  }

  findInCart(product: Product, variant?: Variant) {
    if (product.inventoryManagementMethod === "variant") {
      return this.items.find(
        (cartProduct) =>
          cartProduct.productId === product.id &&
          cartProduct.variantId === variant?.id
      );
    }
    return this.items.find(
      (cartProduct) => cartProduct.productId === product.id
    );
  }
}
