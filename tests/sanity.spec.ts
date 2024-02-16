import { test, expect } from '@playwright/test';
import LoginPage  from '../pages/LoginPage';
import UserCredentials from '../helpers/UserCredentials';
import ProductsPage from '../pages/ProductsPage';
import GlobalConstants from '../helpers/GlobalConstants';
import { PagesURL } from '../helpers/PagesURLEnum';


test('Demo Test', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication();
});

test('Demo Test 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(UserCredentials.PERFORMANCE_GLITCH_USER);
  const productsPage = new ProductsPage(page);
  await productsPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
  await productsPage.validateTitle("Products");

});

test('Sanity Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
 
  await loginPage.loginToApplication();
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

/* test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(UserCredentials.STANDARD_USER);
  await page.locator('[data-test="password"]').fill(UserCredentials.CORECT_PASSWORD);
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
}); */