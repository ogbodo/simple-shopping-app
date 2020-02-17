import { LOAD_PRODUCTS } from '../actions/product-action';

const initialState = {
    products: [],
}

const productReducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case LOAD_PRODUCTS:
            return {
                ...state,
                products: action.products
            }

        default:
            return state;
    }
}

export default productReducer;