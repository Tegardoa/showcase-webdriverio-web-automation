const { expect: wdioExpect , $ } = require('@wdio/globals');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const plugins = require('../../../support/plugins');

chai.use(chaiAsPromised);
const expect = chai.expect;

class LoginPage {
    async onLoginPage() {
        await browser.url('https://www.saucedemo.com');
        await plugins.waitForPageIsLoaded();
        await expect((this.elements.logoSwagLabs()).isDisplayed()).to.eventually.equal(true); 
        // I use expect - chai library caused by more accuracy to detect selector validity
        // If I only use .isDisplayed(), There is a possibility that wdio will ignore 
        // errors found due to selector mismatch
    }

    async onProductListPage() {
        await plugins.waitForPageIsLoaded();
        await wdioExpect(browser).toHaveUrl(wdioExpect.stringContaining('/inventory.html'));
        await expect((this.elements.txtTitleProductList()).isDisplayed()).to.eventually.equal(true);
    }

    elements = {
        logoSwagLabs: () => { return $('//div[@class="login_logo" and text()="Swag Labs"]') },
        txtTitleProductList: () => { return $('//span[@data-test="title" and text()="Products"]') },
    }
}

module.exports = new LoginPage();