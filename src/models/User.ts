import { makeAutoObservable } from "mobx";
import { Customer } from "./Customer";
import { IUser } from "~api/auth.api.types";
import { authApi } from "~api";

export class User {
  json: IUser;
  customer: Customer | null;
  saving = false;
  constructor(user: IUser) {
    makeAutoObservable(this, {
      customer: false,
    });
    this.json = user;
    if (user.customer) {
      this.customer = new Customer(this, this.json.customer);
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
    return this.name + " " + this.surname;
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
    return this.json.is_superuser;
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
  };

  save() {
    this.setSaving(true);
    return authApi
      .updateUser({
        name: this.name,
        surname: this.surname,
        phone: this.phone,
      })
      .finally(() => {
        this.setSaving(false);
      });
  }
}
