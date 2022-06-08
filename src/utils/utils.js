export function getProductMainImage(product) {
    const {image_sets} = product;
    return (image_sets.length > 0 && image_sets[0] && image_sets[0].images.length > 0) ? image_sets[0].images[0].path : "default_image";
}