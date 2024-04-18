const { expect: wdioExpect , $ } = require('@wdio/globals');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const plugins = require('../../../support/plugins');

chai.use(chaiAsPromised);
const expect = chai.expect;

class GeneralPage {
    async typeTextOnField(text,data_test) {
        await expect((this.elements.fieldText(data_test)).isDisplayed()).to.eventually.equal(true);
        await this.elements.fieldText(data_test).setValue(text);
    }

    async clickSpecificButton(data_test) {
        await expect((this.elements.btnGeneral(data_test)).isDisplayed()).to.eventually.equal(true);
        await this.elements.btnGeneral(data_test).click();
    }

    async validateErrorMessage(text) {
        await expect((this.elements.txtError(text)).isDisplayed()).to.eventually.equal(true);
    }

    elements = {
        fieldText: (data_test) => { return $(`//input[contains(@class,'input') and (@data-test='${data_test}')]`) },
        btnGeneral: (data_test) => { return $(`//*[contains(@class,'btn') and (@data-test='${data_test}')]`) },
        txtError: (text) => { return $(`//*[contains(@data-test,'error') and contains(text(),'${text}')]`) },
        txtGeneral: (text) => { return $(`//*[contains(text(),"${text}")]`) }
    }
}

module.exports = new GeneralPage();