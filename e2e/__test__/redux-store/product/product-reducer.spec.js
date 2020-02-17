import { expect } from 'chai';
import PRODUCTS from '../../../../data/dummy-data';
import productReducer from '../../../../store/reducers/product-reducer';
import { LOAD_PRODUCTS } from '../../../../store/actions/product-action';
import { reloadApp } from 'detox-expo-helpers'

describe('Product reducers', () => {
    beforeEach(async () => {
        await reloadApp();
    });
    it('Stores product', () => {
        const initialState = { products: [] }
        const productsReducer = productReducer(initialState, { type: LOAD_PRODUCTS, products: PRODUCTS });
        expect(productsReducer).to.deep.equal({ products: PRODUCTS });

    })
});
