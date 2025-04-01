import { test, expect } from '@playwright/test';
import LoginPage  from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import GlobalConstants from '../helpers/GlobalConstants';
import { PagesURL } from '../helpers/PagesURLEnum';
import CartPage from '../pages/CartPage';
import CheckoutInfoPage from '../pages/CheckoutInfoPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';


test('Demo Test', async ({ page }) => {
  
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication();
});

test('Demo Test 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginToApplication(process.env.PERFORMANCE_GLITCH_USER);
  const productsPage = new ProductsPage(page);
  await productsPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
  await productsPage.validateTitle("Products");

});

test('Sanity Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);

  await loginPage.loginToApplication();
  await productsPage.validatePageUrl(GlobalConstants.BASE_URL + PagesURL.INVENTORY);
  await productsPage.validateTitle("Products");
  /* await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click(); */
  let products = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'];
  await productsPage.chooseProductsByTitle(products);
  /* await productsPage.chooseProductByTitle('Sauce Labs Backpack');
  await productsPage.chooseProductByTitle('Sauce Labs Fleece Jacket');
  await productsPage.chooseProductByTitle('Sauce Labs Onesie'); */
  await productsPage.validateNumberOfItemsInCart(products.length.toString());
  await productsPage.gotoCart();
  //await page.locator('a').filter({ hasText: '3' }).click();
  await cartPage.validateTitle("Your Cart");
  await cartPage.validateNumberOfCartItems(products.length);

  // Remove one item from the cart
  await cartPage.removeCartItem('Sauce Labs Backpack');
  await cartPage.validateNumberOfCartItems(products.length-1);


  //await page.locator('[data-test="checkout"]').click();
  await cartPage.clickOnCheckoutButton();
  /* await page.locator('[data-test="firstName"]').fill('Meir');
  await page.locator('[data-test="lastName"]').fill('Bar-Tal');
  await page.locator('[data-test="postalCode"]').fill('7403707');
  await page.locator('[data-test="continue"]').click(); */

  await checkoutInfoPage.validateTitle('Checkout: Your Information');
  await checkoutInfoPage.fillCheckoutInfo('Meir', 'Bar-Tal', '7403707');
  await checkoutInfoPage.clickOnContinue();

  await checkoutOverviewPage.validateTitle('Checkout: Overview');  
  //await page.locator('[data-test="finish"]').click();
  await checkoutOverviewPage.clickOnFinish();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByRole('button', { name: 'Open Menu'}).click();
  await page.getByRole('link', {name: 'Reset App State'}).click();
  await page.getByRole('link', {name: 'Logout'}).click();
});

/* test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(process.env.STANDARD_USER);
  await page.locator('[data-test="password"]').fill(process.env.CORRECT_PASSWORD);
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