import { expect } from '@playwright/test';
import { HomePage } from '../../Pages/HomePage.js';
import { CategoryPage } from '../../Pages/CategoryPage.js';
import { SearchProductPage } from '../../Pages/SearchProductPage.js';
import { ProductDetailPage } from '../../Pages/ProductDetailPage.js';

import { Given, When, Then } from './fixtures.js';

Given(
  'the user is on the e-commerce playground homepage',
  async ({ page, ctx }) => {
    ctx.homePage = new HomePage(page);
    ctx.categoryPage = new CategoryPage(page);
    ctx.searchProductPage = new SearchProductPage(page);
    ctx.productDetailPage = new ProductDetailPage(page);
    await ctx.homePage.navigateTo();
  }
);

When('the user navigates to the homepage', async ({ ctx }) => {
  await ctx.homePage.clickHomeMenuOption();
});

Then('the page title should contain Poco Electro', async ({ ctx }) => {
  await expect(await ctx.homePage.homePageTitle).toBeVisible();
});

Then('the main navigation should be visible', async ({ ctx }) => {
  await expect(await ctx.homePage.mainNavigation).toBeVisible();
});

Then('the dummy website message should be displayed', async ({ ctx }) => {
  await expect(await ctx.homePage.getDummyMessage()).toBe(
    'This is a dummy website for Web Automation Testing'
  );
});

Then('the search bar should be accessible', async ({ ctx }) => {
  await expect(await ctx.homePage.searchInput).toBeEditable();
});

Then('the cart should show as empty', async ({ ctx }) => {
  await expect(await ctx.homePage.getCartBadgeValue()).toBe(0);
});

Then(
  'the following sections should be visible:',
  async ({ ctx }, dataTable) => {
    await expect(await ctx.homePage.getModuleTitles()).toEqual(
      expect.arrayContaining(dataTable.raw().flat())
    );
  }
);

Then('the footer should contain copyright information', async ({ ctx }) => {
  await expect(await ctx.homePage.copyrightInfo).toBeVisible();
});

When('the user hovers over Mega Menu', async ({ ctx }) => {
  await ctx.homePage.hoverMegaMenu();
});

Then('the mega menu should expand', async ({ ctx }) => {
  await expect(ctx.homePage.megaMenuSubmenuContent).toBeVisible();
});

When('the user clicks on {string} category', async ({ ctx }, category) => {
  await ctx.homePage.selectMegaMenuSubmenu(category);
});

Then(
  'the user should be redirected to the {string} page',
  async ({ ctx }, categoryUrl) => {
    await ctx.categoryPage.waitForURL(categoryUrl);
  }
);

Then(
  'the page should display {string} in the heading',
  async ({ ctx }, category) => {
    await expect(await ctx.categoryPage.getCategoryTitle()).toBe(category);
  }
);

Then('products should be listed in the category', async ({ ctx }) => {
  await expect(await ctx.categoryPage.getProductListLength()).toBeGreaterThan(
    0
  );
});

When(
  'the user enters {string} in the search bar',
  async ({ ctx }, searchTerm) => {
    await ctx.homePage.searchProduct(searchTerm);
  }
);

When('the user clicks the search button', async ({ ctx }) => {
  await ctx.homePage.clickSearchButton();
});

Then('the search results page should be displayed', async ({ ctx }) => {
  await expect(await ctx.searchProductPage.breadcrumb).toBeVisible();
});

Then(
  'the results should contain {string} products',
  async ({ ctx }, searchTerm) => {
    await expect(await ctx.searchProductPage.getTitleText()).toContain(
      searchTerm
    );
  }
);

Then(
  'the search term {string} should be retained in the search box',
  async ({ ctx }, searchTerm) => {
    await expect(await ctx.searchProductPage.getSearchInputValue()).toBe(
      searchTerm
    );
  }
);

Then('a {string} message should be displayed', async ({ ctx }, message) => {
  await expect(
    await ctx.searchProductPage.getProductNotFoundMessage()
  ).toContain(message);
});

When('selects ramdom product from the search results', async ({ ctx }) => {
  await ctx.searchProductPage.waitForURL(
    `/index.php?route=product%2Fsearch&search=**`
  );
  ctx.productSelected = await ctx.searchProductPage.getRandomProduct();
});

Then('the product name should be visible', async ({ ctx }) => {
  await ctx.searchProductPage.waitForURL('/index.php?route=product/**');
  await expect
    .soft(await ctx.productDetailPage.getProductName())
    .toContain(ctx.productSelected.name);
});

Then('the product price should be visible', async ({ ctx }) => {
  await expect
    .soft(ctx.productSelected.price)
    .toContain(await ctx.productDetailPage.getProductPrice());
});

Then(
  'the quantity selector should default to {string}',
  async ({ ctx }, quantity) => {
    await expect
      .soft(await ctx.productDetailPage.quantityInput)
      .toHaveValue(quantity);
  }
);
