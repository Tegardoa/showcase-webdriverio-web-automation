const { Given, When, Then } = require('@wdio/cucumber-framework');

const AddProductToCartPage = require('../pageobjects/add-product-to-cart.page');
const GeneralPage = require('../pageobjects/general.page');

When('I {string} product through product detail page', async (method) => {
    await browser.pause(1000);

    switch(method) {
        case 'add':
            await GeneralPage.clickSpecificButton('add-to-cart');
            break;
        case 'remove':
            await GeneralPage.clickSpecificButton('remove');
            break;
        default:
            throw new Error (`Method ${method} is not found`);

    }
    
    await browser.pause(1000);
    await AddProductToCartPage.calculateCartCounter(method);
});

Then('I can see badge on shopping cart with correct total product', async () => {
    await AddProductToCartPage.validateTotalProductOnCartBadge();
});
