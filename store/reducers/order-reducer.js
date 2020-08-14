import { ADD_ORDER } from "../actions/order-action";
import Order from "../../models/order";

const initialState = {
    orders: []
}


const orderReducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(action.orderData.id,
                action.orderData.items, action.orderData.amount,
                action.orderData.date)
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }

        default:
            return state;
    }
}

export default orderReducer;