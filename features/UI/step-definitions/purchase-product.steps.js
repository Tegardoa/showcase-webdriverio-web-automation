const { Given, When, Then } = require('@wdio/cucumber-framework');

const PurchaseProductPage = require('../pageobjects/purchase-product.page');

When('I click cart button on top navbar', async () => {
    await PurchaseProductPage.clickButtonCartOnTopNavBar();
});

Then('I am on cart page', async () => {
    await PurchaseProductPage.onCartPage();
});

Then('I validate products are added to cart', async () => {
    await PurchaseProductPage.validateProductDataOnCartPage();
});

Then('I am on personal information checkout page', async () => {
    await PurchaseProductPage.onPersonalInformationCheckoutPage();
});

Then('I am on overview checkout page', async () => {
    await PurchaseProductPage.onOverviewCheckoutPage();
});

Then('I validate total product price and total product tax are correct', async () => {
    await PurchaseProductPage.validateTotalProductPriceAndTax();
});

Then('I am on complete checkout page', async () => {
    await PurchaseProductPage.onCompleteCheckoutPage();
});

Then('I validate product order is success', async () => {
    await PurchaseProductPage.validateSuccessOrder();
});