import {makeAutoObservable} from "mobx";
import authApi from "../api/auth.api";
import {RootStore} from "~stores/stores";
import {IAddress, IOfflineMallCustomer, IOfflineMallUser} from "~api/auth.api.types";
import Cookies from "js-cookie";

class OfflineMallCustomer {
    json: IOfflineMallCustomer;
    user: OfflineMallUser;
    constructor(user: OfflineMallUser, json: IOfflineMallCustomer) {
        makeAutoObservable(this, {
            user: false
        });
        this.user = user;
        this.json = json;
    }

    get firstName() {
        return this.json.firstname;
    }

    set firstName(firstName: string) {
        this.json.firstname = firstName;
    }

    get lastName() {
        return this.json.lastname;
    }

    set lastName(lastName: string) {
        this.json.lastname = lastName;
    }

    get name() {
        return this.firstName + ' ' + this.lastName;
    }

    get isGuest() {
        return this.json.is_guest;
    }

    get addresses() {
        return this.json.addresses;
    }

    get hasAddresses() {
        return this.addresses.length > 0;
    }

    get defaultShippingAddressId() {
        return this.json.default_shipping_address_id
    }

    get defaultAddress() {
        return this.addresses.find((address) => this.defaultShippingAddressId === address.id)
    }

    isDefaultShippingAddress(address: IAddress) {
        return address.id === this.defaultShippingAddressId;
    }


}

class OfflineMallUser {
    store: AuthStore;
    json: IOfflineMallUser;
    customer: OfflineMallCustomer | null;
    saving = false;
    constructor(store: AuthStore, user: IOfflineMallUser) {
        makeAutoObservable(this, {
            store: false,
            customer: false
        });
        this.json = user;
        this.store = store;
        if(user.customer) {
            this.customer = new OfflineMallCustomer(this, this.json.customer)
        }

    }

    get id() {
        return this.json.id;
    }

    get name() {
        return this.json.name;
    }

    set name(name: string) {
        this.json.name = name;
        this.customer.firstName = name;
    }

    get phone() {
        return this.json.phone;
    }

    set phone(phone: string) {
        this.json.phone = phone;
    }

    get fullName() {
        return this.name + ' ' + this.surname;
    }

    get email() {
        return this.json.email;
    }

    get permissions() {
        return this.json.permissions;
    }

    get isActivated() {
        return this.json.is_activated;
    }

    get activatedAt() {
        return this.json.activated_at;
    }

    get lastLogin() {
        return this.json.last_login;
    }

    get createdAt() {
        return this.json.created_at;
    }

    get updatedAt() {
        return this.json.updated_at;
    }

    get username() {
        return this.json.username;
    }

    get surname() {
        return this.json.surname;
    }

    set surname(surname: string) {
        this.json.surname = surname;
        this.customer.lastName = surname;
    }

    get deletedAt() {
        return this.json.deleted_at;
    }

    get lastSeen() {
        return this.json.last_seen;
    }

    get isSuperUser() {
        return this.json.is_superuser
    }

    get createdIpAddress() {
        return this.json.created_at;
    }

    get lastIpAddress() {
        return this.json.last_ip_address;
    }

    get offlineMallCustomerGroupId() {
        return this.json.offline_mall_customer_group_id;
    }

    setSaving = (state: boolean) => {
        this.saving = state;
    }

    save() {
        this.setSaving(true);
        return authApi.updateUser({
            name: this.name,
            surname: this.surname,
            phone: this.phone
        }).finally(() => {
            this.setSaving(false);
        })
    }
}

export class AuthStore {

    rootStore: RootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }

    authToken = null;

    checkUser = false;

    user: OfflineMallUser | null = null;

    expires = null;

    setAuthToken = (token) => {
        this.authToken = token;
    }

    setUser = (user: OfflineMallUser) => {
        this.user = user;
    }

    setExpires = (timestamp) => {
        this.expires = timestamp;
    }

    get isAuthorized(): boolean {
        return !!this.user;
    }

    get hasUser(): boolean {
        return !!this.user;
    }

    userFromJson(json: IOfflineMallUser) {
        this.setUser(new OfflineMallUser(this, json));
    }

    fetchUser() {
        return authApi.fetchUser().then((res) => {
            this.setUser(new OfflineMallUser(this, res.data));
        }).finally(() => {
            this.setCheckUser(true);
        })
    }

    setCheckUser = (state: boolean)  => {
        this.checkUser = state;
    }

    logout() {
        Cookies.remove('jwt');
        this.setAuthToken(null);
        this.setUser(null);
        this.setExpires(null);
        this.rootStore.CartStore.fetchItems();
    }

}
