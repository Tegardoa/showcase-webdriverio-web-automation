Feature: Access Product Detail

  Background:
    Given I am on login page
    When I type 'standard_user' on 'username' field
    And I type 'secret_sauce' on 'password' field
    And I click on 'login-button' button
    Then I am on product list page

  @positive
  Scenario: As user want to purchase single product until success
    When I check product data on product card with 'Sauce Labs Bolt T-Shirt' as product name
    And I click on product card with 'Sauce Labs Bolt T-Shirt' as product name
    Then I am on product detail page
    And I validate product title, desc, price, and image is equal to list product page
    When I 'add' product through product detail page
    Then I can see badge on shopping cart with correct total product
    When I click cart button on top navbar
    Then I am on cart page
    And I validate products are added to cart
    When I click on 'checkout' button
    Then I am on personal information checkout page
    When I type 'Andy' on 'firstName' field
    And I type 'Yudithio' on 'lastName' field
    And I type '12345' on 'postalCode' field
    And I click on 'continue' button
    Then I am on overview checkout page
    And I validate products are added to cart
    And I validate total product price and total product tax are correct
    When I click on 'finish' button
    Then I am on complete checkout page
    And I validate product order is success

  @positive
  Scenario: As user want to purchase multiple product until success order
    When I check product data on product card with 'Sauce Labs Backpack' as product name
    And I click on product card with 'Sauce Labs Backpack' as product name
    Then I am on product detail page
    And I validate product title, desc, price, and image is equal to list product page
    When I 'add' product through product detail page
    Then I can see badge on shopping cart with correct total product
    When I click on 'back-to-products' button
    And I check product data on product card with 'Sauce Labs Bike Light' as product name
    And I click on product card with 'Sauce Labs Bike Light' as product name
    Then I am on product detail page
    And I validate product title, desc, price, and image is equal to list product page
    When I 'add' product through product detail page
    Then I can see badge on shopping cart with correct total product
    When I click on 'back-to-products' button
    And I check product data on product card with 'Sauce Labs Fleece Jacket' as product name
    And I click on product card with 'Sauce Labs Fleece Jacket' as product name
    Then I am on product detail page
    And I validate product title, desc, price, and image is equal to list product page
    When I 'add' product through product detail page
    Then I can see badge on shopping cart with correct total product
    When I click cart button on top navbar
    Then I am on cart page
    And I validate products are added to cart
    When I click on 'checkout' button
    Then I am on personal information checkout page
    When I type 'Andy' on 'firstName' field
    And I type 'Yudithio' on 'lastName' field
    And I type '12345' on 'postalCode' field
    And I click on 'continue' button
    Then I am on overview checkout page
    And I validate products are added to cart
    And I validate total product price and total product tax are correct
    When I click on 'finish' button
    Then I am on complete checkout page
    And I validate product order is success

  @negative
  Scenario: As user want to purchase single product without personal information
    When I check product data on product card with 'Sauce Labs Bolt T-Shirt' as product name
    And I click on product card with 'Sauce Labs Bolt T-Shirt' as product name
    Then I am on product detail page
    And I validate product title, desc, price, and image is equal to list product page
    When I 'add' product through product detail page
    Then I can see badge on shopping cart with correct total product
    When I click cart button on top navbar
    Then I am on cart page
    And I validate products are added to cart
    When I click on 'checkout' button
    Then I am on personal information checkout page
    When I click on 'continue' button
    Then I got error message with text 'First Name is required'
