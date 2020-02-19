import { REMOVE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, FETCH_PRODUCT } from '../actions/product-action';
import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

const initialState = {
    products: [],
    userProducts: []
}

const productReducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case FETCH_PRODUCT:
            return {
                products: action.products,
                userProducts: action.products.filter(product => product.id !== action.productId)
            }
        case CREATE_PRODUCT:
            const { id, title, description, imageUrl, price } = action.newProductData;
            const newProduct = new Product(id, 'u1', title, imageUrl, description, price);
            return {
                ...state,
                products: state.products.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const updateProd = action.updateProductData;
            const productIndex = state.products.findIndex(product => product.id === action.productId);
            const existingProd = state.products[productIndex];
            const productUpdate = new Product(action.productId, existingProd.ownerId, updateProd.title, updateProd.imageUrl, updateProd.description, existingProd.price);
            //immutably update the product collections first
            const cloneProducts = [...state.products];
            cloneProducts[productIndex] = productUpdate;

            //immutably update the userProduct collections first
            const userProductIndex = state.userProducts.findIndex(product => product.id === action.productId);
            const cloneUserProducts = [...state.userProducts];
            cloneUserProducts[userProductIndex] = productUpdate;

            return {
                ...state,
                products: cloneProducts,
                userProducts: cloneUserProducts
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.productId),
                userProducts: state.userProducts.filter(product => product.id !== action.productId)
            }

        default:
            return state;
    }
}

export default productReducer;