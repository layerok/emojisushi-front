import {CategoriesStore} from "./categories.store";
import {ProductsStore} from "./products.store";
import {AppStore} from "./app.store";
import {AuthStore} from "./auth.store";
import {SpotsStore} from "./spots.store";
import {CartStore} from "./cart.store";
import {PaymentStore} from "./payment.store";
import {ShippingStore} from "./shipping.store";
import {WishlistStore} from "./wishlist.store";
import {makeAutoObservable} from "mobx";

export class RootStore {
    CategoriesStore: CategoriesStore;
    ProductsStore: ProductsStore;
    AppStore: AppStore;
    SpotsStore: SpotsStore;
    CartStore: CartStore;
    PaymentStore: PaymentStore;
    ShippingStore: ShippingStore;
    WishlistStore: WishlistStore;
    AuthStore: AuthStore;
    constructor() {
        makeAutoObservable({
            CategoriesStore: false,
            ProductsStore: false,
            AppStore: false,
            SpotsStore: false,
            CartStore: false,
            PaymentStore: false,
            ShippingStore: false,
            WishlistStore: false,
            AuthStore: false
        })
        this.CategoriesStore = new CategoriesStore(this);
        this.ProductsStore = new ProductsStore(this);
        this.AppStore = new AppStore(this);
        this.SpotsStore = new SpotsStore(this);
        this.CartStore = new CartStore(this);
        this.PaymentStore = new PaymentStore(this);
        this.ShippingStore = new ShippingStore(this);
        this.WishlistStore = new WishlistStore(this);
        this.AuthStore = new AuthStore(this);
    }
}

export const rootStore = new RootStore();
export const stores = rootStore;
//todo: delete 'stores' export when you have replaced all it's occurrences to 'rootStore'
