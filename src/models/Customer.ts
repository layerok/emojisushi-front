import { makeAutoObservable } from "mobx";
import { IAddress, ICustomer } from "~api/auth.api.types";
import { User } from "./User";

export class Customer {
  json: ICustomer;
  user: User;
  constructor(user: User, json: ICustomer) {
    makeAutoObservable(this, {
      user: false,
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
    return this.firstName + " " + this.lastName;
  }

  get isGuest() {
    return this.json.is_guest;
  }

  get addresses() {
    return this.json.addresses;
  }

  get orders() {
    return this.json.orders;
  }

  get hasAddresses() {
    return this.addresses.length > 0;
  }

  get hasOrders() {
    return this.orders.length > 0;
  }

  get defaultShippingAddressId() {
    return this.json.default_shipping_address_id;
  }

  get defaultAddress() {
    return this.addresses.find(
      (address) => this.defaultShippingAddressId === address.id
    );
  }

  isDefaultShippingAddress(address: IAddress) {
    return address.id === this.defaultShippingAddressId;
  }
}
