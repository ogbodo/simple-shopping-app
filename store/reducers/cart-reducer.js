import PRODUCTS from '../../data/dummy-data';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart-action';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                //We already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productTitle,
                    productPrice,
                    state.totalAmount + productPrice)
            } else {
                //we don't have the item in the cart
                updatedOrNewCartItem = new CartItem(1, productTitle, productPrice, productPrice);
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + productPrice
            }
        case REMOVE_FROM_CART:
            const selectedPro = state.items[action.productId];

            let updatedCartItems = undefined;
            if (selectedPro.quantity > 1) {

                //This means we need to reduce it by one
                const updatedCartItem = new CartItem(
                    selectedPro.quantity - 1, selectedPro.productTitle, selectedPro.productPrice, state.items[action.productId].sum - selectedPro.productPrice);
                updatedCartItems = { ...state.items, [action.productId]: updatedCartItem }

            } else {
                //We need to remove it from the cart
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.productId];
            }

            return {
                ...state,
                items: { ...updatedCartItems },
                totalAmount: state.totalAmount - selectedPro.productPrice > 0 ? state.totalAmount - selectedPro.productPrice : 0
            }
        default:
            return state;
    }
}

export default cartReducer;