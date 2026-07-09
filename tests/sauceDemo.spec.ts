import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AddToCartPage } from '../pages/AddToCart';

test.describe('Sauce Demo - QA Team Lead Assessment', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let addToCartPage: AddToCartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    addToCartPage = new AddToCartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.navigate();
  });

  test('Task 1.1: Automate successful purchase flow of two cheapest items', async () => {
    // 1. Log in with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Add the two cheapest items to the cart
    await inventoryPage.addCheapestItems(2);
    await inventoryPage.goToCart();

    // 3. Proceed to checkout and complete the order
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.completeOrder();

    // 4. Verify the order confirmation page appears
    await checkoutPage.verifyOrderConfirmation('Thank you for your order!');
  });

  test('Task 1.2: Negative test - Login with invalid credentials displays error message', async () => {
    // 1. Attempt login with an incorrect password
    await loginPage.login('standard_user', 'wrong_password');

    // 2. Assert on the precise error text message
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
  });

  test('Task 1.3: Add an item to Cart and successfully purchase it', async () => {
    // 1. Log in with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');
    // 2. Add a specific item to the cart
    await addToCartPage.addItemsToCart('Sauce Labs Backpack');
    await addToCartPage.goToCart();

    // 3. Proceed to checkout and complete the order
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.completeOrder();

    // 4. Verify the order confirmation page appears
    await checkoutPage.verifyOrderConfirmation('Thank you for your order!');
    });
  });