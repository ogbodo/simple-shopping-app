export const ADD_ORDER = 'ADD_ORDER';

export const addOrderAction = (cartItem, totalAmount) => {
    return async dispatch => {
        try {
            const date = new Date()
            const response = await fetch('https://shopping-app-fc2b8.firebaseio.com/orders/u1.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: cartItem, amount: totalAmount, date: date.toISOString() })
            });

            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const responseData = await response.json();

            return dispatch({
                type: ADD_ORDER,
                orderData: {
                    id: responseData.name,
                    items: cartItem,
                    amount: totalAmount,
                    date
                }
            })
        } catch (error) {
            //send error to our custom analytic server
            throw error;
        }
    }
}

export const fetchOrdersAction = () => {
    return async (dispatch) => {
        //Here now we can perform any async task

        try {
            const response = await fetch('https://shopping-app-fc2b8.firebaseio.com/orders.json');

            if (!response.ok) {
                // console.log(response);

                throw new Error('Something went wrong')
            }
            const responseData = await response.json();

            const loadedOrders = [];
            for (const key in responseData) {
                const items = responseData[key]['orderData'].items;
                const amount = responseData[key]['orderData'].amount;
                loadedOrders.push({ items, amount })
            }
            console.log(loadedOrders);


            return dispatch({
                type: ADD_ORDER, orderData: loadedOrders
            })


        } catch (error) {
            //send error to our custom analytic server
            throw error;
        }

    };
}