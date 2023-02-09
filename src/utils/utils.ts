import {Product, Variant} from "~stores/products.store";
import {CartProduct} from "~stores/cart.store";

export function getProductMainImage(product: Product) {
    const {imageSets} = product;
    return (imageSets.length > 0 && imageSets[0] && imageSets[0].images.length > 0) ? imageSets[0].images[0].path : undefined;
}

export function getProductOldPrice(product: Product | Variant, variant: Variant | undefined = undefined)  {
    if(variant) {
        return getProductOldPrice(variant);
    }
    return product.additionalPrices.length > 0 ? product.additionalPrices[0].price_formatted: undefined;
}

export function getProductNewPrice(product: Product, variant = undefined)  {
    if(variant) {
        return getProductNewPrice(variant);
    }
    return product.prices.length > 0 ? product.prices[0].price_formatted: undefined;
}

export function getProductIngredients(product: Product) {

    return product.descriptionShort ? product.descriptionShort.split(','): [];

    // Мы не используем свойства
    /*return property_values.map((pv) => {
        return pv.property.name;
    })*/
}

export function getNameWithMods(item: CartProduct) {
    return (item?.variant?.propertyValues || []).reduce((acc, property) => {
        return acc + " " + property.value;
    }, item.product.name as string);
}

