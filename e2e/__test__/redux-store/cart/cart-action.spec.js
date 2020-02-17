import { expect } from 'chai';
import { reloadApp } from 'detox-expo-helpers'
import configureMockStore from 'redux-mock-store';
import Product from '../../../../models/product';
import { ADD_TO_CART, addToCart, removeFromCart, REMOVE_FROM_CART } from '../../../../store/actions/cart-action';


describe('Cart actions', () => {
    const middlewares = [];
    const mockStore = configureMockStore(middlewares);

    beforeEach(async () => {
        await reloadApp();
    });

    describe('Should perform adding and removing of items in and from the cart respectively', () => {
        const product = new Product(
            'p1',
            'u1',
            'Red Shirt',
            'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
            'A red t-shirt, perfect for days with non-red weather.',
            29.99
        );
        const cartAction = { type: ADD_TO_CART, product };
        const store = mockStore();
        store.dispatch(addToCart(product));

        it('passes orders as a payload to addToCart', () => {
            expect(store.getActions()).to.deep.equal([cartAction]);
        });
        it('#removeFromCart > Removes a product from the cart', () => {
            const cartAction = { type: REMOVE_FROM_CART, productId: product.id };
            const store = mockStore();
            store.dispatch(removeFromCart(product.id));
            expect(store.getActions()).to.deep.equal([cartAction]);

        });
    })
});
