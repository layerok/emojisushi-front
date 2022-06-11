export function getProductMainImage(product) {
    const {image_sets} = product;
    return (image_sets.length > 0 && image_sets[0] && image_sets[0].images.length > 0) ? image_sets[0].images[0].path : "default_image";
}

export function getProductOldPrice({additional_prices})  {
    return additional_prices.length > 0 ? additional_prices[0].price_formatted: undefined;
}

export function getProductNewPrice({prices})  {
    return prices.length > 0 ? prices[0].price_formatted: undefined;
}

export function getProductIngredients({property_values}) {
    return property_values.map((pv) => {
        return pv.property.name;
    })
}