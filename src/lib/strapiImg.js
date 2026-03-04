
/**
 * 
 * @param {*} image The api.cover or any image obect
 * @param {*} format small | medium | large | original 
 * @returns 
 * Specific type of strapi image (default: original) with the base url from env variable
 * If specific format is not available, it falls back to the original image. 
 * If no image is provided, it returns null.
 * 
 * @author: Vinit K
 */

export default function getImageUrl(image, format = "original") {
    if (!image) return null;
    
    if (image.formats && image.formats[format]) {
        return process.env.NEXT_PUBLIC_API_URL + image.formats[format].url;
    }

    if (image.url) {
        return process.env.NEXT_PUBLIC_API_URL + image.url;
    }

    return null;
};