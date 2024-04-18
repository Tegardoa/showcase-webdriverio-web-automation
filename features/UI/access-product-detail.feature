Feature: Access Product Detail

  Background:
    Given I am on login page
    When I type 'standard_user' on 'username' field
    And I type 'secret_sauce' on 'password' field
    And I click on 'login-button' button
    Then I am on product list page

  @positive
  Scenario: As user want to access product detail through product list then validate product data
    When I check product data on product card with 'Sauce Labs Onesie' as product name
    And I click on product card with 'Sauce Labs Onesie' as product name
    Then I am on product detail page
    And I validate product title, desc, price, and image is equal to list product page
