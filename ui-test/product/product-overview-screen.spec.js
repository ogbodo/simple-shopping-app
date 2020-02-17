import React from 'react'
import { store } from '../test-utils';
import ProductOverviewScreen from '../../screens/shop/ProductOverviewScreen';


afterEach(() => {
    cleanup();
    store.clearActions();
});

describe('<ProductOverviewScreen/>', () => {
    beforeEach(async () => {
        await reloadApp();
    });

    it('should display an overview of products', () => {
        const rendered = render(<ProductOverviewScreen />);
        const productTitle = rendered.getByTestId('productTitle');
        const productPrice = rendered.getByTestId('productPrice');
        const cardItem = rendered.getByTestId('p1');
        console.log("cardItem", cardItem);

        expect(productTitle.props.children).toContain('Red Shirt');
        expect(productPrice.props.children).toContain(29.99);
    });
});