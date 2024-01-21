export const PHONE_UA_REGEX =
  /^(((\+)(38)))(([0-9]{3})|(\([0-9]{3}\)))(\-|\s)?(([0-9]{3})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{2})|([0-9]{2})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{3})|([0-9]{2})(\-|\s)?([0-9]{3})(\-|\s)?([0-9]{2}))$/;

export enum DeliveryMethodCode {
  Takeaway = "takeaway",
  Courier = "courier",
}
