import { expect } from 'chai';
import { reloadApp } from 'detox-expo-helpers'
import configureMockStore from 'redux-mock-store';
import { fetchProducts, LOAD_PRODUCTS, addProductsAction } from '../../../store/actions/product-action';
import Product from '../../../models/product';
import PRODUCTS from '../../../data/dummy-data';


describe('Product actions', () => {
    const middlewares = [];
    const mockStore = configureMockStore(middlewares);

    beforeEach(async () => {
        await reloadApp();
    });

    describe('#addProductsAction', () => {

        it('passes product as a payload to addProductsAction', () => {
            const products = [new Product(
                'p1',
                'u1',
                'Red Shirt',
                'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
                'A red t-shirt, perfect for days with non-red weather.',
                29.99
            )];
            expect(addProductsAction(products)).to.deep.equal({ type: LOAD_PRODUCTS, products });
        });

    });

    describe('#fetchProducts', () => {
        it('Fetches products and calls addProductsAction', () => {
            const products = PRODUCTS;
            const store = mockStore();
            store.dispatch(fetchProducts());
            expect(store.getActions()).to.deep.equal([addProductsAction(products)]);

        });
    })
});
