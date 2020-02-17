import { expect } from 'chai';
import { reloadApp } from 'detox-expo-helpers'
import Product from '../../../models/product';
import Order from '../../../models/order';
import orderReducer from '../../../store/reducers/order-reducer';
import { ADD_ORDER } from '../../../store/actions/order-action';

describe('Order reducers', () => {
    const realDateNow = Date.now.bind(global.Date);
    beforeEach(async () => {
        await reloadApp();
        const dateNowStub = jest.fn(() => 1530518207007);
        global.Date.now = dateNowStub;
    });
    afterEach(async () => {
        global.Date.now = realDateNow;
    });

    it('Adds order to existing orders', () => {
        const orders = [
            new Product(
                'p4',
                'u3',
                'The Book - Limited Edition',
                'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
                "What the content is? Why would that matter? It's a limited edition!",
                15.99
            ),
            new Product(
                'p5',
                'u3',
                'PowerBook',
                'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
                'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
                2299.99
            )
        ]

        const initialState = { orders: [] }
        const ordersReducer = orderReducer(initialState, {
            type: ADD_ORDER,
            orderData: { items: orders, amount: 2315.98 }
        });
        expect(ordersReducer).to.deep.equal({
            orders: [
                new Order(new Date().toString(),
                    orders, 2315.98,
                    new Date().toString())
            ]
        });

    })
});
