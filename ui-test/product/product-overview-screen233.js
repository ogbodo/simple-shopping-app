import { expect } from 'chai';
import { reloadApp } from 'detox-expo-helpers'


describe('Should See an overview of all available products', () => {

    beforeEach(async () => {
        await reloadApp();
    });
    it('at least a product"s title, price and image should be visible to user', async () => {
        await expect(element(by.label('Red Shirt'))).toBeVisible();
        await expect(element(by.label('#29.99'))).toBeVisible();
    });
});
