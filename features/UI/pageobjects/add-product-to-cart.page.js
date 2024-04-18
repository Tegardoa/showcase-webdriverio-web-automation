const { expect: wdioExpect , $ } = require('@wdio/globals');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const plugins = require('../../../support/plugins');
const GeneralPage = require('./general.page');

chai.use(chaiAsPromised);
const expect = chai.expect;

class AddProductToCartPage {

    async calculateCartCounter(method) {
        if (global.temp_value['cart_counter'] === undefined) {
            global.temp_value['cart_counter'] = 0;
        }

        switch(method) {
            case 'add':
                global.temp_value['cart_counter'] += 1;
                break;
            case 'remove':
                global.temp_value['cart_counter'] -= 1;
                break;
            default:
                throw new Error (`Method ${method} is not found`);
        }
    }

    async validateTotalProductOnCartBadge() {
        let final_cart_counter = global.temp_value['cart_counter'].toString();

        if (final_cart_counter === '0') {
            global.temp_value['product_array'] = undefined;
            await this.elements.iconCartBadge().waitForExist({reverse: true});
        } else {
            await expect((this.elements.iconCartBadge()).isDisplayed()).to.eventually.equal(true);
            await wdioExpect(this.elements.iconCartBadge()).toHaveText(final_cart_counter);
        }
    }

    elements = {
        iconCartBadge: () => { return $('//span[@class="shopping_cart_badge"]') },
    }
}

module.exports = new AddProductToCartPage();