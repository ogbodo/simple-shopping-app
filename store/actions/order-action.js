export const ADD_ORDER = 'ADD_ORDER';
// export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addOrderAction = (cartItem, totalAmount) => {
    return {
        type: ADD_ORDER,
        orderData: {
            items: cartItem,
            amount: totalAmount
        }
    };
}

// export const removeFromCart = (productId) => {
//     return { type: REMOVE_FROM_CART, productId };
// }