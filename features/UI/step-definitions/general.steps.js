const { Given, When, Then } = require('@wdio/cucumber-framework');

const GeneralPage = require('../pageobjects/general.page');

When('I type {string} on {string} field', async (text,data_test) => {
    await GeneralPage.typeTextOnField(text,data_test)
});

When('I click on {string} button', async (data_test) => {
    await GeneralPage.clickSpecificButton(data_test)
});

Then('I got error message with text {string}', async (text) => {
    await GeneralPage.validateErrorMessage(text);
});