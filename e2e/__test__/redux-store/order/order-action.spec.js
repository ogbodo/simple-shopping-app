import { expect } from 'chai';
import { reloadApp } from 'detox-expo-helpers'
import configureMockStore from 'redux-mock-store';
import Product from '../../../../models/product';
import { ADD_ORDER, addOrderAction } from '../../../../store/actions/order-action';


describe('Order actions', () => {
    const middlewares = [];
    const mockStore = configureMockStore(middlewares);

    beforeEach(async () => {
        await reloadApp();
    });

    describe('#addOrderAction', () => {
        it('passes orders as a payload to addOrderAction', () => {
            const cartItem = new Product(
                'p1',
                'u1',
                'Red Shirt',
                'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
                'A red t-shirt, perfect for days with non-red weather.',
                29.99
            );

            const orderAction = {
                type: ADD_ORDER,
                orderData: {
                    items: cartItem,
                    amount: 29.99
                }
            }
            const store = mockStore();
            store.dispatch(addOrderAction(cartItem, 29.99));
            expect(store.getActions()).to.deep.equal([orderAction]);

        });
    })
});
