import { expect } from 'chai';
import { reloadApp } from 'detox-expo-helpers'
import Product from '../../../../models/product';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../../../../store/actions/cart-action';
import cartReducer from '../../../../store/reducers/cart-reducer';
import CartItem from '../../../../models/cart-item';

describe('Cart reducers', () => {
    const realDateNow = Date.now.bind(global.Date);
    beforeEach(async () => {
        await reloadApp();
        const dateNowStub = jest.fn(() => 1530518207007);
        global.Date.now = dateNowStub;
    });
    afterEach(async () => {
        global.Date.now = realDateNow;
    });

    it('Adds brand new product to cart', () => {
        const product = new Product(
            'p5',
            'u3',
            'PowerBook',
            'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
            'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
            2299.99
        )

        const initialState = {
            items: {},
            totalAmount: 0
        }
        const cartReducerObj = cartReducer(initialState, {
            type: ADD_TO_CART, product
        });

        expect(cartReducerObj).to.deep.equal({
            items: { 'p5': new CartItem(1, product.title, product.price, product.price) },
            totalAmount: 2299.99
        });

    });
    it('Updates an existing product in the cart', () => {
        const product = new Product(
            'p5',
            'u3',
            'PowerBook',
            'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
            'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
            2299.99)


        const initialState = {
            items: { 'p5': new CartItem(1, 'PowerBook', 2299.99, 2299.99) },
            totalAmount: 2299.99
        }
        const cartReducerUpdates = cartReducer(initialState, { type: ADD_TO_CART, product });

        expect(cartReducerUpdates).to.deep.equal({
            items: { 'p5': new CartItem(2, product.title, product.price, 4599.98) },
            totalAmount: 4599.98
        });
    });
    it('Removes an existing product in the cart', () => {
        const initialState = {
            items: { 'p5': new CartItem(1, 'PowerBook', 2299.99, 2299.99) },
            totalAmount: 2299.99
        }
        const cartReducerRemoves = cartReducer(initialState, { type: REMOVE_FROM_CART, productId: 'p5' });

        expect(cartReducerRemoves).to.deep.equal({ items: {}, totalAmount: 0 });
    });
    it('Decrease the quantity of an existing product in the cart', () => {
        const initialState = {
            items: { 'p5': new CartItem(2, 'PowerBook', 2299.99, 4599.98) },
            totalAmount: 4599.98
        }
        const cartReducerRemoves = cartReducer(initialState, { type: REMOVE_FROM_CART, productId: 'p5' });

        expect(cartReducerRemoves).to.deep.equal({
            items: { 'p5': new CartItem(1, 'PowerBook', 2299.99, 2299.99) },
            totalAmount: 2299.99
        });
    });
});
