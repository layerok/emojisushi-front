export function getProductMainImage(product) {
    const {image_sets} = product;
    return (image_sets.length > 0 && image_sets[0] && image_sets[0].images.length > 0) ? image_sets[0].images[0].path : undefined;
}

export function getProductOldPrice({additional_prices})  {
    return additional_prices.length > 0 ? additional_prices[0].price_formatted: undefined;
}

export function getProductNewPrice({prices})  {
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

