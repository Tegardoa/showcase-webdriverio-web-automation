Feature: Login

  Background:
    Given I am on login page

  @positive
  Scenario: As user want to login using valid account

    When I type 'standard_user' on 'username' field
    And I type 'secret_sauce' on 'password' field
    And I click on 'login-button' button
    Then I am on product list page
  
  @negative
  Scenario: As user want to login using invalid account

    When I type 'standard_user' on 'username' field
    And I type 'wrong_sauce' on 'password' field
    And I click on 'login-button' button
    Then I got error message with text 'Username and password do not match'

  @negative
  Scenario: As user want to login using locked account

    When I type 'locked_out_user' on 'username' field
    And I type 'secret_sauce' on 'password' field
    And I click on 'login-button' button
    Then I got error message with text 'user has been locked out'
