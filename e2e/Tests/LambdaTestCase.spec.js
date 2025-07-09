import { test, expect } from '@playwright/test';
import {HomePage} from '../Pages/HomePage.spec.js';
import {CategoryPage} from '../Pages/CategoryPage.spec.js';
import {SearchProductPage} from '../Pages/SearchProductPage.spec.js';
import {ProductDetailPage} from '../Pages/ProductDetailPage.spec.js';


test.describe('Home Page Validations', () => {
  

  test('Validate that homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo();
    await expect(await homePage.homePageTitle).toBeVisible();
    await expect( await homePage.getCartBadgeValue()).toBe(0);
    await expect(await homePage.getDummyMessage()).toBe('This is a dummy website for Web Automation Testing');
    await expect(await homePage.mainNavigation).toBeVisible();
    await expect(await homePage.searchInput).toBeEditable();
});

test('Verify homepage UI elements', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  const expectedCategoriesExpected = ['Top Products','Top Collection' , 'From The Blog','Top Trending Categories', 'Under @99']
  await expect(await homePage.getModuleTitles()).toEqual(expect.arrayContaining(expectedCategoriesExpected));
});

test('Navigate to product categories via mega menu', async ({ page }) => {
  const homePage = new HomePage(page);
  const categoryPage = new CategoryPage(page);
  await homePage.navigateTo();
  await homePage.hoverMegaMenu();
  await expect(homePage.megaMenuSubmenuContent).toBeVisible();
  await homePage.selectMegaMenuSubmenu('Desktop');
  await categoryPage.waitForURL('/index.php?route=product/category&path=20');
  await expect(await categoryPage.getCategoryTitle()).toBe('Desktops');
  await expect(await categoryPage.getProductListLength()).toBeGreaterThan(0);
});

});

test.describe('Search Product Validations', () => {
  
  const category = [
  { searchCategory: 'Apple', expectedTitleContains: 'Apple', url: '/index.php?route=product/manufacturer/info&manufacturer_id=8' },
  { searchCategory: 'Desktop',  expectedTitleContains: 'Desktops', url: '/index.php?route=product/category&path=20' },
  { searchCategory: 'HP', expectedTitleContains: 'HTC' , url: '/index.php?route=product/manufacturer/info&manufacturer_id=5' },
];

category.forEach(({ searchCategory, expectedTitleContains, url }) => {
  test(`Search for "${searchCategory}" should update URL`, async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    await homePage.navigateTo();
    await homePage.hoverMegaMenu();
    await homePage.selectMegaMenuSubmenu(searchCategory);
    await categoryPage.waitForURL(url);
    await expect(await categoryPage.getCategoryTitle()).toBe(expectedTitleContains);
  });
});



test('Search for products using search bar', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchProductPage = new SearchProductPage(page);
  await homePage.navigateTo();
  const searchTerm = 'iphone';
  await homePage.searchProduct(searchTerm);
  await homePage.clickSearchButton();
  await expect(await searchProductPage.getTitleText()).toContain(searchTerm);
  await expect(await searchProductPage.getSearchInputValue()).toBe(searchTerm);
});

const product = [ 'Canon' , 'HTC' , 'ipod'];

product.forEach((product) => {
  test(`Search for different "${product}" `, async ({ page }) => {
    const homePage = new HomePage(page);
    const searchProductPage = new SearchProductPage(page);
    await homePage.navigateTo();
    await homePage.searchProduct(product);
    await homePage.clickSearchButton();
    await expect(await searchProductPage.getTitleText()).toContain(product);
    await expect(await searchProductPage.getSearchInputValue()).toBe(product);
  });
});



test('Search with no results', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchProductPage = new SearchProductPage(page);
  const searchTerm = 'fadgadadvds';
  await homePage.navigateTo();
  await homePage.searchProduct(searchTerm)
  await homePage.clickSearchButton();
  await expect(await searchProductPage.getProductNotFoundMessage()).toContain('There is no product that matches the search criteria.') 
});


test('Search with empty query', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchProductPage = new SearchProductPage(page);
  await homePage.navigateTo();
  await homePage.searchProduct(' ');
  await homePage.clickSearchButton();
  await searchProductPage.waitForURL(`/index.php?route=product%2Fsearch&search=+`);
  await expect(await searchProductPage.getProductListLength()).toBeGreaterThan(0);
});

});

test.describe('Product Details Validations', () => {
  test('View product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchProductPage = new SearchProductPage(page);
  const productDetailPage = new ProductDetailPage(page);
  const searchTerm = 'Apple';
  await homePage.navigateTo();
  await homePage.searchProduct(searchTerm);
  await homePage.clickSearchButton();
  await searchProductPage.waitForURL(`/index.php?route=product%2Fsearch&search=${searchTerm}`);
  const productSelected= await searchProductPage.getRandomProduct();
  await searchProductPage.waitForURL('/index.php?route=product/**');
  await expect.soft(productSelected.name).toContain(await productDetailPage.getProductName());
  await expect.soft(productSelected.price).toContain(await productDetailPage.getProductPrice());
  await expect.soft(await productDetailPage.quantityInput).toHaveValue('1');
});

});

















