const { Given, When, Then } = require('@wdio/cucumber-framework');

const AccessProductDetailPage = require('../pageobjects/access-product-detail.page');

When('I check product data on product card with {string} as product name', async (product_name) => {
    await AccessProductDetailPage.checkSpecificProductData(product_name);
});

When('I click on product card with {string} as product name', async (product_name) => {
    await AccessProductDetailPage.clickOnSpecificProductCard(product_name)
});

Then('I am on product detail page', async () => {
    await AccessProductDetailPage.onProductDetailPage();
});

Then('I validate product title, desc, price, and image is equal to list product page', async () => {
    await AccessProductDetailPage.validateProductDataOnProductDetail();
});