const { Given, When, Then } = require('@wdio/cucumber-framework');

const LoginPage = require('../pageobjects/login.page');

Given('I am on login page', async () => {
    await LoginPage.onLoginPage();
});

Then('I am on product list page', async () => {
    await LoginPage.onProductListPage();
});