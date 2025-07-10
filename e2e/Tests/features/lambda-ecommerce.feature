Feature: E-commerce playground website testing

  Background:
    Given the user is on the e-commerce playground homepage

  Scenario: Verify homepage loads successfully
    When the user navigates to the homepage
    Then the page title should contain Poco Electro
    And the main navigation should be visible
    And the dummy website message should be displayed
    And the search bar should be accessible
    And the cart should show as empty

  Scenario: Verify homepage UI elements
    Then the following sections should be visible:
      | Top Products            |
      | Top Collection          |
      | Under @99               |
      | From The Blog           |
      | Top Trending Categories |

    And the footer should contain copyright information

  Scenario: Navigate to product categories via mega menu
    When the user hovers over Mega Menu
    Then the mega menu should expand
    When the user clicks on "Desktop" category
    Then the user should be redirected to the "/index.php?route=product/category&path=20" page
    And the page should display "Desktops" in the heading
    And products should be listed in the category

  Scenario Outline: Navigate to different product categories via mega menu
    When the user hovers over Mega Menu
    When the user clicks on "<searchCategory>" category
    Then the user should be redirected to the "<categoryUrl>" page
    And the page should display "<expectedHeading>" in the heading

    # title-format: category <searchCategory>
    Examples:
      | searchCategory | expectedHeading | categoryUrl                                                  |
      | Apple          | Apple           | /index.php?route=product/manufacturer/info&manufacturer_id=8 |
      | Desktop        | Desktops        | /index.php?route=product/category&path=20                    |
      | HP             | HTC             | /index.php?route=product/manufacturer/info&manufacturer_id=5 |

  Scenario: Search for products using search bar
    When the user enters "iPhone" in the search bar
    And the user clicks the search button
    Then the search results page should be displayed
    And the results should contain "iPhone" products
    And the search term "iPhone" should be retained in the search box

  Scenario Outline: Search for different products
    When the user enters "<searchTerm>" in the search bar
    And the user clicks the search button
    Then the search results page should be displayed
    And the results should contain "<searchTerm>" products
    And the search term "<searchTerm>" should be retained in the search box

    # title-format: search <searchTerm>
    Examples:
      | searchTerm |
      | MacBook    |
      | Canon      |
      | iPod Nano  |
      | HTC        |
      | Samsung    |

  Scenario: Search with no results
    When the user enters "NonExistentProduct12345" in the search bar
    And the user clicks the search button
    Then the search results page should be displayed
    And a "There is no product that matches the search criteria." message should be displayed

  Scenario: Search with empty query
    When the user enters "" in the search bar
    And the user clicks the search button
    Then the search results page should be displayed

  Scenario: View product details
    When the user enters "Apple" in the search bar
    And the user clicks the search button
    And the results should contain "Apple" products
    And selects ramdom product from the search results
    Then the prodcut name should be visible
    And the product price should be visible
    And the quantity selector should default to "1"
