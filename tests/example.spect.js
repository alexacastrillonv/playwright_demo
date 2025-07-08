import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Test 3', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  // Click the get started link.
  await page.locator('input[data-autocomplete_route="extension/maza/product/product/autocomplete"]').fill('Iphone')
  await page.keyboard.press('Enter')
  await expect(page.locator('//ol[contains(@class,\'ui-search-layout\')]')).toBeVisible()
  await page.pause()
 

  
});

