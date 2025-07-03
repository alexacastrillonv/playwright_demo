// @ts-check
import { test, expect } from '@playwright/test';

test('Search the text iPod Nano', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await page.locator("span.title",{hasText: 'Mega Menu'}).hover();
  await page.locator("a[title=Desktop]").click();
  await page.locator("div.carousel-item.active > img[title='iPod Nano']").click();
  await page.locator("#container button[title='Add to Cart']").click();
  await page.locator("a.btn.btn-primary.btn-block",{hasText: 'View Cart'}).click();
  await expect(page.locator("td[class='text-left'] a", { hasText: 'iPod Nano' })).toBeVisible();
  await expect(page.locator("div[class$='flex-nowrap'] > input")).toHaveValue('1');

  
});
