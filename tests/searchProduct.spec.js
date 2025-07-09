// @ts-check
// @ts-ignore
import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test('Search the text iPod Nano', async ({ page }) => {
  await page.goto('/');
  await page.locator("span.title",{hasText: 'Mega Menu'}).hover();
  await page.locator("a[title=Desktop]").click();
  await page.locator("div.carousel-item.active > img[title='iPod Nano']").click();
  await page.locator("#container button[title='Add to Cart']").click();
  await page.locator("a.btn.btn-primary.btn-block",{hasText: 'View Cart'}).click();
  await expect(page.locator("td[class='text-left'] a", { hasText: 'iPod Nano' })).toBeVisible();
  await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue('1');

  
});


test('Validate that homepage loads successfully', async ({ page }) => {
  await page.goto('/');
  const title = await page.getByTitle('Poco Electro')
  await expect(title).toBeVisible();
  const badge = page.locator('.cart-item-total').first();
  const badgeText = await badge.textContent();
  const badgeValue = parseInt(badgeText?.trim() || '0', 10);
  await expect(badgeValue).toBe(0)
  const dummyMessageObj = await page.locator('p[class="m-0 font-size-sm"] strong')
  const dummyMessage = await dummyMessageObj.textContent();
  await expect(dummyMessage).toBe('This is a dummy website for Web Automation Testing')
  await page.locator('#entry_217831').isVisible();
  const searchTerm = 'ipod'
  await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').fill('ipod')
  await page.keyboard.press('Enter')
  await page.waitForURL(`https://ecommerce-playground.lambdatest.io/index.php?route=product%2Fsearch&search=${searchTerm}`)
  expect(await page.url()).toContain(searchTerm)
});

test('Verify homepage UI elements', async ({ page }) => {
  await page.goto('/');
  await expect(await page.locator('#entry_217978').textContent()).toContain('Top Products')
  await expect(await page.locator('div[class="mz-tab-listing-header d-flex flex-wrap tabs"] h3[class="module-title"]').textContent()).toContain('Top Collection')
  await expect(await page.locator('#entry_217991').textContent()).toContain('From The Blog')
  await expect(await page.locator('#entry_217969').textContent()).toContain('Top Trending Categories')
});



test('Navigate to product categories via mega menu', async ({ page }) => {
  await page.goto('/');
   await page.locator("span.title",{hasText: 'Mega Menu'}).hover();
   const submenu = await page.locator('#entry281_216475');
   await expect(submenu).toBeVisible();
   await page.locator('a[title="Desktop"]').click();
   await page.waitForURL('/index.php?route=product/category&path=20');
   const title = await page.locator('#entry_212392')
   const titleText = await title.textContent()
   await expect(titleText).toBe('Desktops')
   const productList = await page.locator('#entry_212408')
   await expect(productList).toBeVisible();
});


const category = [
  { searchCategory: 'Apple', expectedTitleContains: 'Apple' },
  { searchCategory: 'Desktop',  expectedTitleContains: 'Desktops' },
  { searchCategory: 'HP', expectedTitleContains: 'HTC' },
];

category.forEach(({ searchCategory, expectedTitleContains }) => {
  test(`Search for "${searchCategory}" should update URL`, async ({ page }) => {
       await page.goto('/');
    await page.locator("span.title",{hasText: 'Mega Menu'}).hover();
       await page.locator(`a[title="${searchCategory}"]`).click();
    const title =  await page.locator('h1[class="h4"]')
   const titleText = await title.textContent()
   await expect(titleText).toBe(`${expectedTitleContains}`)
  });
});



test('Search for products using search bar', async ({ page }) => {
  await page.goto('/');
   const searchTerm = 'iphone'
  await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').fill(searchTerm)
  await page.locator('button[class="type-text"]').first().click();
  const title =  await page.locator('h1[class="h4"]')
  const titleText = await title.textContent()
  await expect(titleText).toContain(searchTerm)
  const searchBarContent = await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').inputValue();
  await expect(searchBarContent).toBe(searchTerm)
});

const product = [ 'Canon' , 'HTC' , 'ipod'];

product.forEach((product) => {
  test(`Search for different "${product}" `, async ({ page }) => {
  await page.goto('/');
  await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').fill(product)
  await page.locator('button[class="type-text"]').first().click();
  const title =  await page.locator('h1[class="h4"]')
  const titleText = await title.textContent()
  await expect(titleText).toContain(product)
  const searchBarContent = await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').inputValue();
  await expect(searchBarContent).toBe(product)
  });
});



test('Search with no results', async ({ page }) => {
  await page.goto('/');
   const searchTerm = 'fadgadadvds'
  await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').fill(searchTerm)
  await page.locator('button[class="type-text"]').first().click();
  const title =  await page.locator('div[id="entry_212469"] p')
  const titleText = await title.textContent()
  await expect(titleText).toContain('There is no product that matches the search criteria.') 
});


test('Search with empty query', async ({ page }) => {
  await page.goto('/');
   const searchTerm = ' '
  await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').fill(searchTerm)
  await page.locator('button[class="type-text"]').first().click(); 
  const productList = await page.locator('#entry_212469')
  await expect(productList).toBeVisible();
});


test('View product details', async ({ page }) => {
 await page.goto('/');
   const searchTerm = 'Apple'
  await page.locator('div[id="entry_217822"] input[placeholder="Search For Products"]').fill(searchTerm)
  await page.locator('button[class="type-text"]').first().click(); 
  await page.waitForSelector('.product-layout.product-grid');
  const products = await page.$$('.product-layout.product-grid')
  expect.soft(products.length).toBeGreaterThan(0);  
  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex];
  const nameData = (await randomProduct.$('.caption .title'))
  const name = await nameData?.innerText()
  const priceData = await randomProduct.$('.caption .price');
  const price = await priceData?.innerText();
  const imageData = await randomProduct.$('.image img');
  const imageUrl = await imageData?.getAttribute('src');


  const selectedProduct = {
  name: name?.trim(),
  price: price?.trim(),
  image: imageUrl
  };
  
  await randomProduct.click();
  await page.waitForURL('/index.php?route=product/**')
  const nameDetail = await page.locator('.h3').textContent()
  const priceDetail = await  page.locator('.price-new.mb-0').textContent()
  await expect.soft(selectedProduct.name).toContain(nameDetail)
  await expect.soft(selectedProduct.price).toContain(priceDetail)
  await expect.soft(page.locator('div[id="entry_216841"] input[name="quantity"]')).toHaveValue('1')
});








