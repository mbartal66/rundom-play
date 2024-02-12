import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('a').filter({ hasText: '3' }).click();
  
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Meir');
  await page.locator('[data-test="lastName"]').fill('Bar-Tal');
  await page.locator('[data-test="postalCode"]').fill('7403707');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole('button', { name: 'Open Menu'}).click();
  await page.getByRole('link', {name: 'Reset App State'}).click();
  await page.getByRole('link', {name: 'Logout'}).click();
});