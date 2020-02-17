import { render } from 'react-native-testing-library'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Product from '../models/product';

const PRODUCTS = [
    new Product(
        'p1',
        'u1',
        'Red Shirt',
        'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
        'A red t-shirt, perfect for days with non-red weather.',
        29.99
    ),
    new Product(
        'p2',
        'u1',
        'Blue Carpet',
        'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        'Fits your red shirt perfectly. To stand on. Not to wear it.',
        99.99
    )];
const INITIAL_STATE = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}
const middlewares = [];
const mockStore = configureMockStore(middlewares);
const store = mockStore(INITIAL_STATE);

const reactRedux = (UI, options) => render(UI, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options
});

//Re- export everything for convenience sake
export * from 'react-native-testing-library';

//Override the render method
export { reactRedux as render, store };