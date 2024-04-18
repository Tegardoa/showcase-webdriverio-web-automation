const { expect: wdioExpect , $ } = require('@wdio/globals');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const plugins = require('../../../support/plugins');
const GeneralPage = require('./general.page');

chai.use(chaiAsPromised);
const expect = chai.expect;

class PurchaseProductPage {

    async clickButtonCartOnTopNavBar() {
        await this.elements.btnCart().click();
    }

    async onCartPage() {
        await plugins.waitForPageIsLoaded();
        await wdioExpect(browser).toHaveUrl(wdioExpect.stringContaining('/cart.html'));
        await expect((this.elements.txtTitleCart()).isDisplayed()).to.eventually.equal(true);
    }

    async validateProductDataOnCartPage() {
        for (let i = 0; i < global.temp_value['cart_counter']; i++) {
            await browser.pause(1000);

            let product_array = i.toString();
            let product_name = await global.temp_value[`product_name_${product_array}`];
            let product_desc = await global.temp_value[`product_desc_${product_array}`];
            let product_price = await global.temp_value[`product_price_${product_array}`];

            await expect((this.elements.txtProductNameOnCartPage(product_name)).isDisplayed()).to.eventually.equal(true);

            await expect((this.elements.txtProductDesc2OnCartPage(product_name,product_desc)).isDisplayed()).to.eventually.equal(true);

            await expect((this.elements.txtProductPriceOnCartPage(product_name,product_price)).isDisplayed()).to.eventually.equal(true);
        }
    }

    async onPersonalInformationCheckoutPage() {
        await plugins.waitForPageIsLoaded();
        await wdioExpect(browser).toHaveUrl(wdioExpect.stringContaining('/checkout-step-one.html'));
        await expect((this.elements.txtTitlePersonalInformationCheckout()).isDisplayed()).to.eventually.equal(true);
    }

    async onOverviewCheckoutPage() {
        await plugins.waitForPageIsLoaded();
        await wdioExpect(browser).toHaveUrl(wdioExpect.stringContaining('/checkout-step-two.html'));
        await expect((this.elements.txtTitleOverviewCheckout()).isDisplayed()).to.eventually.equal(true);
    }

    async calculateProductPrice() {
        await browser.pause(1000);

        let total_product_price = 0;

        for (let i = 0; i < global.temp_value['cart_counter']; i++) {
            let product_array = i.toString();
            
            total_product_price = total_product_price + parseFloat(global.temp_value[`product_price_${product_array}`]);
        }

        await plugins.toFixed(total_product_price, 2);

        await new Promise(resolve => setTimeout(resolve, 1000));

        return (total_product_price).toString()
    }

    async calculateProductTax() {
        await browser.pause(1000);

        let single_product_tax = 0;
        let total_product_tax = 0;

        for (let i = 0; i < global.temp_value['cart_counter']; i++) {
            let product_array = i.toString();
            
            single_product_tax = parseFloat(global.temp_value[`product_price_${product_array}`]) / 12.49;


            total_product_tax = total_product_tax + single_product_tax;
        }

        total_product_tax = await plugins.toFixed(total_product_tax, 2);

        await new Promise(resolve => setTimeout(resolve, 1000));

        return (total_product_tax).toString();
    }

    async validateTotalProductPriceAndTax() {
        let total_product_price = await this.calculateProductPrice();
        let total_product_tax = await this.calculateProductTax();

        let total_payment = (parseFloat(total_product_price) + parseFloat(total_product_tax)).toString();

        await expect((this.elements.txtTotalProductPrice(total_product_price)).isDisplayed()).to.eventually.equal(true);
        await expect((this.elements.txtTotalProductTax(total_product_tax)).isDisplayed()).to.eventually.equal(true);
        await expect((this.elements.txtTotalPayment(total_payment)).isDisplayed()).to.eventually.equal(true);

        await plugins.logInAsync(total_product_price);
        await plugins.logInAsync(total_product_tax);
        await plugins.logInAsync(total_payment);
    }

    async onCompleteCheckoutPage() {
        await plugins.waitForPageIsLoaded();
        await wdioExpect(browser).toHaveUrl(wdioExpect.stringContaining('/checkout-complete.html'));
        await expect((this.elements.txtTitleCompleteCheckout()).isDisplayed()).to.eventually.equal(true);
    }

    async validateSuccessOrder() {
        await browser.pause(1000);
        await expect((this.elements.imgSuccessOrder()).isDisplayed()).to.eventually.equal(true);
        await expect((GeneralPage.elements.txtGeneral('Thank you for your order!')).isDisplayed()).to.eventually.equal(true);
        await expect((GeneralPage.elements.txtGeneral('Your order has been dispatched, and will arrive just as fast as the pony can get there!')).isDisplayed()).to.eventually.equal(true);
    }


    elements = {
        btnCart: () => { return $('//a[@class="shopping_cart_link"]') },
        txtTitleCart: () => { return $('//span[@data-test="title" and text()="Your Cart"]') },
        txtButtonProductName: (product_name) => { return $(`//div[@data-test='inventory-item-name' and contains(text(),'${product_name}')]/parent::a`) },
        txtProductNameOnCartPage: (text) => { return $(`//div[@class="cart_item_label"]/a/div[@class="inventory_item_name" and text()="${text}"]`) },
        txtProductDescOnCartPage: (text) => { return $(`//div[@class="cart_item_label"]/a/div[@class="inventory_item_name" and text()="${text}"]/parent::a/following-sibling::div[@class="inventory_item_desc"]`) },
        txtProductDesc2OnCartPage: (text,desc) => { return $(`//div[@class="cart_item_label"]/a/div[@class="inventory_item_name" and text()="${text}"]/parent::a/following-sibling::div[@class="inventory_item_desc" and contains(text(),"${desc}")]`) },
        txtProductPriceOnCartPage: (text,price) => { return $(`//div[@class="cart_item_label"]/a/div[@class="inventory_item_name" and text()="${text}"]/parent::a/following-sibling::div/div[@class="inventory_item_price" and contains(normalize-space(),"${price}")]`) },
        txtTitlePersonalInformationCheckout: () => { return $('//span[@data-test="title" and text()="Checkout: Your Information"]') },
        txtTitleOverviewCheckout: () => { return $('//span[@data-test="title" and text()="Checkout: Overview"]') },
        txtTotalProductPrice: (price) => { return $(`//div[@class="summary_subtotal_label" and contains(normalize-space(),"${price}")]`) },
        txtTotalProductTax: (tax) => { return $(`//div[@class="summary_tax_label" and contains(normalize-space(),"${tax}")]`) },
        txtTotalPayment: (total) => { return $(`//div[@class="summary_total_label" and contains(normalize-space(),"${total}")]`) },
        txtTitleCompleteCheckout: () => { return $('//span[@data-test="title" and text()="Checkout: Complete!"]') },
        imgSuccessOrder: () => { return $('//img[@data-test="pony-express"]') },
    }
}

module.exports = new PurchaseProductPage();