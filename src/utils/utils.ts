import {IProduct} from "~api/menu.api.types";

export function getProductMainImage(product: IProduct) {
    const {image_sets} = product;
    return (image_sets.length > 0 && image_sets[0] && image_sets[0].images.length > 0) ? image_sets[0].images[0].path : undefined;
}

export function getProductOldPrice(product, variant = undefined)  {
    const {additional_prices} = product;
    if(variant) {
        return getProductOldPrice(variant);
    }
    return additional_prices.length > 0 ? additional_prices[0].price_formatted: undefined;
}

export function getProductNewPrice(product, variant = undefined)  {
    const {prices} = product;
    if(variant) {
        return getProductNewPrice(variant);
    }
    return prices.length > 0 ? prices[0].price_formatted: undefined;
}

export function getProductIngredients({description_short}) {

    return description_short ? description_short.split(','): [];

    // Мы не используем свойства
    /*return property_values.map((pv) => {
        return pv.property.name;
    })*/
}

export function getNameWithMods(item) {
    return (item?.variant?.property_values || []).reduce((acc, property) => {
        return acc + " " + property.value;
    }, item.product.name)
}

