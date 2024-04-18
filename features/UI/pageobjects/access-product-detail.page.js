const { expect: wdioExpect , $ } = require('@wdio/globals');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const plugins = require('../../../support/plugins');
const GeneralPage = require('./general.page');

chai.use(chaiAsPromised);
const expect = chai.expect;

class AccessProductDetailPage {

    async checkSpecificProductData(product_name) {
        if (global.temp_value['product_array'] === undefined) {
            global.temp_value['product_array'] = '0';
        } else {
            let temp_data = parseInt(global.temp_value['product_array']);
            global.temp_value['product_array'] = (temp_data + 1).toString();
        }

        await browser.pause(1000);
        let product_array = await global.temp_value['product_array'];

        global.temp_value[`product_name_${product_array}`] = product_name;

        await expect((this.elements.txtProductDescOnListProduct(product_name)).isDisplayed()).to.eventually.equal(true);
        global.temp_value[`product_desc_${product_array}`] = await this.elements.txtProductDescOnListProduct(product_name).getText();

        await expect((this.elements.txtProductPriceOnListProduct(product_name)).isDisplayed()).to.eventually.equal(true);
        global.temp_value[`product_price_${product_array}`] = (await (this.elements.txtProductPriceOnListProduct(product_name).getText())).replace('$', '');

        await expect((this.elements.imgProductOnListProduct(product_name)).isDisplayed()).to.eventually.equal(true);
        global.temp_value[`product_image_${product_array}`] = await (await this.elements.imgProductOnListProduct(product_name)).getAttribute('src');        
    }

    async clickOnSpecificProductCard(product_name) {
        await expect((this.elements.txtButtonProductName(product_name)).isDisplayed()).to.eventually.equal(true);
        await this.elements.txtButtonProductName(product_name).click();
    }

    async onProductDetailPage() {
        await plugins.waitForPageIsLoaded();
        await wdioExpect(browser).toHaveUrl(wdioExpect.stringContaining('/inventory-item.html'));
        await expect((GeneralPage.elements.btnGeneral('back-to-products')).isDisplayed()).to.eventually.equal(true);
    }

    async validateProductDataOnProductDetail() {
        await browser.pause(1000);
        let product_array = await global.temp_value['product_array'];

        await expect((this.elements.txtProductNameOnDetailProduct(global.temp_value[`product_name_${product_array}`])).isDisplayed()).to.eventually.equal(true);
        await expect((this.elements.txtProductDescOnDetailProduct(global.temp_value[`product_desc_${product_array}`])).isDisplayed()).to.eventually.equal(true);
        await expect((this.elements.txtProductPriceOnDetailProduct(global.temp_value[`product_price_${product_array}`])).isDisplayed()).to.eventually.equal(true);
        await expect((this.elements.imgProductOnDetailProduct(global.temp_value[`product_image_${product_array}`])).isDisplayed()).to.eventually.equal(true);
    }

    elements = {
        txtProductDescOnListProduct: (product_name) => { return $(`//div[@data-test='inventory-item-name' and contains(text(),'${product_name}')]/parent::a/parent::div/div[@class='inventory_item_desc']`) },
        txtProductPriceOnListProduct: (product_name) => { return $(`//div[@data-test='inventory-item-name' and contains(text(),'${product_name}')]/parent::a/parent::div/parent::div/div/div[@class='inventory_item_price']`) },
        imgProductOnListProduct: (product_name) => { return $(`//div[@data-test='inventory-item-name' and contains(text(),'${product_name}')]/parent::a/parent::div/parent::div/parent::div/div[@class='inventory_item_img']/a/img`) },
        txtButtonProductName: (product_name) => { return $(`//div[@data-test='inventory-item-name' and contains(text(),'${product_name}')]/parent::a`) },
        txtProductNameOnDetailProduct: (text) => { return $(`//div[contains(@class,'inventory_details_name') and contains(text(),"${text}")]`) },
        txtProductDescOnDetailProduct: (text) => { return $(`//div[contains(@class,'inventory_details_desc') and contains(text(),"${text}")]`) },
        txtProductPriceOnDetailProduct: (text) => { return $(`//div[@class='inventory_details_price' and contains(normalize-space(),"${text}")]`) },
        imgProductOnDetailProduct: (text) => { return $(`//img[contains(@src,"${text}")]`) },
    }
}

module.exports = new AccessProductDetailPage();