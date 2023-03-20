import {CategoriesStore} from "./categories.store";
import {ProductsStore} from "./products.store";
import {AppStore} from "./app.store";
import {AuthStore} from "./auth.store";
import {CartStore} from "./cart.store";
import {PaymentStore} from "./payment.store";
import {ShippingStore} from "./shipping.store";
import {WishlistStore} from "./wishlist.store";
import {makeAutoObservable} from "mobx";
import {CitiesStore} from "~stores/cities.store";

export class RootStore {
    CategoriesStore: CategoriesStore;
    ProductsStore: ProductsStore;
    AppStore: AppStore;
    CartStore: CartStore;
    PaymentStore: PaymentStore;
    ShippingStore: ShippingStore;
    WishlistStore: WishlistStore;
    AuthStore: AuthStore;
    CitiesStore: CitiesStore;
    constructor() {
        makeAutoObservable({
            CategoriesStore: false,
            ProductsStore: false,
            AppStore: false,
            CartStore: false,
            PaymentStore: false,
            ShippingStore: false,
            WishlistStore: false,
            AuthStore: false,
            CitiesStore: false,
        })
        this.CategoriesStore = new CategoriesStore(this);
        this.ProductsStore = new ProductsStore(this);
        this.AppStore = new AppStore(this);
        this.CartStore = new CartStore(this);
        this.PaymentStore = new PaymentStore(this);
        this.ShippingStore = new ShippingStore(this);
        this.WishlistStore = new WishlistStore(this);
        this.AuthStore = new AuthStore(this);
        this.CitiesStore = new CitiesStore(this);
    }
}

export const rootStore = new RootStore();
export const stores = rootStore;
//todo: delete 'stores' export when you have replaced all it's occurrences to 'rootStore'
