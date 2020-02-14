import { ADD_ORDER } from "../actions/order-action";
import Order from "../../models/order";

const initialState = {
    orders: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(new Date().toString(), action.orderData.items, action.orderData.amount, new Date().toISOString())
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }

        default:
            break;
    }
    return state;
}