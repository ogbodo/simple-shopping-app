import PRODUCTS from "../../data/dummy-data";

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const addProductsAction = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    };
}

export const fetchProducts = () => {
    return addProductsAction(PRODUCTS);
}
