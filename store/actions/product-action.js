export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const createProductAction = (title, description, imageUrl, price) => {
    return {
        type: CREATE_PRODUCT,
        newProductData: { title, description, imageUrl, price }
    };
}

export const updateProductAction = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        productId: id,
        updateProductData: { title, description, imageUrl }
    };
}

export const removeProductAction = (productId) => {
    return { type: REMOVE_PRODUCT, productId };
}