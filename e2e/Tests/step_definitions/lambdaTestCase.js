import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
const { HomePage } = require('../../Pages/HomePage.js');
const { CategoryPage } = require('../../Pages/CategoryPage.js');
const { SearchProductPage } = require('../../Pages/SearchProductPage.js');
const { ProductDetailPage } = require('../../Pages/ProductDetailPage.js');

const { Given, When, Then } = createBdd();

let homePage;
let categoryPage;
let searchProductPage;
let productDetailPage;
let productSelected;

Given('the user is on the e-commerce playground homepage', async ({ page }) => {
  homePage = new HomePage(page);
  categoryPage = new CategoryPage(page);
  searchProductPage = new SearchProductPage(page);
  productDetailPage = new ProductDetailPage(page);
  await homePage.navigateTo();
});

When('the user navigates to the homepage', async () => {
  await homePage.clickHomeMenuOption();
});

Then('the page title should contain Poco Electro', async () => {
  await expect(await homePage.homePageTitle).toBeVisible();
});

Then('the main navigation should be visible', async () => {
  await expect(await homePage.mainNavigation).toBeVisible();
});

Then('the dummy website message should be displayed', async () => {
  await expect(await homePage.getDummyMessage()).toBe(
    'This is a dummy website for Web Automation Testing'
  );
});

Then('the search bar should be accessible', async () => {
  await expect(await homePage.searchInput).toBeEditable();
});

Then('the cart should show as empty', async () => {
  await expect(await homePage.getCartBadgeValue()).toBe(0);
});

Then('the following sections should be visible:', async ({}, dataTable) => {
  await expect(await homePage.getModuleTitles()).toEqual(
    expect.arrayContaining(dataTable.raw().flat())
  );
});

Then('the footer should contain copyright information', async ({}) => {
  await expect(await homePage.copyrightInfo).toBeVisible();
});

When('the user hovers over Mega Menu', async ({}) => {
  await homePage.hoverMegaMenu();
});

Then('the mega menu should expand', async ({}) => {
  await expect(homePage.megaMenuSubmenuContent).toBeVisible();
});

When('the user clicks on {string} category', async ({}, category) => {
  await homePage.selectMegaMenuSubmenu(category);
});

Then(
  'the user should be redirected to the {string} page',
  async ({}, categoryUrl) => {
    await categoryPage.waitForURL(categoryUrl);
  }
);

Then(
  'the page should display {string} in the heading',
  async ({}, category) => {
    await expect(await categoryPage.getCategoryTitle()).toBe(category);
  }
);

Then('products should be listed in the category', async ({}) => {
  await expect(await categoryPage.getProductListLength()).toBeGreaterThan(0);
});

When('the user enters {string} in the search bar', async ({}, searchTerm) => {
  await homePage.searchProduct(searchTerm);
});

When('the user clicks the search button', async ({}) => {
  await homePage.clickSearchButton();
});

Then('the search results page should be displayed', async ({}) => {
  await expect(await searchProductPage.breadcrumb).toBeVisible();
});

Then('the results should contain {string} products', async ({}, searchTerm) => {
  await expect(await searchProductPage.getTitleText()).toContain(searchTerm);
});

Then(
  'the search term {string} should be retained in the search box',
  async ({}, searchTerm) => {
    await expect(await searchProductPage.getSearchInputValue()).toBe(
      searchTerm
    );
  }
);

Then('a {string} message should be displayed', async ({}, message) => {
  await expect(await searchProductPage.getProductNotFoundMessage()).toContain(
    message
  );
});

When('selects ramdom product from the search results', async ({}) => {
  await searchProductPage.waitForURL(
    `/index.php?route=product%2Fsearch&search=**`
  );
  productSelected = await searchProductPage.getRandomProduct();
});

Then('the prodcut name should be visible', async ({}) => {
  await searchProductPage.waitForURL('/index.php?route=product/**');
  await expect
    .soft(productSelected.name)
    .toContain(await productDetailPage.getProductName());
});

Then('the product price should be visible', async ({}) => {
  await expect
    .soft(productSelected.price)
    .toContain(await productDetailPage.getProductPrice());
});

Then(
  'the quantity selector should default to {string}',
  async ({}, quantity) => {
    await expect
      .soft(await productDetailPage.quantityInput)
      .toHaveValue(quantity);
  }
);
